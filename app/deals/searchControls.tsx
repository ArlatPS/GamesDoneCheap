import { Dispatch, useState } from "react";
import { StateActions } from "./reducer";

import styled from "styled-components";

const DivDropdownAbsolute = styled.div`
  background-color: aliceblue;
  font-size: 18px;
  position: absolute;
  width: 50%;
`;

export default function SearchControls({
  dispatch,
}: {
  dispatch: Dispatch<StateActions>;
}) {
  const [opened, setOpened] = useState(false);
  return (
    <section>
      <div onClick={() => setOpened((n) => !n)}>
        <h4>Filters</h4>
      </div>
      {opened ? (
        <DivDropdownAbsolute>
          <h5>Choose filters</h5>
          <button></button>
        </DivDropdownAbsolute>
      ) : null}
    </section>
  );
}
