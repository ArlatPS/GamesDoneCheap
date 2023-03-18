"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const NavStyled = styled.nav`
  position: sticky;
  top: 0;
  font-family: var(--orienta);
  background-color: ${theme.colors.red};
  box-shadow: 0px 0px 10px 2px ${theme.colors.red};
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  .arrow {
    height: 10px;
    fill: ${theme.colors.white};
  }
  .logo {
    height: 50px;
  }

  // left section
  .leftSection {
    display: flex;
    margin-left: 10%;
    a {
      margin-right: 1em;
      padding: 1rem 0.25rem;
      color: ${theme.colors.white};
    }
  }

  // middle section with logo
  .divWithLogo {
    display: flex;
    align-items: center;
    svg {
      margin: 0 0.5rem;
      fill: ${theme.colors.white};
    }
    font-family: var(--space-mono);
    font-size: 20px;
    color: ${theme.colors.white};
  }

  form {
    margin-right: 10%;
    position: relative;
    label {
      margin-right: 0.5rem;
    }
    section {
      position: absolute;
      background-color: ${theme.colors.red};
      display: flex;
      flex-wrap: wrap;
      left: 40px;
      right: -40px;
      top: 30px;
      div {
        width: 100%;
        padding: 0.5em 0.25em;
        border-bottom: 1px solid ${theme.colors.night};
      }
    }
  }
`;

export const DropdownSectionWithDivs = styled.section`
  // dropdown stores
  display: flex;
  position: relative;
  padding: 1rem 0.25rem;
  // Stores
  span {
  }
  // dropdown div
  .divAround {
    flex-wrap: wrap;
    position: absolute;
    right: 0px;
    top: 40px;
    background-color: ${theme.colors.red};
    width: 120px;
    div {
      a {
        font-family: var(--prompt);
        font-size: 16px;
        padding: 0.5em;
        margin: 0;
      }
    }
  }
`;
