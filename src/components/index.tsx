import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import Map from "./Map";
import MapUI from "./ProjectsScene/MapUI";
import { CameraContextProvider } from "./Contexts";
import Camera from "./ProjectsScene/Camera";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export default function Scene() {
  return (
    <CameraContextProvider>
      <Canvas camera={{ fov: 35 }} gl={{ antialias: true, toneMapping: NoToneMapping }}>
        <Suspense fallback={null}>
          <Map />
          <Camera />
        </Suspense>
      </Canvas>
      <Loader />
      <MapUI />
    </CameraContextProvider>
  );
}
