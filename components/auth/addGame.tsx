"use client";
import { useAuth } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

async function checkIfGameAdded(
  id: string,
  userId: string,
  setState: Dispatch<SetStateAction<boolean | undefined>>
) {
  const response = await fetch(
    `/api/check-if-game-added?id=${id}&userId=${userId}`,
    { cache: "no-cache" }
  );
  const responseAfterJSON = await response.json();
  if (responseAfterJSON.success) {
    setState(responseAfterJSON.data as boolean);
  }
}

async function addGameForUser(
  id: string,
  userId: string,
  setState: Dispatch<SetStateAction<boolean | undefined>>
) {
  const response = await fetch(
    `/api/add-game-for-user?id=${id}&userId=${userId}`,
    { cache: "no-cache" }
  );
  const responseAfterJSON = await response.json();
  if (responseAfterJSON.success) {
    setState(true);
  }
}

// "use client";
export default function AddGame({ gameId }: { gameId: string }) {
  const { isLoaded, userId } = useAuth();
  const [gameAdded, setGameAdded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof userId == "string") {
      checkIfGameAdded(gameId, userId, setGameAdded);
    }
  }, [gameId, userId]);

  if (isLoaded && userId && gameAdded !== undefined) {
    return (
      <div>
        <h2>
          hi {userId} game is {String(gameAdded)}
        </h2>
        {gameAdded ? (
          <button>REMOVE</button>
        ) : (
          <button
            onClick={() => {
              addGameForUser(gameId, userId, setGameAdded);
            }}
          >
            ADD
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
}
