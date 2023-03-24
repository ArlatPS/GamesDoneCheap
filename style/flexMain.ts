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
  }
`;

export const H1WithHoverEffect = styled.h1`
  font-family: var(--space-mono);
  font-size: 52px;
  height: 1em;
  @media (max-width: ${theme.md}) {
    font-size: 40px;
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
    fill: white;
    height: 30vh;
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
`;
