import { NextResponse } from "next/server";
import { DealsListGame, GameForDB } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";

export async function GET(request: Request) {
  try {
    let listOfAllDeals: DealsListGame[] = [];
    // fetch first 30 pages of deals by Deal Rating
    for (let i = 0; i < 30; i++) {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${i}`,
        {
          next: { revalidate: 24 * 60 * 60 },
        }
      );
      const resAfterJSON = (await res.json()) as DealsListGame[];
      listOfAllDeals = [...listOfAllDeals, ...resAfterJSON];
      console.log(`fetched ${i} Deal Rating`);
    }

    // fetch first 30 pages by Metacritic - possibly popular
    for (let i = 0; i < 30; i++) {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${i}&sortBy=Metacritic`,
        {
          next: { revalidate: 14 * 24 * 60 * 60 },
        }
      );
      const resAfterJSON = (await res.json()) as DealsListGame[];
      listOfAllDeals = [...listOfAllDeals, ...resAfterJSON];
      console.log(`fetched ${i} Metacritic`);
    }

    // fetch first 10 pages by Recent - new games
    for (let i = 0; i < 10; i++) {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${i}&sortBy=Recent`,
        {
          next: { revalidate: 24 * 60 * 60 },
        }
      );
      const resAfterJSON = (await res.json()) as DealsListGame[];
      listOfAllDeals = [...listOfAllDeals, ...resAfterJSON];
      console.log(`fetched ${i} Recent`);
    }

    // modify the list to only store name and gameID (CheapShark)
    // and filter for repetitions with Set
    const listToSave: GameForDB[] = [];
    const namesSeen = new Set();
    for (let i = 0; i < listOfAllDeals.length; i++) {
      const game = listOfAllDeals[i];
      // if hasn't been seen
      if (!namesSeen.has(game.title.toLowerCase())) {
        namesSeen.add(game.title.toLowerCase());
        // save in GameForDB type
        listToSave.push({
          title: game.title,
          name: game.title.toLowerCase(),
          gameID: game.gameID,
        });
      }
    }

    // connect with Mongo DB Atlas
    mongoose.connect(process.env.DBUrl as string);
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("CONNECTED WITH DB");
    });

    // save list of all deals
    const listOfAllDealsSchema = new Schema({
      data: String,
    });
    const ListOfAllDealsDb =
      mongoose.models.ListOfAllDealsDb ||
      mongoose.model("ListOfAllDealsDb", listOfAllDealsSchema);

    const record = new ListOfAllDealsDb({
      data: JSON.stringify(listToSave),
    });
    await ListOfAllDealsDb.deleteMany({});
    await record.save();
    console.log("List saved");

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}
