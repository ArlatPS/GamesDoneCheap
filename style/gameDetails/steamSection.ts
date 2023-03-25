"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const SteamSectionStyled = styled.section`
  .firstRow {
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-family: var(--orienta);
    .divWithLowestPrice {
      width: 50%;
      padding-left: 1rem;
    }
    @media (max-width: ${theme.sm}) {
      img {
        width: 100%;
      }
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .secondRow {
    .descDiv {
      display: flex;
      align-content: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 50%;
      margin-right: 2rem;
      font-family: var(--orienta);
      text-align: center;
      a {
        width: 100%;
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
    @media (max-width: ${theme.sm}) {
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 0;
      .descDiv {
        width: 100%;
        margin: 0;
        font-size: 12px;
      }
      .screenshotGallery {
        width: 100%;
        img {
          height: ${100 * 0.8 * 1 * 0.56}vw;
        }
        .buttons {
          button {
            font-size: 18px;
          }
        }
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
    @media (max-width: ${theme.sm}) {
      flex-wrap: wrap;
      h4 {
        font-size: 14px;
      }
      div {
        margin-right: 0;
      }
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
    @media (min-width: ${theme.xxl}) {
      width: 60vw;
    }
    @media (max-width: ${theme.sm}) {
      flex-wrap: wrap;
      div {
        width: 100%;
      }
      font-size: 12px;
      width: 95vw;
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
