import { NextResponse } from "next/server";
import createTrie, { Node } from "@/lib/tries";
import { DealsListGame, GameForDB } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";

export async function GET(request: Request) {
  // get query
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  // if  query search return
  if (query == null) {
    return NextResponse.json({ success: false, data: null });
  }
  try {
    // hit internal API and revalidate every 4h
    const dataFromDB = await fetch(
      "http://localhost:3000/api/get-data-from-db",
      {
        // next: { revalidate: 1 },
        cache: "no-cache",
      }
    );

    const dataFromDBAfterJSON = (await dataFromDB.json()) as {
      success: boolean;
      listOfGames: GameForDB[];
    };

    if (dataFromDBAfterJSON.success) {
      const listOfGames = dataFromDBAfterJSON.listOfGames;
      const namesToTrie = listOfGames.map((deal) => deal.name);

      // crate Trie and use it to find completions
      const trie = createTrie(namesToTrie);
      const completions = trie.complete(query);

      // add data from db - original title (with upper cases) and gameId for Link
      const completionsWithData: GameForDB[] = [];
      completions.forEach((completion) => {
        const found = listOfGames.filter((game) => game.name === completion);
        if (found.length > 0) {
          completionsWithData.push({
            name: found[0].name,
            gameID: found[0].gameID,
            title: found[0].title,
          });
        }
      });
      return NextResponse.json({
        success: true,
        completionsWithData: completionsWithData.slice(0, 3),
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, completions: [] });
  }
}
