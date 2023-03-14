"use client";

import { GameForDB } from "@/globalTypes";
import Link from "next/link";
import { cache, useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [completes, setCompletes] = useState<GameForDB[]>([]);

  useEffect(() => {
    async function fetchAutoCompletes() {
      if (query.length >= 3) {
        const response = await fetch(
          `http://localhost:3000/api/autocomplete?query=${query}`,
          // { next: { revalidate: 60 } }
          { cache: "no-store" }
        );
        const responseAfterJSON = (await response.json()) as {
          success: boolean;
          completionsWithData: GameForDB[];
        };
        if (responseAfterJSON.success) {
          setCompletes(responseAfterJSON.completionsWithData);
        }
      } else {
        setCompletes([]);
      }
    }
    fetchAutoCompletes();
  }, [query]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {completes.slice(0, 3).map((complete) => (
        <div key={complete.gameID}>
          <Link
            href={`/game-details/${complete.gameID}`}
            onClick={() => setQuery("")}
          >
            {complete.title}
          </Link>
        </div>
      ))}
    </form>
  );
}
