"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const SteamSectionStyled = styled.section`
  .firstRow {
    display: flex;
    justify-content: space-between;
    img {
      margin-right: 2rem;
    }
    text-align: center;
    font-family: var(--orienta);
  }
  .secondRow {
    div:first-of-type {
      width: 50%;
      margin-right: 2rem;
      font-family: var(--orienta);
      text-align: center;
      a {
        font-family: var(--prompt);
        color: ${theme.colors.blue};
        font-size: 20px;
      }
    }
    margin-top: 2rem;
    display: flex;
    font-family: var(--prompt);

    .screenshotGallery {
      width: 50%;
      img {
        width: 100%;
        height: ${100 * 0.8 * 0.5 * 0.56}vw;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
  .thirdRow {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    font-family: var(--prompt);
    div {
      margin-right: 2rem;
    }
  }
`;

export const RequirementsStyled = styled.div`
  @keyframes animate-requirements {
    0% {
      transform: rotateX(-90deg);
      transform: scale(0);
    }
    100% {
      transform: rotateX(0deg);
      transform: scale(1);
    }
  }
  .absoluteDiv {
    animation: animate-requirements 400ms ease-in-out forwards;
    transform-origin: top left;
    width: 80vw;
    position: absolute;
    z-index: 2;
    background-color: ${theme.colors.night};
    border: 1px solid ${theme.colors.red};
    box-shadow: 0px 0px 8px 1px ${theme.colors.red};
    border-radius: 12px;
    display: flex;
    div {
      width: 50%;
      padding: 1rem;
    }
  }
  h4 {
    &:hover {
      cursor: pointer;
    }
    svg {
      height: 20px;
      fill: ${theme.colors.white};
    }
  }
`;
