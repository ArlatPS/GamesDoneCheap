import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { GameForDB } from "@/globalTypes";

export async function GET(request: Request) {
  try {
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
    const listOfAllGamesFromDB = JSON.parse(listFromDb[0].data) as GameForDB[];

    return NextResponse.json({
      success: true,
      listOfGames: listOfAllGamesFromDB,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, listOfDeals: [] });
  }
}
