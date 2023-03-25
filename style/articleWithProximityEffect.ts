"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ArticleWithProximityEffect = styled("article")<{
  widthOfEffect: number;
}>`
  /* border: 1px solid ${theme.colors.red}; */
  border-radius: 15px;
  box-shadow: 0px 0px ${(props) => props.widthOfEffect}px 1px
    ${theme.colors.red};
  color: #f7f7ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: ${100 / 3}%;
  margin-bottom: 2rem;
  margin-left: 2.5%;
  margin-right: 2.5%;
  background-color: ${theme.colors.night};

  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${theme.sm}) {
    width: 50%;
    min-width: 180px;
  }
`;
