"use client";

import { storesOfInterest } from "@/public/storesOfInterest";
import Link from "next/link";
import { useState } from "react";
import AngleDownSVG from "../svg/angleDown";

export default function DropDownStores() {
  const [opened, setOpened] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      <h4>
        Stores <AngleDownSVG />
      </h4>
      {opened
        ? storesOfInterest.map((store) => (
            <div key={store.storeID}>
              <Link href={`/store/${store.storeName}`}>{store.storeName}</Link>
            </div>
          ))
        : null}
    </div>
  );
}
