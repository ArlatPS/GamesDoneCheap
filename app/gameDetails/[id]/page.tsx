"use client";

import { useEffect, useState } from "react";

export default function GameDetails({ params }: { params: { id: string } }) {
  const [gameFromShark, setGameFromShark] = useState("loading");

  useEffect(() => {
    async function fetchDataFromShark() {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${params.id}`
      );
      const responseAfterJSON = await response.json();
      console.log(responseAfterJSON);
      setGameFromShark(responseAfterJSON);
    }
    fetchDataFromShark();
  }, [params.id]);

  if (gameFromShark == "loading") {
    return null;
  }

  return (
    <main>
      <div>
        <h1>{gameFromShark.info.title}</h1>
      </div>
    </main>
  );
}
