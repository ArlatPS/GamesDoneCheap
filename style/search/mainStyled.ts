"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainSearchStyled = styled.main`
  margin: 0 10%;
  h1 {
    font-family: var(--orienta);
    span {
      color: ${theme.colors.red};
    }
  }
  section {
    display: flex;
    justify-content: space-between;
  }
  .tableForSearch {
    td:nth-of-type(3) {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
  @media (max-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    margin: 0 5px;
  }
`;
