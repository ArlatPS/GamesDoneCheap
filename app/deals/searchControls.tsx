import { Dispatch, useState } from "react";
import { StateActions } from "./reducer";

import styled from "styled-components";

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
}: {
  dispatch: Dispatch<StateActions>;
}) {
  const [opened, setOpened] = useState(false);
  const [sortBy, setSortBy] = useState("Deal Rating");
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
            <button>Filter</button>
          </form>
        </DivDropdownAbsolute>
      ) : null}
    </section>
  );
}
