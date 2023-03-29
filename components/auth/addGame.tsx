"use client";
import { addGameForUser } from "@/lib/userLib/addGameForUser";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

async function checkIfGameAdded(
  id: string,
  userId: string,
  setState: Dispatch<SetStateAction<boolean | undefined>>
) {
  const response = await fetch(
    `/api/check-if-game-added?id=${id}&userId=${userId}`
  );
  const responseAfterJSON = await response.json();
  console.log(responseAfterJSON);
  if (responseAfterJSON.success) {
    setState(responseAfterJSON.data as boolean);
  } else {
    return undefined;
  }
}

// "use client";
export default function AddGame({ gameId }: { gameId: string }) {
  console.log(`String of id is ${gameId}`);
  console.log(gameId);
  const { isLoaded, userId } = useAuth();
  const [gameAdded, setGameAdded] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (typeof userId == "string") {
      checkIfGameAdded(gameId, userId, setGameAdded);
    }
  }, [gameId, userId]);

  if (isLoaded && userId && gameAdded !== undefined) {
    return (
      <h2>
        hi {userId} game is {String(gameAdded)}
      </h2>
    );
  } else {
    return null;
  }
}
