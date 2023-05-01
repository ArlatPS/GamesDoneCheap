"use client";

import { storesOfInterest } from "@/public/storesOfInterest";
import { DropdownSectionWithDivs } from "@/style/nav";
import Link from "next/link";
import { useState } from "react";
import AngleDownSVG from "../svg/angleDown";

export default function DropDownStores() {
  const [opened, setOpened] = useState(false);
  return (
    <DropdownSectionWithDivs
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      <span>
        Stores <AngleDownSVG />
      </span>
      {opened ? (
        <div className="divAround">
          {storesOfInterest.map((store) => (
            <div key={store.storeID}>
              <Link
                href={`/store/${store.storeName}`}
                onClick={() => setOpened(false)}
              >
                {store.storeNameDisplay}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </DropdownSectionWithDivs>
  );
}
