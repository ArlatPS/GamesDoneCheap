import { DealsListGame, GameForDB } from "@/globalTypes";
import mongoose, { Schema } from "mongoose";

export async function updateGamesOnDB() {
  try {
    // connect with Mondo DB Atlas
    mongoose.connect(process.env.DBUrl as string);
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("updateGamesOnDB CONNECTED WITH DB");
    });

    // define schema
    const listOfAllDealsSchema = new Schema({
      data: String,
    });
    const ListOfAllDealsDb =
      mongoose.models.ListOfAllDealsDb ||
      mongoose.model("ListOfAllDealsDb", listOfAllDealsSchema);

    // pass found list to Response
    const listFromDb = await ListOfAllDealsDb.find({});
    const listOfAllGamesFromDB = JSON.parse(listFromDb[0].data) as GameForDB[];

    // fetch first first page to update DB
    const res = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?pageNumber=0`,
      {
        next: { revalidate: 24 * 60 * 60 },
      }
    );
    const resAfterJSON = (await res.json()) as DealsListGame[];

    const listToSave: GameForDB[] = [...listOfAllGamesFromDB];
    const namesSeen = new Set();
    for (let i = 0; i < listOfAllGamesFromDB.length; i++) {
      namesSeen.add(listOfAllGamesFromDB[i].title);
    }
    // modify the list to only store name and gameID (CheapShark)
    // and filter for repetitions with Set
    for (let i = 0; i < resAfterJSON.length; i++) {
      const game = resAfterJSON[i];
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

    const record = new ListOfAllDealsDb({
      data: JSON.stringify(listToSave),
    });
    await ListOfAllDealsDb.deleteMany({});
    await record.save();
    console.log("List saved");

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
