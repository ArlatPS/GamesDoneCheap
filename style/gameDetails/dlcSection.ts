"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const DLCSectionStyled = styled.section`
  h2 {
    font-family: var(--orienta);
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
  .tableForDlcDeals {
    /* position: absolute; */
  }
`;
