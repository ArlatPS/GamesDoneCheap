import Image from "next/image";
import { cache, useEffect, useState } from "react";
import Link from "next/link";
import { DealsListItem } from "@/globalTypes";

const fetchBestDeals = cache(async (length: number) => {
  // revalidate best deals every 5 minutes
  const response = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?pageSize=60",
    { next: { revalidate: 5 * 60 } }
  );
  try {
    const res = (await response.json()) as DealsListItem[];
    // filter out games that don't have steamAppID
    const filtered = res.filter((game) => game.steamAppID != null);
    return filtered.slice(0, length);
  } catch {
    console.error("CHEAP SHARK API UNAVAILABLE");
  }
});

export default async function BestDeals() {
  const deals = await fetchBestDeals(15);
  if (deals && deals?.length) {
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
                  <Link href={`/game-details/${deal.gameID}`}>
                    {deal.gameID}
                  </Link>
                </li>
              ))
            : null}
        </ol>
      </div>
    );
  }
}
