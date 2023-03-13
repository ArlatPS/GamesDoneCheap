import { NextResponse } from "next/server";
import createTrie from "@/lib/tries";
import { DealsListGame } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";

export async function GET(request: Request) {
  try {
    let listOfAllDeals: DealsListGame[] = [];
    for (let i = 0; i < 1; i++) {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${i}`,
        {
          next: { revalidate: 7 * 24 * 60 * 60 },
        }
      );
      const resAfterJSON = (await res.json()) as DealsListGame[];
      listOfAllDeals = [...listOfAllDeals, ...resAfterJSON];
      console.log(`fetched ${i}`);
    }

    mongoose.connect(
      "mongodb+srv://admin:rerNb8QCXlYsMgPJ@gamesdb.uzko2yt.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("CONNECTED WITH DB");
    });

    const namesToTrie = listOfAllDeals.map((deal) => deal.title);
    // create a trie
    const Trie = createTrie(namesToTrie);

    const listOfAllDealsSchema = new Schema({
      data: String,
    });

    const ListOfAllDealsDb =
      mongoose.models.ListOfAllDealsDb ||
      mongoose.model("ListOfAllDealsDb", listOfAllDealsSchema);
    const record = new ListOfAllDealsDb({
      data: JSON.stringify(listOfAllDeals),
    });

    await ListOfAllDealsDb.deleteMany({});
    await record.save();
    console.log("saved");
    // to simplify response [id]
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
