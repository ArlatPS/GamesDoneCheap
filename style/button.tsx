"use client";
import { theme } from "@/theme";
import styled from "styled-components";

export const ButtonStyled = styled.button`
  font-family: var(--prompt);
  font-size: 20px;
  border: 1px solid ${theme.colors.red};
  box-shadow: 0px 0px 12px 1px ${theme.colors.red};
  border-radius: 12px;
  padding: 0.1em 0.4em;
  transition: 250ms ease-in;
  background-color: ${theme.colors.night};
  color: ${theme.colors.white};
  &:hover {
    background-color: ${theme.colors.red};
    cursor: pointer;
  }
`;
