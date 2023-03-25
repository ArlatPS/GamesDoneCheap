"use client";
import styled from "styled-components";
import { theme } from "@/theme";

export const NavStyled = styled.nav`
  position: sticky;
  z-index: 1;
  top: 0;
  font-family: var(--orienta);
  background-color: ${theme.colors.red};
  box-shadow: 0px 0px 10px 2px ${theme.colors.red};
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  // for small elements should span full width
  @media (max-width: ${theme.sm}) {
    flex-wrap: wrap;
    padding: 0.25rem 0;
    position: static;
  }
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
      text-decoration: none;
    }
    @media (min-width: ${theme.xxl}) {
      margin-left: 20%;
    }
    @media (max-width: ${theme.md}) {
      margin-left: 5%;
      font-size: 14px;
    }
    @media (max-width: ${theme.sm}) {
      margin-left: 0;
      font-size: 12px;
      flex-wrap: wrap;
      order: 1;
      width: 100%;
      a {
        margin-right: 0;
        font-size: 14px;
        padding: 0.5rem 0;
        width: 100%;
        display: block;
        text-align: center;
        border-top: 2px solid ${theme.colors.night};
      }
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
    @media (max-width: ${theme.md}) {
      font-size: 18px;
    }
    @media (max-width: ${theme.sm}) {
      order: 0;
      margin: 0 auto;
      font-size: 16px;
      padding: 0.5rem 0;
      svg {
        height: 32px;
      }
    }
  }

  form {
    margin-right: 10%;
    position: relative;
    label {
      margin-right: 0.5em;
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
        a {
          color: ${theme.colors.white};
        }
      }
      @media (max-width: ${theme.sm}) {
        right: -45px;
        left: 50px;
      }
    }
    @media (min-width: ${theme.xxl}) {
      margin-right: 20%;
    }
    @media (max-width: ${theme.md}) {
      margin-right: 5%;
      font-size: 14px;
      #search {
        width: 130px;
      }
    }
    @media (max-width: ${theme.sm}) {
      order: 2;
      margin: 0 auto;
      padding: 0.5rem 0;
    }
  }
`;

export const DropdownSectionWithDivs = styled.section`
  // dropdown stores
  display: flex;
  position: relative;
  padding: 1rem 0.25rem;
  // Stores
  span:hover {
    cursor: pointer;
  }
  // animation for dropdown
  @keyframes animate-dropdown {
    0% {
      transform: rotateX(-90deg);
      transform: scale(0);
    }
    70% {
      transform: rotateX(20deg);
      transform: scale(1.2);
    }
    100% {
      transform: rotateX(0deg);
      transform: scale(1);
    }
  }
  @media (max-width: ${theme.sm}) {
    width: 100%;
    padding: 0.5rem 0;
    border-top: 2px solid ${theme.colors.night};
    border-bottom: 2px solid ${theme.colors.night};

    span {
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
  // dropdown div
  .divAround {
    transform-origin: top center;
    animation: animate-dropdown 300ms ease-in forwards;
    flex-wrap: wrap;
    position: absolute;
    right: -30px;
    top: 45px;
    background-color: ${theme.colors.red};
    font-size: 16px;
    width: 7em;
    border-radius: 10px;
    div {
      padding: 0.5em 0.25em;
      a {
        font-family: var(--prompt);
        margin: 0;
      }
    }
    @media (max-width: ${theme.md}) {
      font-size: 14px;
    }
    @media (max-width: ${theme.sm}) {
      right: 38vw;
      top: 40px;
      z-index: 1;
      div {
        a {
          border: none;
        }
      }
    }
  }
`;
