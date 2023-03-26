"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ErrorStyled = styled.main`
  margin: 0 10%;
  min-height: 90vh;
  h2 {
    font-size: 48px;
    font-family: var(--orienta);
  }
  button {
    font-size: 30px;
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
