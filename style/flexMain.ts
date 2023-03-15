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
