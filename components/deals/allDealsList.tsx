import { DealsListGame, StoreFromShark } from "@/globalTypes";
import { memo } from "react";
import ListOfDeals from "../listOfDeals";
import styled from "styled-components";
import AllDealsListLoader from "./allDealsListLoader";
import { SectionAroundAllDealsResult } from "@/style/allDeals/mainStyled";

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
      <SectionAroundAllDealsResult>
        {deals.length > 0 ? (
          <ListOfDeals deals={deals} stores={stores} />
        ) : (
          <h4>No Deals found for current filters</h4>
        )}
      </SectionAroundAllDealsResult>
    );
  }
  return (
    <SectionAroundAllDealsResult>
      <AllDealsListLoader />
    </SectionAroundAllDealsResult>
  );
}
export default memo(AllDealsList);
