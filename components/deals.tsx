"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DealsListItem } from "@/globalTypes";

export default function Deals() {
  const [deals, setDeals] = useState<DealsListItem[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://www.cheapshark.com/api/1.0/deals?pageSize=20",
        { next: { revalidate: 600 } }
      );
      const res = await response.json();
      console.log(res);
      setDeals(res);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h2>Best Deals</h2>
      <ul>
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
                <Link href={`/gameDetails/${deal.gameID}`}>{deal.gameID}</Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
