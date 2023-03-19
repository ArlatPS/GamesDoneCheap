import { NextResponse } from "next/server";
import createTrie, { Node } from "@/lib/tries";
import { DealsListGame, GameForDB } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";
import { getDataFromDB } from "@/lib/refactoredAPI/getDataFromDB";

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
    const dataFromDB = await getDataFromDB();

    if (dataFromDB && dataFromDB.success === true) {
      const listOfGames = dataFromDB.listOfGames;
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
