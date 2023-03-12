"use client";
import { DealsListGame, StoreFromShark } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

function getStoreToDisplay(game: DealsListGame, stores: StoreFromShark[]) {
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
export default function FreeGame({
  game,
  stores,
}: {
  game: DealsListGame;
  stores: StoreFromShark[];
}) {
  const gameStore = getStoreToDisplay(game, stores);
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: any) {
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  }

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setGlobalMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h5>
        GX {globalMousePos.x} GY {globalMousePos.y}
      </h5>
      <h5>
        LX {localMousePos.x} LY {localMousePos.y}
      </h5>
      <div onMouseMove={handleMouseMove}>
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
    </div>
  );
}
