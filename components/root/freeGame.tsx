"use client";
import { DealsListGame, StoreFromShark } from "@/globalTypes";
import calculateTimeLeft, {
  CalculateTimeLeftType,
} from "@/lib/calculateTimeLeft";
import useProximityEffect from "@/lib/hooks/useProximityEffect";
import { ArticleWithProximityEffect } from "@/style/articleWithProximityEffect";
import { FreeGameDiv } from "@/style/freeGame";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

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

  // proximity effect
  const proximityRef = useRef<HTMLDivElement>(null);
  const distance = useProximityEffect(proximityRef, 100);

  // calculate time left to display
  const timeLeft: CalculateTimeLeftType = useMemo(() => {
    return calculateTimeLeft(game.lastChange);
  }, [game.lastChange]);

  return (
    <ArticleWithProximityEffect
      widthOfEffect={distance < 200 ? (200 - distance) / 10 : 0}
    >
      <Link
        href={`/game-details/${game.gameID}`}
        className="deleteTextDecoration"
      >
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
          {/* display time left if offer is from Epic - they last 7 days */}
          {game.storeID === "25" ? (
            // if days then div with days class otherwise hours
            timeLeft.format === "days" ? (
              <div className="daysLeft">
                <h3>{timeLeft.value}</h3>
                {/* if one day then day otherwise days */}
                <h4>{timeLeft.value == 1 ? "day" : "days"} left</h4>
              </div>
            ) : (
              <div className="hoursLeft">
                <h3>{timeLeft.value}</h3>
                <h4>{timeLeft.value == 1 ? "hour" : "hours"} left</h4>
              </div>
            )
          ) : null}
        </FreeGameDiv>
      </Link>
    </ArticleWithProximityEffect>
  );
}
