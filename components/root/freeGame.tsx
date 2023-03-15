"use client";
import { DealsListGame, StoreFromShark } from "@/globalTypes";
import useProximityEffect from "@/lib/hooks/useProximityEffect";
import { ArticleWithProximityEffect } from "@/style/articleWithProximityEffect";
import { FreeGameDiv } from "@/style/freeGame";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
    <ArticleWithProximityEffect
      widthOfEffect={distance < 200 ? (200 - distance) / 10 : 0}
    >
      <FreeGameDiv ref={proximityRef}>
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
      </FreeGameDiv>
    </ArticleWithProximityEffect>
  );
}
