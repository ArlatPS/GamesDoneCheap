"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const DetailsMainStyled = styled.main`
  min-height: 90vh;
  margin: 0 10%;
  font-family: var(--orienta);
  svg {
    fill: ${theme.colors.white};
    height: 50px;
    margin-right: 20px;
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
`;
