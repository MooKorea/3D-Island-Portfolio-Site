import PictureTransition from "./PictureTransition";
import { styled } from "styled-components";

const Container = styled.header`
  width: 100vw;
  padding-inline: 20vw;
  height: 100vh;
  background-color: #1c1b22;
  display: flex;
  justify-content: space-around;
  gap: 4em;
  align-items: center;
  color: #ffffff;
  position: fixed;
  z-index: 5;
`;

const Header = styled.h1`
  font-weight: 900;
  width: 100%;
`;



export default function Landing() {

  return (
    <Container>
      <Header>Andy {"->"}</Header>
      <PictureTransition />
    </Container>
  );
}
