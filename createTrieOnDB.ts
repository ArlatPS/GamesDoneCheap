import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://admin:rerNb8QCXlYsMgPJ@gamesdb.uzko2yt.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", () => console.log("error"));
db.once("open", () => {
  console.log("CONNECTED WITH DB");
});
