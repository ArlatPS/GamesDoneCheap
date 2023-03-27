"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const DetailsMainStyled = styled.main`
  min-height: 90vh;
  margin: 0 10%;
  font-family: var(--orienta);

  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    max-width: 100vw;
  }
`;
