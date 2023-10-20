import { Canvas } from "@react-three/fiber";
import { NavHeight } from "./Navbar";
import { styled } from "styled-components";
import { CameraControls } from "@react-three/drei";

const CanvasContainer = styled.div`
  width: 100vw;
  height: calc(100vh - ${NavHeight});
`;

export default function Scene() {
  return (
    <CanvasContainer>
      <Canvas>
        <CameraControls />
        <rectAreaLight
          width={2}
          height={2}
          intensity={50}
          position={[1, 4, -2]}
          rotation={[0, 180, 0]}
          castShadow
        />
        <mesh rotation={[2, 2, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
      </Canvas>
    </CanvasContainer>
  );
}
