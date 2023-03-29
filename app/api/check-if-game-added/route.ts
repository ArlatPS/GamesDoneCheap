import mongoose, { Schema } from "mongoose";
import { NextResponse } from "next/server";

// route to handle communication with steam api
export async function GET(request: Request) {
  // get id from url
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");

  // if no id return
  if (id == null || userId == null) {
    return NextResponse.json({ success: false, data: null });
  }
  try {
    // connect with Mondo DB Atlas
    mongoose.connect(process.env.DBUrl as string);
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("CONNECTED WITH DB");
    });

    // define schema for user
    const userSchema = new Schema({
      id: String,
      games: Array,
    });

    // create model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // find by id and return true or false whether user has this game added
    const userFromDb = await User.findOne({ id: userId });
    if (userFromDb) {
      const listOfAllGamesOfUserFromDB = userFromDb.games;
      console.log(id, listOfAllGamesOfUserFromDB);
      if (listOfAllGamesOfUserFromDB.includes(id)) {
        return NextResponse.json({ success: true, data: true });
      }
      return NextResponse.json({ success: true, data: false });
    }
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
