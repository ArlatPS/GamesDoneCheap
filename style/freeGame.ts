"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const FreeGameDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  font-family: var(--prompt), sans-serif;
  color: ${theme.colors.white};
  .storeDiv {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 5rem;
    font-size: 24px;
    img {
      height: 100%;
      width: 2.5em;
      margin-right: 1em;
    }
  }
  img {
    width: 100%;
    object-fit: contain;
  }
  h3 {
    font-size: 30px;
    text-align: center;
    margin: 0.5em;
  }
  .daysLeft,
  .hoursLeft {
    text-align: center;
    h3 {
      font-size: 42px;
      margin: 0;
      margin-top: 0.5em;
      text-decoration: none;
    }
    h4 {
      font-size: 28px;
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }
  .daysLeft {
    color: ${theme.colors.blue};
  }
  .hoursLeft {
    color: ${theme.colors.red};
  }
`;
