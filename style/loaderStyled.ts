"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const LoaderStyled = styled.iframe`
  border: none;
  margin: 2rem 0;
`;

export const DivAroundLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;
