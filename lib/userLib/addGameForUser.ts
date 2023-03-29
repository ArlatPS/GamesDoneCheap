import mongoose, { Schema } from "mongoose";

export async function addGameForUser(gameID: string, userID: string) {
  try {
    // connect with Mondo DB Atlas
    mongoose.connect(process.env.DBUrl as string);
    const db = mongoose.connection;
    db.on("error", () => console.log("error"));
    db.once("open", () => {
      console.log("addGameForUser CONNECTED WITH DB");
    });

    // define schema for user
    const userSchema = new Schema({
      id: String,
      games: Array,
    });

    // create model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // find by id and return games if user found otherwise create new on the DB
    const userFromDb = await User.findOne({ id: userID });
    if (userFromDb) {
      const listOfAllGamesOfUserFromDB = userFromDb.games;
      listOfAllGamesOfUserFromDB.push(gameID);
      await User.findOneAndUpdate(
        { id: userID },
        { $set: { games: listOfAllGamesOfUserFromDB } }
      );
      // production add
      // listOfAllGamesOfUserFromDB.push("128", "129", "130", "140");
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}
