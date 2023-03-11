"use client";
import { useCallback, useEffect, useState, useRef, useReducer } from "react";
import { DealsListGame } from "@/globalTypes";
import AllDealsList from "./allDealsList";

type State = {
  page: number;
  hasUpdated: boolean;
  maxPages: number;
  deals: DealsListGame[];
};

type SetMaxPages = {
  type: "setMaxPages";
  payload: number;
};

type SetDeals = {
  type: "setDeals";
  payload: DealsListGame[];
};

type StateActionsWithPayload = SetMaxPages | SetDeals;

type StateActionsWithoutPayload = {
  type: "nextPage" | "prevPage" | "setHasUpdatedTrue" | "setHasUpdatedFalse";
};

type StateActions = StateActionsWithoutPayload | StateActionsWithPayload;

function stateReducer(state: State, action: StateActions) {
  switch (action.type) {
    case "setDeals":
      if (action.payload) {
        return {
          ...state,
          deals: action.payload,
        };
      }
    case "nextPage":
      if (state.page < state.maxPages) {
        return {
          ...state,
          page: state.page + 1,
          hasUpdated: false,
        };
      } else {
        return { ...state };
      }
    case "prevPage":
      if (state.page > 0) {
        return {
          ...state,
          page: state.page - 1,
          hasUpdated: false,
        };
      } else {
        return { ...state };
      }
    case "setMaxPages":
      if (action.payload) {
        return {
          ...state,
          maxPages: action.payload,
        };
      }
    case "setHasUpdatedTrue":
      return {
        ...state,
        hasUpdated: true,
      };
    case "setHasUpdatedFalse":
      return {
        ...state,
        hasUpdated: false,
      };

    default:
      // if action.type doesn't match throw Error
      throw Error("Unknown action");
  }
}

const initialState: State = {
  page: 0,
  hasUpdated: false,
  maxPages: 0,
  deals: [],
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
