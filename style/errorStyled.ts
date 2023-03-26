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
  svg {
    fill: ${theme.colors.white};
    opacity: 0.5;
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    h2 {
      font-size: 40px;
      text-align: center;
      width: 100%;
    }
    button {
      font-size: 24px;
    }
    margin: 0 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
