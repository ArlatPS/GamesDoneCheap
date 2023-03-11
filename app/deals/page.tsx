"use client";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { DealsListGame } from "@/globalTypes";
import AllDealsList from "./allDealsList";

export default function Deals() {
  const [deals, setDeals] = useState<DealsListGame[]>([]);
  // ref for keeping track of whether user is waiting for next page to load
  const hasUpdated = useRef(true);
  // pages controls
  const [page, setPage] = useState(0);
  const handlePageChange = useCallback(
    (action: "prev" | "next") => {
      if (action == "next") {
        setPage((n) => n + 1);
        hasUpdated.current = false;
      } else if (action == "prev") {
        if (page > 0) {
          setPage((n) => n - 1);
          hasUpdated.current = false;
        }
      }
    },
    [page]
  );

  useEffect(() => {
    async function fetchData() {
      // revalidate all deals every 10 minutes
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${page}&pageSize=20`,
        { next: { revalidate: 10 * 60 } }
      );
      const res = await response.json();
      hasUpdated.current = true;
      setDeals(res);
    }
    fetchData();
  }, [page]);

  if (!deals || !deals?.length) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <h2>All Deals</h2>
      <AllDealsList deals={deals} updating={hasUpdated.current} />
      <button onClick={() => handlePageChange("prev")}>Prev</button>
      <button onClick={() => handlePageChange("next")}>Next</button>
      {/* indicator for the user that fetching is being done */}
      {hasUpdated.current ? null : <h4>🌀</h4>}
    </div>
  );
}
