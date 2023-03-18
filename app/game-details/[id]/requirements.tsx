"use client";
import AngleDownSVG from "@/components/svg/angleDown";
import { RequirementsStyled } from "@/style/gameDetails/steamSection";
import { useState } from "react";
import parse from "html-react-parser";

export default function Requirements({
  requirements,
}: {
  requirements: {
    minimum: string;
    recommended: string;
  };
}) {
  const [opened, setOpened] = useState(false);
  return (
    <RequirementsStyled>
      <h4 onClick={() => setOpened((n) => !n)}>
        Requirements <AngleDownSVG />
      </h4>
      {opened ? (
        <div className="absoluteDiv">
          <div>{parse(requirements.minimum)}</div>
          <div>{parse(requirements.recommended)}</div>
        </div>
      ) : null}
    </RequirementsStyled>
  );
}
