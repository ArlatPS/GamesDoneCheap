"use client";
import { useCallback, useEffect, useState, useRef, useReducer } from "react";
import { DealsListGame } from "@/globalTypes";
import AllDealsList from "./allDealsList";

type ControlsState = {
  page: number;
  hasUpdated: boolean;
  maxPages: number;
};

type SetMaxPages = {
  type: "setMaxPages";
  payload: number;
};

type ControlsActionsWithPayload = SetMaxPages;

type ControlsActionsWithoutPayload = {
  type: "nextPage" | "prevPage" | "setHasUpdatedTrue" | "setHasUpdatedFalse";
};

type ControlsActions =
  | ControlsActionsWithoutPayload
  | ControlsActionsWithPayload;

function controlsReducer(state: ControlsState, action: ControlsActions) {
  switch (action.type) {
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

const initialStateOfControls: ControlsState = {
  page: 0,
  hasUpdated: true,
  maxPages: 0,
};

export default function Deals() {
  const [deals, setDeals] = useState<DealsListGame[]>([]);
  // ref for keeping track of whether user is waiting for next page to load
  // const hasUpdated = useRef(true);

  // controls reducer
  const [controls, dispatchControls] = useReducer(
    controlsReducer,
    initialStateOfControls
  );

  useEffect(() => {
    async function fetchData() {
      // revalidate all deals every 10 minutes
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${controls.page}&pageSize=20`,
        { next: { revalidate: 10 * 60 } }
      );
      const res = await response.json();
      // get max-pages from header
      if (response.headers.get("x-total-page-count")) {
        dispatchControls({
          type: "setMaxPages",
          payload: Number(response.headers.get("x-total-page-count")),
        });
      }
      // updated is true
      dispatchControls({ type: "setHasUpdatedTrue" });
      setDeals(res);
    }
    fetchData();
  }, [controls.page]);

  if (!deals || !deals?.length) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <h2>All Deals</h2>
      <AllDealsList deals={deals} hasUpdated={controls.hasUpdated} />
      <h5>
        <button onClick={() => dispatchControls({ type: "prevPage" })}>
          Prev
        </button>
        <button onClick={() => dispatchControls({ type: "nextPage" })}>
          Next
        </button>
        Page {controls.page + 1}/{controls.maxPages}
      </h5>
      {/* indicator for the user that fetching is being done */}
      {controls.hasUpdated ? null : <h4>🌀</h4>}
    </div>
  );
}
