"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const NavStyled = styled.nav`
  position: sticky;
  top: 0;
  font-family: var(--orienta);
  background-color: ${theme.colors.red};
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  .arrow {
    height: 10px;
  }
  .logo {
    height: 50px;
  }
  // left section
  section:nth-of-type(1) {
    display: flex;
    margin-left: 10%;
    a {
      margin-right: 1em;
      padding: 1rem 0.25rem;
      color: ${theme.colors.night};
    }
    // dropdown stores
    div {
      position: relative;
      padding: 1rem 0.25rem;
      // Stores
      span {
        color: ${theme.colors.night};
      }
      // dropdown div
      section {
        flex-wrap: wrap;
        position: absolute;
        right: 0px;
        top: 40px;
        background-color: ${theme.colors.red};
      }
    }
  }

  // middle section with logo
  .divWithLogo {
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.5rem;
    }
    font-family: var(--space-mono);
    font-size: 20px;
    color: ${theme.colors.white};
  }

  form {
    margin-right: 10%;
    label {
      margin-right: 1rem;
    }
  }
`;
