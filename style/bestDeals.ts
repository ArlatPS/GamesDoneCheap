"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const BestDealsSectionStyled = styled.section`
  /* max-width: 1500px; */
  width: 100%;
  border: 1px solid ${theme.colors.red};
  border-radius: 12px;
  box-shadow: 0px 0px 12px 1px ${theme.colors.red};
  color: #f7f7ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DealTableStyled = styled.table`
  font-family: var(--prompt);
  font-size: 16px;
  margin: 2rem 0;
  // borders need to collapse
  border-collapse: separate;
  // space between rows
  border-spacing: 0 1rem;
  td {
    border: 1px dotted ${theme.colors.red};
  }
  // left border of row with radius
  td:nth-of-type(1) {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
  // right border of row with radius
  td:nth-of-type(7) {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  // td styling
  th,
  td {
    padding: 0.5em;
    text-align: center;
    a {
      color: ${theme.colors.white};
      /* font-size: 16px; */
      transition: 250ms ease-in;
      &:hover {
        color: ${theme.colors.blue};
      }
    }
  }
  // hovering row
  tr {
    transition: 250ms ease-in;
    &:hover {
      background: ${theme.colors.grey};
    }
    // first row with headers doesn't turn grey
    &:nth-of-type(1):hover {
      background: ${theme.colors.night};
    }
  }
`;
