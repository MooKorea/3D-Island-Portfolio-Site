import { Canvas, useFrame } from "@react-three/fiber";
import { styled } from "styled-components";
import { Model } from "../assets/Island";
import { Group, NoToneMapping } from "three";
import { useRef } from "react";
import { Environment, useEnvironment } from "@react-three/drei";

function Container() {
  const ref = useRef<Group>(null!);

  useFrame((state) => {
    ref.current.position.x = 0.5 + state.pointer.x * 0.2;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  const envMap = useEnvironment({ files: "src/assets/animestyled_hdr3.hdr" });

  return (
    <>
      <group ref={ref}>
        <Environment map={envMap} background />
        <ambientLight intensity={1} />
        <Model />
      </group>
    </>
  );
}

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 6;
  position: fixed;
  clip-path: url(#svgPath);
`;

export default function Scene() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ fov: 35, position: [-5, 10, 15] }}
        gl={{ antialias: true, toneMapping: NoToneMapping }}
      >
        <Container />
      </Canvas>
    </CanvasContainer>
  );
}
