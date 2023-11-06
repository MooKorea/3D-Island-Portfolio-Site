import { Canvas } from "@react-three/fiber";
import { styled } from "styled-components";
import { NoToneMapping } from "three";
import Map from "./Map";
import MapUI from "./ProjectsScene/MapUI";
import { CameraContextProvider } from "./Contexts";
import Camera from "./ProjectsScene/Camera";

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 6;
  position: fixed;
`;

export default function Scene() {
  return (
    <CanvasContainer>
      <CameraContextProvider>
        <Canvas camera={{ fov: 35 }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
          <Map />
          <Camera />
        </Canvas>
        <MapUI />
      </CameraContextProvider>
    </CanvasContainer>
  );
}
