import { styled } from "styled-components";
import Simian_Segue from "../assets/music/Simian_Segue.mp3";
import { useEffect } from "react";

const NavContainer = styled.div`
  width: 100vw;
  background-color: #000000;
  color: #d1d1d1;
  display: flex;
  font-weight: 700;
  position: fixed;
  top: 0;
  z-index: 10;
`;

export const NavHeight = "4em";

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
  const audio = new Audio(Simian_Segue)

  return (
    <NavContainer>
      <NavButton>Button</NavButton>
      <NavButton onClick={() => audio.play()}>Play</NavButton>
      <NavButton onClick={() => audio.pause()}>Pause</NavButton>
    </NavContainer>
  );
}
