import { DealsListGame, StoreFromShark } from "@/globalTypes";

export type State = {
  page: number;
  hasUpdated: boolean;
  maxPages: number;
  deals: DealsListGame[];
  pageSize: number;
  sortBy: string;
  minPrice: number;
  maxPrice: number;
  stores: StoreFromShark[];
  chosenStores: string[];
};

type SetMaxPages = {
  type: "setMaxPages";
  payload: number;
};

type SetDeals = {
  type: "setDeals";
  payload: DealsListGame[];
};

type SetPageSize = {
  type: "setPageSize";
  payload: number;
};

type SetSortBy = {
  type: "setSortBy";
  payload: string;
};

type SetPrices = {
  type: "setPrices";
  payload: {
    min: number;
    max: number;
  };
};

type SetStores = {
  type: "setStores";
  payload: StoreFromShark[];
};

type SetChosenStores = {
  type: "setChosenStores";
  payload: string[];
};

type StateActionsWithPayload =
  | SetMaxPages
  | SetDeals
  | SetPageSize
  | SetSortBy
  | SetPrices
  | SetStores
  | SetChosenStores;

type StateActionsWithoutPayload = {
  type: "nextPage" | "prevPage" | "setHasUpdatedTrue" | "setHasUpdatedFalse";
};

export type StateActions = StateActionsWithoutPayload | StateActionsWithPayload;

export function stateReducer(state: State, action: StateActions) {
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
    case "setPageSize":
      if (action.payload) {
        return {
          ...state,
          pageSize: action.payload,
          hasUpdated: false,
          page: 0,
        };
      }
    case "setSortBy":
      if (typeof action.payload == "string") {
        return { ...state, sortBy: action.payload, hasUpdated: false, page: 0 };
      }
    case "setPrices":
      // another if because TS doesn't want to accept payload
      if (action.type == "setPrices") {
        return {
          ...state,
          minPrice: action.payload.min,
          maxPrice: action.payload.max,
          page: 0,
        };
      }
    case "setStores":
      if (action.payload) {
        const stores = action.payload as StoreFromShark[];
        return { ...state, stores };
      }
    case "setChosenStores":
      if (action.payload) {
        return { ...state, chosenStores: action.payload as string[] };
      }

    default:
      // if action.type doesn't match throw Error
      throw Error("Unknown action");
  }
}
