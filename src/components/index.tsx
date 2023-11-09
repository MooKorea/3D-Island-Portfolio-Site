import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Group, NoToneMapping } from "three";
import Map from "./Map";
import UI from "./UI";
import { CameraContextProvider } from "./Contexts";
import Camera from "./ProjectsScene/Camera";
import { Suspense, useRef } from "react";
import { Loader, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Scene() {
  return (
    <CameraContextProvider>
      <Canvas camera={{ fov: 35 }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
        <Suspense fallback={null}>
          <ScrollControls pages={2}>
            <ScrollContainer />
          </ScrollControls>
          <Camera />
        </Suspense>
      </Canvas>
      <Loader />
      <UI />
    </CameraContextProvider>
  );
}

function ScrollContainer() {
  const ref = useRef<Group>(null!);
  const data = useScroll();
  const { height } = useThree((state) => state.viewport)
  useFrame(() => {
    const r2 = data.range(1/2, 1);
    ref.current.position.y = -3 + r2;
    console.log(height)
  });

  return (
    <>
      <Scroll>
        <group ref={ref}>
          <Map />
        </group>
      </Scroll>
      <Scroll html>
        <h1>Andrew Cao</h1>
      </Scroll>
    </>
  );
}
