import Navbar from "./components/Navbar";
import Scene from "./components";
import { createGlobalStyle } from "styled-components";
import "./style.css";

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

export default function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Navbar /> */}
      <Scene />
    </>
  );
}
