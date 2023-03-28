"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const DLCSectionStyled = styled.section`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  h2 {
    width: 100%;
    font-family: var(--orienta);
    text-align: center;
  }
  #dlcCoverImg {
    height: 69px;
    width: 48px;
  }
  .tableForDLCs {
    min-width: 455px;
    margin-top: 0;
    .tdWithSvg {
      cursor: pointer;
      width: 80px;
      svg {
        height: 25px;
        display: inline;
        fill: ${theme.colors.white};
      }
      @media (max-width: ${theme.sm}) {
        svg {
          height: 15px;
        }
      }
    }
    td:nth-of-type(1) {
      width: 80px;
    }

    td:nth-of-type(3) {
      width: 80px;
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
  @media (max-width: ${theme.sm}) {
    width: 100%;
    #dlcCoverImg {
      height: 35px;
      width: 24px;
    }
    .tableForDLCs {
      min-width: 90%;
      td:nth-of-type(1) {
        width: 50px;
      }
      td:nth-of-type(3) {
        width: 50px;
      }
    }
  }
`;
