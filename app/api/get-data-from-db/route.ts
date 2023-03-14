import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { GameForDB } from "@/globalTypes";

export async function GET(request: Request) {
  try {
    // updating db once a day
    const response = await fetch(
      "http://localhost:3000/api/update-games-on-db",
      {
        next: { revalidate: 24 * 60 * 60 },
      }
    );
    const res = await response.json();
    if (res.success) {
      // connect with Mondo DB Atlas
      mongoose.connect(process.env.DBUrl as string);
      const db = mongoose.connection;
      db.on("error", () => console.log("error"));
      db.once("open", () => {
        console.log("CONNECTED WITH DB");
      });

      const listOfAllDealsSchema = new Schema({
        data: String,
      });

      const ListOfAllDealsDb =
        mongoose.models.ListOfAllDealsDb ||
        mongoose.model("ListOfAllDealsDb", listOfAllDealsSchema);

      // pass found list to Response
      const listFromDb = await ListOfAllDealsDb.find({});
      const listOfAllGamesFromDB = JSON.parse(
        listFromDb[0].data
      ) as GameForDB[];

      return NextResponse.json({
        success: true,
        listOfGames: listOfAllGamesFromDB,
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, listOfDeals: [] });
  }
}
