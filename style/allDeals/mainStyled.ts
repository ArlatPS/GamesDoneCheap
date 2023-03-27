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
      &:hover {
        cursor: pointer;
      }
    }
    @media (max-width: ${theme.md}) {
      label {
        font-size: 16px;
      }
    }
    @media (max-width: ${theme.sm}) {
      margin: 1rem 0;
      label {
        font-size: 14px;
      }
      select {
        font-size: 16px;
      }
    }
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    h1 {
      font-size: 30px;
    }
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    h1 {
      font-size: 20px;
      margin-top: 1rem;
    }
    margin: 0 5px;
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
    margin-top: 1rem;
    @media (max-width: ${theme.md}) {
      font-size: 20px;
    }
    @media (max-width: ${theme.sm}) {
      font-size: 14px;
      svg {
        height: 10px;
      }
    }
  }
  .steamRating {
    margin-top: 1rem;
    span {
      margin-left: 0.5rem;
    }
    input {
      accent-color: ${theme.colors.red};
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
    &:hover {
      cursor: pointer;
    }
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
  @media (max-width: ${theme.md}) {
    width: 500px;
    font-size: 16px;
    h4 {
      font-size: 16px;
    }
    .submitButton {
      font-size: 20px;
    }
  }
  @media (max-width: ${theme.sm}) {
    left: 30px;
    padding: 0.5rem;
    width: 270px;
    font-size: 12px;
    h4,
    label,
    select {
      font-size: 12px;
    }
    .submitButton {
      font-size: 14px;
    }
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
        @media (max-width: ${theme.sm}) {
          height: 20px;
          width: 20px;
        }
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
  @media (max-width: ${theme.md}) {
    label {
      font-size: 18px;
    }
  }
  @media (max-width: ${theme.sm}) {
    ul {
      grid-template-columns: 1fr;
    }
    div {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
      label {
        font-size: 14px;
      }
    }
    button {
      font-size: 14px;
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
  @media (max-width: ${theme.md}) {
    div {
      h4 {
        font-size: 16px;
      }
      button {
        font-size: 20px;
      }
    }
  }
  @media (max-width: ${theme.sm}) {
    div {
      h4 {
        font-size: 14px;
      }
      button {
        font-size: 16px;
      }
    }
  }
`;

export const SectionAroundAllDealsResult = styled.section`
  margin: 2rem 0;
  min-height: 70vh;
  @media (max-width: ${theme.sm}) {
    margin: 1rem 0;
  }
`;
