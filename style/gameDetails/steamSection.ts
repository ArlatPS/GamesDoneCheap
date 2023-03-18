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
    div {
      font-family: var(--orienta);
      text-align: center;
      a {
        font-family: var(--prompt);
        color: ${theme.colors.blue};
        font-size: 20px;
      }
    }
  }
`;
