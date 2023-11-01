import { styled } from "styled-components";
import BottomButtons from "./BottomButtons";
import Sidebar from "./Sidebar";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  pointer-events: none;
  top: 0;
  z-index: 2;
`;

export default function MapUI() {
  return (
    <Container>
      <Sidebar />
      <BottomButtons />
    </Container>
  );
}
