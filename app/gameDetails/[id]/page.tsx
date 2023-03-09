"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns"; // date formatting

import { GameFromShark } from "@/globalTypes";
import ListOfDeals from "./listOfDeals";
import SteamSection from "./steamSection";

type GameSharkState = GameFromShark | "loading";

export default function GameDetails({ params }: { params: { id: string } }) {
  const [gameFromShark, setGameFromShark] = useState<GameSharkState>("loading");

  // fetch game when component mounts
  useEffect(() => {
    async function fetchDataFromShark() {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${params.id}`
      );
      const responseAfterJSON = await response.json();
      setGameFromShark(responseAfterJSON as GameFromShark);
    }
    fetchDataFromShark();
  }, [params.id]);

  if (gameFromShark == "loading") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <div>
        <h1>{gameFromShark.info.title}</h1>
        <Image
          src={gameFromShark.info.thumb}
          width={300}
          height={400}
          alt={gameFromShark.info.title}
        />
        {/* lowest price with date formatting */}
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
      <ListOfDeals deals={gameFromShark.deals} />
      <SteamSection steamID={gameFromShark.info.steamAppID} />
    </main>
  );
}
