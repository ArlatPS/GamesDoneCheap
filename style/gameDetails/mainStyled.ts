"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainGameDetailsStyled = styled.main`
  color: ${theme.colors.white};
  margin: 0 10%;
  h1 {
    font-family: var(--orienta);
    font-size: 40px;
  }
  h5 {
    font-family: var(--prompt);
    font-weight: 400;
  }
  .sectionWithoutSteam {
    font-family: var(--prompt);
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  .divWithLowestPrice {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    div,
    h5 {
      width: 100%;
    }
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

export const DivForLowestPiceStyled = styled.div`
  h3 {
    span {
      color: ${theme.colors.blue};
    }
    margin-bottom: 0.5em;
  }
  h4 {
    margin-top: 0;
  }
`;
