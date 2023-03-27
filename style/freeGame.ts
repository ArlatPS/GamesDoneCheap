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
  img {
    width: 100%;
    object-fit: contain;
  }
  h3 {
    font-size: 30px;
    text-align: center;
    margin: 0.5em;
  }
  @media (max-width: ${theme.md}) {
    h3 {
      font-size: 26px;
    }
  }
  @media (max-width: ${theme.sm}) {
    h3 {
      font-size: 20px;
    }
    img {
      height: 100px;
    }
  }
  .storeDiv {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 5rem;
    font-size: 24px;
    padding: 10px;
    img {
      height: 100%;
      width: 2.5em;
      margin-right: 1em;
    }
    @media (max-width: ${theme.md}) {
      font-size: 16px;
    }
    @media (max-width: ${theme.sm}) {
      img {
        height: 35px;
      }
      align-items: center;
      font-size: 14px;
      text-align: center;
    }
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
    @media (max-width: ${theme.sm}) {
      h3 {
        font-size: 24px;
      }
      h4 {
        font-size: 18px;
      }
    }
  }
  .daysLeft {
    color: ${theme.colors.blue};
  }
  .hoursLeft {
    color: ${theme.colors.red};
  }
`;
