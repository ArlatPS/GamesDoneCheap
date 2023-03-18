"use client";

import { storesOfInterest } from "@/public/storesOfInterest";
import { DropdownSectionWithDivs } from "@/style/nav";
import Link from "next/link";
import { useState } from "react";
import AngleDownSVG from "../svg/angleDown";

export default function DropDownStores() {
  const [opened, setOpened] = useState(true);
  return (
    <DropdownSectionWithDivs
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      <span>
        Stores <AngleDownSVG />
      </span>
      <div className="divAround">
        {opened
          ? storesOfInterest.map((store) => (
              <div key={store.storeID}>
                <Link href={`/store/${store.storeName}`}>
                  {store.storeNameDisplay}
                </Link>
              </div>
            ))
          : null}
      </div>
    </DropdownSectionWithDivs>
  );
}
