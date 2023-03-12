"use client";
import { DealsListGame, StoreFromShark } from "@/globalTypes";
import useProximityEffect from "@/lib/hooks/useProximityEffect";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DIVV = styled("div")<{ widthOfEffect: number }>`
  background-color: beige;
  div:first-of-type {
    background-color: blue;
    width: 50%;
    margin-left: 25%;
    border-color: red;
    border-width: ${(props) => props.widthOfEffect}px;
    border-style: solid;
  }
  padding-bottom: 5rem;
`;

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

  const proximityRef = useRef<HTMLDivElement>(null);
  const distance = useProximityEffect(proximityRef, 100);
  return (
    <DIVV widthOfEffect={distance < 100 ? (100 - distance) / 10 : 0}>
      <h2>{distance}</h2>
      <div ref={proximityRef}>
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

        <Link href={`/game-details/${game.gameID}`}>{game.gameID}</Link>
        <Link
          href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Check Out
        </Link>

        {gameStore ? (
          <section>
            {/* good dimensions */}
            <Image
              width={256}
              height={256}
              src={`https://www.cheapshark.com/${gameStore.images.logo}`}
              alt="shop logo"
            />
            <h3>{gameStore.storeName}</h3>
          </section>
        ) : null}
      </div>
    </DIVV>
  );
}
