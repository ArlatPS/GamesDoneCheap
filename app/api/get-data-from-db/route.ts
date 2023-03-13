import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { DealsListGame } from "@/globalTypes";

export async function GET(request: Request) {
  try {
    mongoose.connect(
      "mongodb+srv://admin:rerNb8QCXlYsMgPJ@gamesdb.uzko2yt.mongodb.net/?retryWrites=true&w=majority"
    );
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

    const fromDb = await ListOfAllDealsDb.find({});
    const listOfAllDealsFromDb = JSON.parse(fromDb[0].data) as DealsListGame[];

    // to simplify response [id]
    return NextResponse.json({
      success: true,
      listOfDeals: listOfAllDealsFromDb,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, listOfDeals: [] });
  }
}
