"use client";

import { useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [completes, setCompletes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAutoCompletes() {
      if (query.length >= 3) {
        const response = await fetch(
          `http://localhost:3000/api/autocomplete?query=${query}`
        );
        const responseAfterJSON = (await response.json()) as {
          success: boolean;
          completions: string[];
        };
        if (responseAfterJSON.success) {
          setCompletes(responseAfterJSON.completions);
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
        <div key={complete}>{complete}</div>
      ))}
    </form>
  );
}
