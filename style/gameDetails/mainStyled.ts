"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainGameDetailsStyled = styled.main`
  color: ${theme.colors.white};
  min-height: 95vh;
  margin: 0 10%;
  .titleAndAdd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--orienta);
    h1 {
      font-size: 40px;
    }
    div {
      display: flex;
      align-items: center;
      span {
        font-size: 20px;
        margin-right: 0.5em;
      }
    }
    @media (max-width: ${theme.sm}) {
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      h1 {
        font-size: 26px;
      }
      div {
        span {
          font-size: 14px;
        }
      }
    }
  }
  h5 {
    font-family: var(--prompt);
    font-weight: 400;
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    margin: 0 5px;
  }
  .sectionWithoutSteam {
    font-family: var(--prompt);
    display: flex;
    justify-content: space-between;
    text-align: center;
    @media (max-width: ${theme.sm}) {
      flex-wrap: wrap;
      justify-content: center;
    }
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
  @media (max-width: ${theme.sm}) {
    h2 {
      font-size: 18px;
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
