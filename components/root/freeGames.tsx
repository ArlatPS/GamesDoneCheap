import { DealsListGame } from "@/globalTypes";
import getStores from "@/lib/getStores";
import FreeGame from "./freeGame";

// due to lack of support from TS to async server components
const FreeGameAny = FreeGame as any;

export default async function FreeGames({
  freeGames,
  freeGamesAvailable,
}: {
  freeGames: DealsListGame[];
  freeGamesAvailable: boolean;
}) {
  if (freeGames.length == 0) {
    return null;
  }
  // get stores to display their names and logos
  const stores = await getStores();
  return (
    <section className="mainPageSection">
      <h2>{freeGamesAvailable ? "Free Games" : "Featured Deals"}</h2>
      {freeGames.map((game) => (
        <FreeGameAny game={game} key={game.dealID} stores={stores} />
      ))}
    </section>
  );
}
