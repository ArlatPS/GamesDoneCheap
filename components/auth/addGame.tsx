"use client";
import { theme } from "@/theme";
import { useAuth } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Switch from "react-switch";

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

// adds or removes depending on the mode (different api request)
async function changeGameForUser(
  mode: "add" | "remove",
  id: string,
  userId: string,
  setState: Dispatch<SetStateAction<boolean | undefined>>
) {
  const response = await fetch(
    `/api/${mode}-game-for-user?id=${id}&userId=${userId}`,
    { cache: "no-cache" }
  );
  const responseAfterJSON = await response.json();
  if (responseAfterJSON.success && mode == "add") {
    setState(true);
  }
  if (responseAfterJSON.success && mode == "remove") {
    setState(false);
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
        <span>Wishlisted</span>
        <Switch
          checked={gameAdded}
          onChange={(checked) => {
            if (checked) {
              changeGameForUser("add", gameId, userId, setGameAdded);
            } else {
              changeGameForUser("remove", gameId, userId, setGameAdded);
            }
          }}
          onColor={theme.colors.blue}
          offColor={theme.colors.grey}
        />
      </div>
    );
  } else {
    return null;
  }
}
