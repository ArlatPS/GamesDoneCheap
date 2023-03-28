"use client";

import AngleDownSVG from "@/components/svg/angleDown";
import { GameFromShark } from "@/globalTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import ListOfDlcDeals from "./listOfDlcDeals";

export default function DLC({ idShark }: { idShark: string }) {
  const [dlc, setDlc] = useState<"loading" | GameFromShark>("loading");
  const [opened, setOpened] = useState(false);
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
      <tr>
        <td colSpan={6}>Loading</td>
      </tr>
    );
  }

  return (
    <>
      <tr>
        <td colSpan={1} className="tdWithCover">
          <Image
            width={96}
            height={138}
            src={dlc.info.thumb}
            alt={"DLC Cover Photo"}
            id="dlcCoverImg"
          />
        </td>
        <td colSpan={3}>{dlc.info.title}</td>
        <td
          colSpan={1}
          className="tdWithSvg"
          onClick={() => setOpened((n) => !n)}
        >
          <AngleDownSVG />
        </td>
      </tr>
      {opened ? <ListOfDlcDeals deals={dlc.deals} /> : null}
    </>
  );
}
