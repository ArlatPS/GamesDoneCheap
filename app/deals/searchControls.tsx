import { Dispatch, useEffect, useState } from "react";
import { StateActions } from "./reducer";

import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

import styled from "styled-components";
import { StoreFromShark } from "@/globalTypes";
import StorePicker from "@/components/deals/storePicker";

const DivDropdownAbsolute = styled.div`
  background-color: aliceblue;
  font-size: 18px;
  position: absolute;
  width: 50%;
`;

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

  // set default chosen stores
  useEffect(() => {
    setChosenStores(stores.map((store) => store.storeID));
  }, [stores]);

  const handleChange = (e: ChangeResult) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  return (
    <section>
      <div onClick={() => setOpened((n) => !n)}>
        <h4>Filters</h4>
      </div>
      {opened ? (
        <DivDropdownAbsolute>
          <h5>Choose filters</h5>
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
            <h3>Price</h3>
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
              barInnerColor="blue"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <br />
            <StorePicker
              stores={stores}
              chosenStores={chosenStores}
              setChosenStores={setChosenStores}
            />
            {chosenStores.length > 0 ? (
              <button>Filter</button>
            ) : (
              <h5>choose at least one store</h5>
            )}
          </form>
        </DivDropdownAbsolute>
      ) : null}
    </section>
  );
}
