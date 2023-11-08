import Scene from "./components";
import { createGlobalStyle } from "styled-components";
import "./style.css";
import { styled } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body,
  html {
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    font-family: 'Nunito', sans-serif;
  }
`;

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 6;
  position: fixed;
`;

export default function App() {
  return (
    <CanvasContainer>
      <GlobalStyle />
      <Scene />
    </CanvasContainer>
  );
}
