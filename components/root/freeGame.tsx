import { DealsListGame } from "@/globalTypes";
import fetchSteam from "@/lib/fetchSteam";
import Image from "next/image";

// two version if the game has steamAppID or it doesn't
// steamAppID needed for better img
export default async function FreeGame({ game }: { game: DealsListGame }) {
  if (game.steamAppID !== null) {
    const response = await fetchSteam(game.steamAppID);
    if (response && response?.success) {
      return (
        <div>
          <Image
            width={300}
            height={200}
            src={response.data.header_image}
            alt="Cover photo from Steam"
          />
          <h3>{game.title}</h3>
          <h4>{game.storeID}</h4>
        </div>
      );
    }
  }
  return <h1>lol</h1>;
}
