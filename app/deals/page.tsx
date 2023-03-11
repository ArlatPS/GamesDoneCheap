"use client";
import { useEffect, useReducer } from "react";
import AllDealsList from "./allDealsList";
import SearchControls from "./searchControls";
import { State, stateReducer } from "./reducer";

const initialState: State = {
  page: 0,
  hasUpdated: false,
  maxPages: 0,
  deals: [],
  pageSize: 20,
};

export default function Deals() {
  // state reducer
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      // revalidate all deals every 10 minutes
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${state.page}&pageSize=20`,
        { next: { revalidate: 10 * 60 } }
      );
      const res = await response.json();
      // get max-pages from header
      if (response.headers.get("x-total-page-count")) {
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
  }, [state.page]);

  return (
    <div>
      <h2>All Deals</h2>
      <SearchControls dispatch={dispatchState} />
      <AllDealsList deals={state.deals} hasUpdated={state.hasUpdated} />
      <h5>
        <button onClick={() => dispatchState({ type: "prevPage" })}>
          Prev
        </button>
        <button onClick={() => dispatchState({ type: "nextPage" })}>
          Next
        </button>
        Page {state.page + 1}/{state.maxPages}
      </h5>
    </div>
  );
}
