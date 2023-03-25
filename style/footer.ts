"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const FooterStyled = styled.footer`
  font-family: var(--prompt);
  margin-top: 2rem;
  width: 100%;
  background-color: ${theme.colors.red};
  box-shadow: 0px 0px 10px 2px ${theme.colors.red};
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 24px;
    padding: 0.2em;
  }
  @media (max-width: ${theme.md}) {
    h3 {
      font-size: 20px;
    }
  }
  @media (max-width: ${theme.sm}) {
    h3 {
      font-size: 16px;
    }
  }
`;
