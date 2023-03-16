"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const MainAllDealsStyled = styled.main`
  h1 {
    margin-left: 10%;
    font-family: var(--orienta);
    font-size: 36px;
    margin-top: 2rem;
  }
`;

export const SearchControlsStyled = styled.section`
  margin-left: 10%;
  font-family: var(--prompt);
  position: relative;
  h3 {
    font-size: 24px;
    width: 10%;
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
  width: 50%;
  background-color: ${theme.colors.night};
`;
