"use client";
import { DealsListGame, StoreFromShark } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DIVV = styled.div`
  background-color: beige;
  div {
    background-color: blue;
    width: 50%;
    margin-left: 25%;
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

function calculateDistanceFromElement(
  top: number,
  left: number,
  height: number,
  width: number,
  x: number,
  y: number
) {
  // if inside return 0
  if (x > left && x < left + width && y > top && y < top + height) {
    return 0;
  }
  // on right height but not inside
  if (y > top && y <= top + height) {
    // on right side of the element
    if (x < left) {
      return left - x;
    }
    // on left side
    return x - left - width;
  }
  // on right width but not inside
  if (x > left && x <= left + width) {
    // above the element
    if (y < top) {
      return top - y;
    }
    // below the element
    return y - top - height;
  }
  // in left corners
  if (x < left) {
    // left top corner
    if (y < top) {
      // Pythagorean equation
      return Math.floor(
        Math.sqrt(Math.pow(left - x, 2) + Math.pow(top - y, 2))
      );
    }
    // left bottom corner
    return Math.floor(
      Math.sqrt(Math.pow(left - x, 2) + Math.pow(y - top - height, 2))
    );
  }
  // in right corners
  // right top corner
  if (y < top) {
    return Math.floor(
      Math.sqrt(Math.pow(x - left - width, 2) + Math.pow(top - y, 2))
    );
  }
  return Math.floor(
    Math.sqrt(Math.pow(x - left - width, 2) + Math.pow(y - top - height, 2))
  );
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

  const myRef = useRef<HTMLDivElement>(null);
  // console.log(myRef.current.offsetLeft)
  // X
  const [x, setX] = useState<number | undefined>();

  // Y
  const [y, setY] = useState<number | undefined>();

  // This function calculate X and Y
  const getPosition = () => {
    const x = myRef.current?.offsetLeft;
    setX(x);

    console.log(myRef.current?.offsetWidth);

    const y = myRef.current?.offsetTop;
    setY(y);
  };

  // Get the position of the red box in the beginning
  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

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

  const [distance, setDistance] = useState(1000);

  useEffect(() => {
    if (
      myRef.current?.offsetTop &&
      myRef.current?.offsetLeft &&
      myRef.current?.offsetHeight &&
      myRef.current?.offsetWidth
    ) {
      setDistance(
        calculateDistanceFromElement(
          myRef.current.offsetTop,
          myRef.current.offsetLeft,
          myRef.current.offsetHeight,
          myRef.current.offsetWidth,
          globalMousePos.x,
          globalMousePos.y
        )
      );
    }
  }, [globalMousePos]);

  return (
    <DIVV>
      <h5>
        GX {globalMousePos.x} GY {globalMousePos.y}
      </h5>
      <h5>
        X {x} Y {y}
      </h5>
      <h5>
        {x && y
          ? Math.abs(globalMousePos.x - x) + Math.abs(globalMousePos.y - y)
          : null}
      </h5>
      <h4>Function Result: {distance}</h4>
      <div ref={myRef}>
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
    </DIVV>
  );
}
