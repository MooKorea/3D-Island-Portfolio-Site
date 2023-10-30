import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Scene from "./components/Scene";
import { createGlobalStyle } from "styled-components";

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

  #root {
    height: 3000px;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Scene />
      <Landing />
    </>
  );
}
