import { NextResponse } from "next/server";
import createTrie from "@/lib/tries";
import { DealsListGame } from "@/globalTypes";

// route to handle communication with steam api
export async function GET(request: Request) {
  // get id from url
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  // if no id return
  if (query == null) {
    return NextResponse.json({ success: false, data: null });
  }
  try {
    const res = await fetch("https://www.cheapshark.com/api/1.0/deals", {
      next: { revalidate: 60 },
    });
    const resAfterJSON = (await res.json()) as DealsListGame[];

    const namesToTrie = resAfterJSON.map((deal) => deal.title);
    // create a trie
    const Trie = createTrie(namesToTrie);
    console.log(JSON.stringify(Trie));
    const completions = Trie.complete(query);

    // to simplify response [id]
    return NextResponse.json({ success: true, completions });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
