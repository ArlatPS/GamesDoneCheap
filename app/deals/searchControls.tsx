import { Dispatch, useEffect, useState } from "react";
import { StateActions } from "./reducer";

import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

import styled from "styled-components";
import { StoreFromShark } from "@/globalTypes";
import StorePicker from "@/components/deals/storePicker";
import {
  DivDropdownAbsolute,
  SearchControlsStyled,
} from "@/style/allDeals/mainStyled";
import AngleDownSVG from "@/components/svg/angleDown";
import { ButtonStyled } from "@/style/button";
import { theme } from "@/theme";

const sortingOptions = [
  "Deal Rating",
  "Title",
  "Savings",
  "Price",
  "Metacritic",
  "Reviews",
  "Release",
  "Store",
  "Recent",
];

export default function SearchControls({
  dispatch,
  stores,
}: {
  dispatch: Dispatch<StateActions>;
  stores: StoreFromShark[];
}) {
  const [opened, setOpened] = useState(false);
  const [sortBy, setSortBy] = useState("Deal Rating");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);
  const [chosenStores, setChosenStores] = useState<string[]>([]);
  const [steamRating, setSteamRating] = useState(0);

  // set default chosen stores
  useEffect(() => {
    setChosenStores(stores.map((store) => store.storeID));
  }, [stores]);

  const handleChange = (e: ChangeResult) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  return (
    <SearchControlsStyled>
      <div>
        <button className="dropdownButton" onClick={() => setOpened((n) => !n)}>
          Filters <AngleDownSVG />
        </button>
      </div>
      {opened ? (
        <DivDropdownAbsolute>
          <h3>Choose filters</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: "setSortBy", payload: sortBy });
              dispatch({
                type: "setPrices",
                payload: { min: minValue, max: maxValue },
              });
              dispatch({
                type: "setChosenStores",
                payload: chosenStores,
              });
              dispatch({
                type: "setSteamRating",
                payload: steamRating,
              });

              setOpened(false);
            }}
          >
            <label htmlFor="sortBy">Sort Results By</label>
            <select
              name="sortBy"
              id="sortBy"
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortingOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            <h4>Price</h4>
            <MultiRangeSlider
              min={0}
              max={50}
              step={5}
              labels={[
                "0",
                "5",
                "10",
                "15",
                "20",
                "25",
                "30",
                "40",
                "45",
                "max",
              ]}
              minValue={minValue}
              maxValue={maxValue}
              barInnerColor={theme.colors.red}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <StorePicker
              stores={stores}
              chosenStores={chosenStores}
              setChosenStores={setChosenStores}
            />
            <div className="steamRating">
              <label htmlFor="rating">Minimum Steam rating</label>
              <input
                type="range"
                id="rating"
                value={steamRating}
                onChange={(e) => setSteamRating(+e.target.value)}
                min={0}
                max={100}
              />
              <span>{steamRating}</span>
            </div>
            {chosenStores.length > 0 ? (
              <ButtonStyled className="submitButton">Filter</ButtonStyled>
            ) : (
              <h5>choose at least one store</h5>
            )}
          </form>
        </DivDropdownAbsolute>
      ) : null}
    </SearchControlsStyled>
  );
}
