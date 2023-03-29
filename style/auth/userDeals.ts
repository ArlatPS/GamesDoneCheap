"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const UserDealsStyled = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  h2 {
    font-family: var(--orienta);
    font-size: 32px;
    letter-spacing: 1px;
    margin-bottom: 2rem;

    @media (max-width: ${theme.md}) {
      font-size: 26px;
    }
    @media (max-width: ${theme.sm}) {
      font-size: 20px;
      margin-bottom: 1rem;
    }
  }
  .listOfUserDeals {
    td:nth-of-type(3) {
      min-width: 352px;
      @media (max-width: ${theme.md}) {
        min-width: 100%;
      }
      @media (max-width: ${theme.sm}) {
        min-width: 175px;
      }
    }
  }
`;
