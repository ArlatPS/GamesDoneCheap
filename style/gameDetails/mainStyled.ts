"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainGameDetailsStyled = styled.main`
  margin: 0 10%;
  h1 {
    font-family: var(--orienta);
  }
`;

export const DealsInDetailSectionStyled = styled.section`
  margin-top: 2rem;
  h2 {
    font-family: var(--orienta);
    margin-bottom: 0;
  }
  .tableForDealsInDetails {
    width: 100%;
    margin-top: 0;
    td:nth-of-type(6) {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
`;
