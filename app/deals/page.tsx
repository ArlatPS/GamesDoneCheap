"use client";
import { useEffect, useReducer } from "react";
import AllDealsList from "../../components/deals/allDealsList";
import SearchControls from "./searchControls";
import { State, stateReducer } from "./reducer";
import getStores from "@/lib/getStores";
import { DealsListGame } from "@/globalTypes";
import { MainAllDealsStyled, PageControl } from "@/style/allDeals/mainStyled";
import { ButtonStyled } from "@/style/button";

const initialState: State = {
  page: 0,
  hasUpdated: false,
  maxPages: 0,
  deals: [],
  pageSize: 20,
  sortBy: "Deal Rating",
  minPrice: 0,
  maxPrice: 50,
  stores: [],
  chosenStores: [],
  steamRating: 0,
};

export default function Deals() {
  // state reducer
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  // fetch stores
  useEffect(() => {
    async function fetchStores() {
      const stores = await getStores();
      dispatchState({ type: "setStores", payload: stores });
    }
    fetchStores();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // revalidate all deals every 10 minutes
      let response;
      // if picked
      if (state.chosenStores.length > 0) {
        response = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?pageNumber=${state.page}\
          &pageSize=${state.pageSize}&sortBy=${state.sortBy}&lowerPrice=${state.minPrice}\
          &upperPrice=${state.maxPrice}&steamRating=${state.steamRating}&storeID=${state.chosenStores}`,
          { next: { revalidate: 10 * 60 } }
        );
      } else {
        response = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?pageNumber=${state.page}\
          &pageSize=${state.pageSize}&sortBy=${state.sortBy}&lowerPrice=${state.minPrice}\
          &upperPrice=${state.maxPrice}&steamRating=${state.steamRating}`,
          { next: { revalidate: 10 * 60 } }
        );
      }
      const res = (await response.json()) as DealsListGame[];
      // get max-pages from header
      if (response.headers.get("x-total-page-count") !== null) {
        dispatchState({
          type: "setMaxPages",
          payload: Number(response.headers.get("x-total-page-count")),
        });
      }
      // updated is true
      dispatchState({ type: "setHasUpdatedTrue" });
      dispatchState({ type: "setDeals", payload: res });
    }
    fetchData();
  }, [
    state.page,
    state.pageSize,
    state.sortBy,
    state.minPrice,
    state.maxPrice,
    state.chosenStores,
    state.steamRating,
  ]);

  return (
    <MainAllDealsStyled>
      <h1>All Deals</h1>
      <SearchControls dispatch={dispatchState} stores={state.stores} />
      <div className="dealsPerPage">
        <label htmlFor="pageSize">Deals per page </label>
        <select
          name="pageSize"
          id="pageSize"
          onChange={(e) => {
            dispatchState({ type: "setPageSize", payload: +e.target.value });
          }}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </div>
      <AllDealsList
        deals={state.deals}
        hasUpdated={state.hasUpdated}
        stores={state.stores}
      />
      <PageControl>
        <div>
          <h4>
            Page {state.page + 1}/{state.maxPages + 1}
          </h4>
          <ButtonStyled onClick={() => dispatchState({ type: "prevPage" })}>
            Prev
          </ButtonStyled>
          <ButtonStyled onClick={() => dispatchState({ type: "nextPage" })}>
            Next
          </ButtonStyled>
        </div>
      </PageControl>
    </MainAllDealsStyled>
  );
}
