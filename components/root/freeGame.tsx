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
      <Link href={`/game-details/${game.gameID}`}>
        <FreeGameDiv ref={proximityRef}>
          {gameStore ? (
            <div className="storeDiv">
              <Image
                width={256}
                height={256}
                src={`https://www.cheapshark.com/${gameStore.images.logo}`}
                alt="shop logo"
              />
              <h4>{gameStore.storeName}</h4>
            </div>
          ) : null}
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
        </FreeGameDiv>
      </Link>
    </ArticleWithProximityEffect>
  );
}
