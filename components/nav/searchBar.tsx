"use client";

import { GameForDB } from "@/globalTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [completes, setCompletes] = useState<GameForDB[]>([]);

  // router hook for searching if nothing in autocomplete
  const router = useRouter();

  // defer query for performance
  const queryDeferred = useDeferredValue(query);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (queryDeferred.length >= 3) {
      fetch(
        `/api/autocomplete?query=${queryDeferred}`,
        // { next: { revalidate: 60 } }
        { cache: "no-store", signal }
      )
        .then((res) => res.json())
        .then((resAfter) => {
          if (resAfter?.success) {
            setCompletes(resAfter.completionsWithData as GameForDB[]);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("cancelled");
          } else {
            // console.error(err);
            // console.log("aa");
          }
        });
    }
    return () => {
      controller.abort();
    };
  }, [queryDeferred]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setCompletes([]);
        router.push(`/search/${query}`);
        setQuery("");
      }}
    >
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {query.length > 0 ? (
        <section>
          {completes.slice(0, 3).map((complete) => (
            <div key={complete.gameID}>
              <Link
                href={`/game-details/${complete.gameID}`}
                onClick={() => {
                  setQuery("");
                  setCompletes([]);
                }}
              >
                {complete.title}
              </Link>
            </div>
          ))}
        </section>
      ) : null}
    </form>
  );
}
