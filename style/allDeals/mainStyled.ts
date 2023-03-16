"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainAllDealsStyled = styled.main`
  color: ${theme.colors.white};
  h1 {
    margin-left: 10%;
    font-family: var(--orienta);
    font-size: 36px;
    margin-top: 2rem;
  }
  .dealsPerPage {
    margin: 2rem 10%;
    display: flex;
    justify-content: flex-end;
    label {
      font-family: var(--prompt);
      margin-right: 0.5em;
      font-size: 18px;
    }
    select {
      background-color: ${theme.colors.night};
      color: ${theme.colors.white};
      border: none;
      font-size: 18px;
    }
  }
`;

export const SearchControlsStyled = styled.section`
  margin-left: 10%;
  font-family: var(--prompt);
  position: relative;
  transition: 250ms ease-in;

  .dropdownButton {
    background-color: ${theme.colors.night};
    padding: 0;
    border: none;
    color: ${theme.colors.white};
    font-size: 24px;
    /* width: 10%; */
    text-align: start;
    svg {
      height: 18px;
      fill: ${theme.colors.white};
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

export const DivDropdownAbsolute = styled.div`
  font-size: 18px;
  position: absolute;
  top: 34px;
  left: 75px;
  width: 50%;
  background-color: ${theme.colors.night};
  border: 2px solid ${theme.colors.grey};
  // animation
  @keyframes animate-dropdown {
    0% {
      transform: rotateX(-90deg);
      transform: scale(0);
    }
    70% {
      transform: rotateX(20deg);
      transform: scale(1.1);
    }
    100% {
      transform: rotateX(0deg);
      transform: scale(1);
    }
  }
  transform-origin: top left;
  animation: animate-dropdown 400ms ease-in forwards;

  // styles inside
  padding: 2rem;
  font-family: var(--prompt);
  h3 {
    margin: 0 0 1em 0;
  }
  label {
    margin-right: 0.5em;
    font-size: 20px;
  }
  select {
    background-color: ${theme.colors.night};
    color: ${theme.colors.white};
    border: none;
    font-size: 18px;
  }
  h4 {
    font-size: 18px;
    margin: 0.5em 0;
    font-weight: 400;
  }
`;

export const StorePickerStyled = styled.div`
  button {
    margin-top: 0.5em;
  }
`;
