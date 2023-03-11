import { Suspense } from "react";

import { GameFromShark } from "@/globalTypes";
import ListOfDeals from "./listOfDeal";
const ListOfDealsAsync = ListOfDeals as any;
import SteamSection from "./steamSection";
import LowestPrice from "./lowestPrice";
const SteamSectionAsync = SteamSection as any;

async function fetchDataFromShark(id: string) {
  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/games?id=${id}`
  );
  const responseAfterJSON = await response.json();
  return responseAfterJSON;
}

export default async function GameDetails({
  params,
}: {
  params: { id: string };
}) {
  const gameFromShark = (await fetchDataFromShark(params.id)) as GameFromShark;
  // it doesn't need earlier return for loading - loading.tsx provides loading pane
  return (
    <main>
      <div>
        <h1>{gameFromShark.info.title}</h1>
        {/* <Image
          src={gameFromShark.info.thumb}
          width={300}
          height={400}
          alt={gameFromShark.info.title}
        /> */}
        {/* lowest price with date formatting */}
        <Suspense fallback={<h3>I am loading Steam Page</h3>}>
          <SteamSectionAsync steamID={gameFromShark.info.steamAppID} />
        </Suspense>
        <LowestPrice game={gameFromShark} />
      </div>
      <Suspense fallback={<h3>I am loading List of Deals</h3>}>
        <ListOfDealsAsync deals={gameFromShark.deals} />
      </Suspense>
    </main>
  );
}
