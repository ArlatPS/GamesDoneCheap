"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const BestDealsSectionStyled = styled.section`
  margin: 10%;
  border: 1px solid ${theme.colors.red};
  border-radius: 12px;
  box-shadow: 0px 0px 12px 1px ${theme.colors.red};
  color: #f7f7ff;
  h2 {
    margin-left: 5%;
    font-family: var(--orienta);
    font-size: 28px;
  }
`;

export const DealTableStyled = styled.table`
  font-family: var(--prompt);
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  /* justify-content: space-evenly; */
  justify-content: space-between;
  tbody {
    tr {
      td {
        padding: 0.5rem;
      }
    }
  }
`;
