"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ErrorStyled = styled.main`
  margin: 0 10%;
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
`;
