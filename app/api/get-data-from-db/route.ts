import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { DealsListGame, GameForDB } from "@/globalTypes";
import createTrie from "@/lib/tries";

export async function GET(request: Request) {
  try {
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
