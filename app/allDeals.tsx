"use client";
import Image from "next/image";
import { cache, useEffect, useState } from "react";
import Link from "next/link";
import { DealsListItem } from "@/globalTypes";

export default function AllDeals() {
  const [deals, setDeals] = useState<DealsListItem[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageSize=20?page=${page}`,
        { next: { revalidate: 600 } }
      );
      const res = await response.json();
      setDeals(res);
    }
    fetchData();
  }, [page]);

  if (!deals || !deals?.length) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <h2>Best Deals</h2>
      <ol>
        {deals.length > 0
          ? deals.map((deal) => (
              <li key={deal.dealID}>
                <Image
                  src={deal.thumb}
                  width={80}
                  height={120}
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
    </div>
  );
}
