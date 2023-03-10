"use client";

import { GameFromShark } from "@/globalTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import ListOfDlcDeals from "./listOfDlcDeals";

export default function DLC({ idShark }: { idShark: string }) {
  const [dlc, setDlc] = useState<"loading" | GameFromShark>("loading");
  useEffect(() => {
    async function fetchDataFromShark() {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${idShark}`
      );
      const responseAfterJSON = await response.json();
      setDlc(responseAfterJSON as GameFromShark);
    }
    fetchDataFromShark();
  }, [idShark]);

  if (dlc == "loading") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Image
        width={80}
        height={60}
        src={dlc.info.thumb}
        alt={"DLC Cover Photo"}
      />
      <h5>{dlc.info.title}</h5>
      {/* {dlc.deals.map((deal) => (
        <div key={deal.dealID}>
          <h6>{deal.price}</h6>
        </div>
      ))} */}
      <ListOfDlcDeals deals={dlc.deals} />
    </div>
  );
}
