// "use client";

// import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns"; // date formatting

import { GameFromShark } from "@/globalTypes";
import ListOfDeals from "./listOfDeals";
const ListOfDealsAsync = ListOfDeals as any;
import SteamSection from "./steamSection";
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
        <SteamSectionAsync steamID={gameFromShark.info.steamAppID} />
        <h3>
          Lowest recorded price: {gameFromShark.cheapestPriceEver.price}USD{" "}
          {formatDistanceToNow(
            new Date(gameFromShark.cheapestPriceEver.date * 1000)
          )}{" "}
          ago (
          {format(
            new Date(gameFromShark.cheapestPriceEver.date * 1000),
            "dd/LL/yyyy"
          )}
          )
        </h3>
      </div>
      <ListOfDealsAsync deals={gameFromShark.deals} />
    </main>
  );
}
