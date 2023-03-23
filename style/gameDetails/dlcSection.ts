"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const DLCSectionStyled = styled.section`
  h2 {
    font-family: var(--orienta);
  }
  #dlcCoverImg {
    height: 69px;
    width: 48px;
  }
  .tableForDLCs {
    margin-top: 0;
    .tdWithSvg {
      cursor: pointer;
      width: 80px;
      svg {
        height: 25px;
        display: inline;
        fill: ${theme.colors.white};
      }
    }
    td:nth-of-type(3) {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
  .rowOfDlcDeal {
    td:nth-of-type(3) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    td:nth-of-type(5) {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
    // previously described animation
    transform-origin: top center;
    animation: animate-dropdown 300ms ease-in forwards;
  }
`;
