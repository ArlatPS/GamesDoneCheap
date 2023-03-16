import { DealsListGame, StoreFromShark } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import ListOfDeals from "../listOfDeals";

function AllDealsList({
  deals,
  hasUpdated,
  stores,
}: {
  deals: DealsListGame[];
  hasUpdated: boolean;
  stores: StoreFromShark[];
}) {
  if (hasUpdated) {
    return (
      <section>
        {deals.length > 0 ? (
          <ListOfDeals deals={deals} stores={stores} />
        ) : (
          <h4>No Deals found for current filters</h4>
        )}
      </section>
    );
  }
  return <h1>WE ARE LOADING</h1>;
}
export default memo(AllDealsList);
