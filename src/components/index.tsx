import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Camera from "./ProjectsScene/Camera";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import Landing from "./Landing";

export default function Scene() {
  return (
    <>
      <Canvas camera={{ fov: 35 }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
        <Suspense fallback={null}>
          <Landing />
          <Camera />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
