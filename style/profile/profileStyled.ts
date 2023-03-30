"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const ProfileMainStyled = styled.main`
  min-height: 90vh;
  margin: 0 10%;
  display: flex;
  @media (min-width: ${theme.xxl}) {
    margin: 0 20%;
  }
  @media (max-width: ${theme.md}) {
    margin: 0 5%;
  }
  @media (max-width: ${theme.sm}) {
    margin: 0 5px;
  }
  .signedInSection {
    .userGames {
      padding: 2rem;
      table {
        margin-top: 0rem;
        td:nth-of-type(5) {
          border-top-right-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }
      }
      div {
        margin-top: 1rem;
      }
      #deleteButton {
        font-size: 16px;
        @media (max-width: ${theme.md}) {
          font-size: 14px;
        }
        @media (max-width: ${theme.sm}) {
          font-size: 12px;
        }
      }
    }
    @media (min-width: 1500px) {
      display: flex;
      .userGames {
        order: -1;
        width: 50%;
      }
      .userProfile {
        width: 50%;
      }
    }
  }
`;
