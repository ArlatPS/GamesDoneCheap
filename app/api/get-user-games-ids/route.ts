import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { GameForDB } from "@/globalTypes";
import { updateGamesOnDB } from "@/lib/refactoredAPI/updateDB";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // connect with Mondo DB Atlas
    mongoose.connect(process.env.DBUrl as string);
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("getUserGamesIds CONNECTED WITH DB");
    });

    // define schema for user
    const userSchema = new Schema({
      id: String,
      games: Array,
    });

    // create model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // find by id and return games if user found otherwise create new on the DB
    const userFromDb = await User.findOne({ id: id });
    if (userFromDb) {
      const listOfAllGamesOfUserFromDB = userFromDb.games;
      // production add
      // listOfAllGamesOfUserFromDB.push("128", "129", "130", "140");
      return NextResponse.json({
        success: true,
        games: listOfAllGamesOfUserFromDB,
      });
    } else {
      const newUser = new User({ id: id, games: [] });
      await newUser.save();
      console.log("new user saved");
      return [];
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, games: [] });
  }
}
