"use client";

import { useEffect, useState } from "react";
import { GameFromShark } from "@/globalTypes";
import ListOfDeals from "./listOfDeals";

type GameSharkState = GameFromShark | "loading";

export default function GameDetails({ params }: { params: { id: string } }) {
  const [gameFromShark, setGameFromShark] = useState<GameSharkState>("loading");

  useEffect(() => {
    async function fetchDataFromShark() {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${params.id}`
      );
      const responseAfterJSON = await response.json();
      console.log(responseAfterJSON);
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
      </div>
      <ListOfDeals deals={gameFromShark.deals} />
    </main>
  );
}
