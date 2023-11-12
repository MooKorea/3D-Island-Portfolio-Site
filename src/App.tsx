import Scene from "./components";
import { createGlobalStyle } from "styled-components";
import "./style.css";
import { styled } from "styled-components";
import Geomatic from "./assets/Geomatic-Black.otf";
import UI from "./components/UI";
import { CameraContextProvider } from "./components/Contexts";

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

  @font-face {
    font-family: 'Geomatic';
    src: url(${Geomatic});
    font-style: normal;
    font-weight: 800;
  }
`;

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

export default function App() {
  return (
    <CameraContextProvider>
      <CanvasContainer>
        <GlobalStyle />
        <Scene />
      </CanvasContainer>
      <UI />
    </CameraContextProvider>
  );
}
