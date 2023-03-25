"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainPageWithSections = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  .mainPageSection {
    margin: 2rem 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h2 {
      width: 100%;
      font-family: var(--orienta);
      font-size: 32px;
      letter-spacing: 1px;
      margin-bottom: 2rem;
    }
    @media (min-width: ${theme.xxl}) {
      margin: 2rem 20%;
    }
    @media (max-width: ${theme.md}) {
      margin: 1rem 5%;
      h2 {
        font-size: 26px;
      }
    }
    @media (max-width: ${theme.sm}) {
      margin: 0 5px;
      h2 {
        font-size: 20px;
        margin-bottom: 1rem;
      }
    }
  }
`;

export const H1WithHoverEffect = styled.h1`
  font-family: var(--space-mono);
  font-size: 52px;
  height: 1em;
  @media (max-width: ${theme.md}) {
    font-size: 38px;
  }
  @media (max-width: ${theme.sm}) {
    font-size: 24px;
  }
`;

export const HeroSection = styled.section`
  margin: 0 10%;
  display: flex;
  iframe {
    border: none;
    /* margin-left: 50%; */
    height: 450px;
  }
  svg {
    position: absolute;
    fill: white;
    opacity: 0.5;
    z-index: -1;
    height: 60vw;
    max-height: 880px;
    right: 20px;
    top: 100px;
    @media (min-width: ${theme.xxl}) {
      right: 240px;
    }
    @media (max-width: ${theme.sm}) {
      top: 240px;
    }
  }
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
    iframe {
      height: 250px;
    }
  }
  @media (max-width: ${theme.sm}) {
    max-width: 100vw;
    margin: 0 5px;
    iframe {
      height: 100px;
      width: 100px;
    }
  }
`;
