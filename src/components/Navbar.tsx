import { styled } from "styled-components";

const NavContainer = styled.div`
  width: 100vw;
  background-color: #000000;
  color: #d1d1d1;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
`;

export const NavHeight = "4em"

const NavButton = styled.div`
  height: ${NavHeight};
  padding-inline: 1em;
  display: flex;
  align-items: center;
  transition: 0.2s;
  &:hover {
    background-color: #858585;
    cursor: pointer;
    color: black;
  }
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavButton>Button</NavButton>
      <NavButton>Button</NavButton>
      <NavButton>Button</NavButton>
    </NavContainer>
  );
}
