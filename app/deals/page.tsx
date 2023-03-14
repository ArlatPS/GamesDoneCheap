"use client";
import { useEffect, useReducer } from "react";
import AllDealsList from "../../components/deals/allDealsList";
import SearchControls from "./searchControls";
import { State, stateReducer } from "./reducer";
import getStores from "@/lib/getStores";
import { DealsListGame } from "@/globalTypes";

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
    <div>
      <h2>All Deals</h2>
      <SearchControls dispatch={dispatchState} stores={state.stores} />
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
      <AllDealsList deals={state.deals} hasUpdated={state.hasUpdated} />
      <h5>
        <button onClick={() => dispatchState({ type: "prevPage" })}>
          Prev
        </button>
        <button onClick={() => dispatchState({ type: "nextPage" })}>
          Next
        </button>
        Page {state.page + 1}/{state.maxPages + 1}
      </h5>
    </div>
  );
}
