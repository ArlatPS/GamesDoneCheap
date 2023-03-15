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
  }
`;

export const H1WithHoverEffect = styled.h1`
  font-family: var(--space-mono);
  font-size: 52px;
  /* width: 30%; */
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
`;
