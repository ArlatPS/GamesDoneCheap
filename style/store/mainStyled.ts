"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainStoreStyled = styled.main`
  margin: 0 10%;
  .storeBanner {
    width: 100%;
    /* margin-left: 10%; */
    height: 400px;
  }
  h1 {
    font-family: var(--orienta);
    text-align: center;
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
`;
