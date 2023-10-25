import { Canvas, useFrame } from "@react-three/fiber";
import { NavHeight } from "./Navbar";
import { styled } from "styled-components";
import { Model } from "./Island";
import { Group, Vector3, NoToneMapping } from "three";
import { useRef } from "react";
import { Sky } from "@react-three/drei";

function Container() {
  const ref = useRef<Group>(null!);

  useFrame((state) => {
    ref.current.position.x = state.pointer.x * 0.2;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <group ref={ref}>
      <ambientLight intensity={1}/>
      <Model />
    </group>
  );
}

const CanvasContainer = styled.div`
  width: 100vw;
  height: calc(100vh - ${NavHeight});
`;

export default function Scene() {
  return (
    <CanvasContainer>
      <Canvas camera={{ fov: 35, position: [-5, 10, 15] }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
        <Container />
        <Sky sunPosition={new Vector3(5, 0.4, 1)} />
      </Canvas>
    </CanvasContainer>
  );
}
