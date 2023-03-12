import { DealsListGame } from "@/globalTypes";
import getStores from "@/lib/getStores";
import FreeGame from "./freeGame";

// due to lack of support from TS to async server components
const FreeGameAny = FreeGame as any;

export default async function FreeGames({
  freeGames,
}: {
  freeGames: DealsListGame[];
}) {
  if (freeGames.length == 0) {
    return (
      <div>
        <h3>No Free Games Available</h3>
      </div>
    );
  }
  // get stores to display their names and logos
  const stores = await getStores();
  return (
    <div>
      <h2>Free Games</h2>
      {freeGames.map((game) => (
        <FreeGameAny game={game} key={game.dealID} stores={stores} />
      ))}
    </div>
  );
}
