"use client";
import Image from "next/image";
import { useCallback, useEffect, useState, memo, useRef } from "react";
import Link from "next/link";
import { DealsListGame } from "@/globalTypes";

function AllDeals() {
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
      <ol>
        {deals.length > 0
          ? deals.map((deal) => (
              <li key={deal.dealID}>
                <Image
                  src={deal.thumb}
                  width={40}
                  height={60}
                  alt={deal.title}
                  placeholder={"blur"}
                  blurDataURL={"/loading.jpg"}
                />
                {`${deal.title} || current: ${deal.salePrice} | normal: ${
                  deal.normalPrice
                  //*1000 to convert from milliseconds to seconds
                } | lastChange: ${new Date(deal.lastChange * 1000)}`}
                <Link href={`/game-details/${deal.gameID}`}>{deal.gameID}</Link>
              </li>
            ))
          : null}
      </ol>
      <button onClick={() => handlePageChange("prev")}>Prev</button>
      <button onClick={() => handlePageChange("next")}>Next</button>
      {/* indicator for the user that fetching is being done */}
      {hasUpdated.current ? null : <h4>🌀</h4>}
    </div>
  );
}

export default memo(AllDeals);
