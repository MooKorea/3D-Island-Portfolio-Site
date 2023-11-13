import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Camera from "./ProjectsScene/Camera";
import { Suspense, useState } from "react";
import { Loader, ScrollControls } from "@react-three/drei";
import Landing from "./Landing";

export default function Scene() {
  const [scrollAmount, setScrollAmount] = useState(0);
  return (
    <>
      <Canvas camera={{ fov: 35 }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
        <Suspense fallback={null}>
          <ScrollControls pages={scrollAmount}>
            <Landing setScrollAmount={setScrollAmount} />
          </ScrollControls>
          <Camera />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
