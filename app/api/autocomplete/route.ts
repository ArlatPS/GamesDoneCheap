import { NextResponse } from "next/server";
import createTrie, { Node } from "@/lib/tries";
import { DealsListGame } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";

export async function GET(request: Request) {
  // get id from url
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  // if no id return
  if (query == null) {
    return NextResponse.json({ success: false, data: null });
  }
  try {
    const dataFromDB = await fetch(
      "http://localhost:3000/api/get-data-from-db",
      {
        cache: "no-store",
      }
    );
    const dataFromDBAfterJSON = (await dataFromDB.json()) as {
      success: boolean;
      listOfDeals: DealsListGame[];
    };

    if (dataFromDBAfterJSON.success) {
      const listOfDeals = dataFromDBAfterJSON.listOfDeals;
      const namesToTrie = listOfDeals.map((deal) => deal.title);
      const trie = createTrie(namesToTrie);

      const completions = trie.complete(query);
      return NextResponse.json({ success: true, completions });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, completions: [] });
  }
}
