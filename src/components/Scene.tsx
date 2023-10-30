import { Canvas, useFrame } from "@react-three/fiber";
import { styled } from "styled-components";
import { Model } from "../assets/Island";
import { Group, NoToneMapping } from "three";
import { useRef, useState } from "react";
import { Environment, useEnvironment } from "@react-three/drei";
import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  easeOut,
  useMotionValue,
  motion,
} from "framer-motion";

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

const ProfilePic = styled(motion.img)`
  position: absolute;
  width: 350px;
  left: 50%;
  top: calc(50% - 200px);
  z-index: 7;
`;

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export default function Scene() {
  const [ref, animate] = useAnimate();
  const { scrollY } = useScroll();
  const rotationThreshold = useMotionValue(0);
  rotationThreshold.on("change", (latest) => {
    console.log(latest)
    setPFPVisible(latest > 51.5);
  });

  const [PFPVisible, setPFPVisible] = useState(true);
  useMotionValueEvent(scrollY, "change", (latest) => {
    animate(
      ref.current,
      {
        translateX: clamp(-latest * 0.3, 0, 1000),
        rotateY: clamp(latest * 0.15, 0, 180),
        scale: clamp(latest * 0.016 + 1, 1, 7),
        transformPerspective: 200,
      },
      { ease: easeOut }
    );
  });

  return (
    <CanvasContainer>
      <ProfilePic
        src="/soy-boy.webp"
        ref={ref}
        style={{
          visibility: PFPVisible ? "hidden" : "visible",
          rotateY: rotationThreshold,
        }}
      />
      <Canvas
        camera={{ fov: 35, position: [-5, 10, 15] }}
        gl={{ antialias: true, toneMapping: NoToneMapping }}
      >
        <Container />
      </Canvas>
    </CanvasContainer>
  );
}
