"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ListOfDealsSectionStyled = styled.section`
  /* max-width: 1500px; */
  width: 100%;
  border: 1px solid ${theme.colors.red};
  border-radius: 12px;
  box-shadow: 0px 0px 12px 1px ${theme.colors.red};
  color: #f7f7ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 5%;
  @media (max-width: ${theme.sm}) {
    border: none;
    box-shadow: none;
    padding: 0;
    max-width: 100vw;
  }
  .addGamesInfo {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    h3,
    h4 {
      width: 100%;
      text-align: center;
      font-family: var(--orienta);
      color: ${theme.colors.blue};
    }
    h3 {
      font-size: 22px;
    }
    h4 {
      margin-top: 0;
    }
    @media (max-width: ${theme.sm}) {
      h3 {
        font-size: 15px;
      }
      h4 {
        font-size: 12px;
      }
    }
  }
`;

export const ListOfDealsTableStyled = styled.table`
  font-family: var(--prompt);
  font-size: 16px;
  margin: 2rem 0;
  // borders need to collapse
  border-collapse: separate;
  // space between rows
  border-spacing: 0 1rem;
  td {
    border: 1px solid ${theme.colors.red};
    max-width: 350px;
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
        color: ${theme.colors.red};
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
  // it fixes wrong placement caused by next/image
  img {
    margin-top: 10px;
  }
  // for normal img add margins to center and make row the same height as high img
  .normalImg {
    margin: 20px 0 10px 0;
    @media (max-width: ${theme.sm}) {
      height: 22px;
      width: 60px;
    }
    @media (max-width: 315px) {
      height: 11px;
      width: 30px;
    }
  }
  .higherImg {
    height: 70px;
    // aspect ratio 16:23
    width: ${(70 / 23) * 16}px;
    @media (max-width: ${theme.sm}) {
      height: 35px;
      width: ${(35 / 23) * 16}px;
    }
    @media (max-width: 320px) {
      height: 17px;
      width: ${(17 / 23) * 16}px;
    }
  }
  //for prices >90 savings blue color
  .lowPrice {
    color: ${theme.colors.blue};
  }
  @media (max-width: ${theme.md}) {
    font-size: 14px;
  }
  @media (max-width: ${theme.sm}) {
    font-size: 10px;
    max-width: 100%;
    margin: 0;
    // cell with store logo
    td:nth-of-type(1) {
      img {
        height: 24px;
        width: 24px;
      }
    }
    // hide cell on small screen
    .hideOnSm {
      display: none;
    }
  }
  @media (max-width: 295px) {
    font-size: 8px;
    td:nth-of-type(1) {
      img {
        height: 10px;
        width: 10px;
      }
    }
  }
`;
