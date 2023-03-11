import { DealsListGame, StoreFromShark } from "@/globalTypes";
import getStores from "@/lib/getStores";
import Image from "next/image";
import Link from "next/link";

async function getStoreToDisplay(game: DealsListGame) {
  const stores = await getStores();
  let gameStoreToDisplay: StoreFromShark | undefined = undefined;
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].storeID == game.storeID) {
      gameStoreToDisplay = stores[i];
    }
  }
  return gameStoreToDisplay;
}

// two version if the game has steamAppID or it doesn't
// steamAppID needed for better img
export default async function FreeGame({ game }: { game: DealsListGame }) {
  const gameStore = await getStoreToDisplay(game);

  return (
    <div>
      {game.steamAppID !== null ? (
        <Image
          width={400}
          height={200}
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppID}/header.jpg`}
          alt="Cover photo from Steam"
        />
      ) : (
        <Image
          width={400}
          height={200}
          src={game.thumb}
          alt="Cover photo from CheapShark API"
        />
      )}
      <h3>{game.title}</h3>
      <Link
        href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Check Out
      </Link>

      {gameStore ? (
        <div>
          {/* good dimensions */}
          <Image
            width={256}
            height={256}
            src={`https://www.cheapshark.com/${gameStore.images.logo}`}
            alt="shop logo"
          />
          <h3>{gameStore.storeName}</h3>
        </div>
      ) : null}
    </div>
  );
}
