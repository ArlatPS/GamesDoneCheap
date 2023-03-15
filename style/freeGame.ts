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
    text-decoration: none;
  }
`;
