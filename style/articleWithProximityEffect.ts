"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ArticleWithProximityEffect = styled.article.attrs(
  (props: { widthOfEffect: number }) => ({
    style: {
      boxShadow: `0px 0px ${props.widthOfEffect}px 1px ${theme.colors.red}`,
    },
  })
)`
  border-radius: 15px;
  color: #f7f7ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: ${80 / 3}%;
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
