"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainAllDealsStyled = styled.main`
  color: ${theme.colors.white};
  margin: 0 10%;
  h1 {
    font-family: var(--orienta);
    font-size: 36px;
    margin-top: 2rem;
  }
  .dealsPerPage {
    margin: 2rem 0;
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
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
`;

export const SearchControlsStyled = styled.section`
  font-family: var(--prompt);
  position: relative;
  transition: 250ms ease-in;

  .dropdownButton {
    background-color: ${theme.colors.night};
    margin-top: 0.5em;
    user-select: none;
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
  .steamRating {
    margin-top: 1rem;
    span {
      margin-left: 0.5rem;
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
      transform: scale(1.2);
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
  .submitButton {
    margin-top: 1em;
    font-size: 24px;
  }
`;

export const StorePickerStyled = styled.div`
  @keyframes animate-dropdown {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
  transform-origin: top center;
  animation: animate-dropdown 500ms ease-in-out;

  button {
    margin-top: 0.5em;
  }
  ul {
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  div {
    margin-bottom: 0.25em;
    label {
      padding-left: 10px;
      position: relative;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      .checkbox {
        position: absolute;
        top: 2px;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.red};
        box-shadow: 0px 0px 3px 1px ${theme.colors.red};
        border-radius: 5px;
      }
      input {
        visibility: hidden;
      }
      input:checked ~ .checkbox {
        background-color: ${theme.colors.red};
      }
      input:hover ~ .checkbox {
        cursor: pointer;
      }
    }
  }
`;

export const PageControl = styled.div`
  display: flex;
  justify-content: center;
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h4 {
      font-family: var(--orienta);
      font-size: 20px;
      width: 100%;
      text-align: center;
      margin: 0;
      margin-bottom: 1em;
    }
    button:first-of-type {
      margin-right: 1em;
    }
    button {
      font-size: 24px;
    }
    margin-bottom: 2em;
  }
`;

export const SectionAroundAllDealsResult = styled.section`
  margin: 2rem 0;
  min-height: 70vh;
`;
