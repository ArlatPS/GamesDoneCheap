import mongoose, { Schema } from "mongoose";
import { GameForDB } from "@/globalTypes";
import { updateGamesOnDB } from "@/lib/refactoredAPI/updateDB";

export async function getDataFromDB() {
  try {
    // updating db once a day
    const response = await updateGamesOnDB();
    if (response) {
      // connect with Mondo DB Atlas
      mongoose.connect(process.env.DBUrl as string);
      const db = mongoose.connection;
      db.on("error", () => console.log("error"));
      db.once("open", () => {
        console.log("getDataFromDB CONNECTED WITH DB");
      });

      const listOfAllDealsSchema = new Schema({
        data: String,
      });

      const ListOfAllDealsDb =
        mongoose.models.ListOfAllDealsDb ||
        mongoose.model("ListOfAllDealsDb", listOfAllDealsSchema);

      // pass found list to Response
      const listFromDb = await ListOfAllDealsDb.find({});
      if (listFromDb[0] && listFromDb[0]?.data) {
        const listOfAllGamesFromDB = JSON.parse(
          listFromDb[0].data
        ) as GameForDB[];

        return {
          success: true,
          listOfGames: listOfAllGamesFromDB,
        };
      }
    }
  } catch (e) {
    console.error(e);
    return { success: false, listOfGames: [] };
  }
  return { success: false, listOfGames: [] };
}
