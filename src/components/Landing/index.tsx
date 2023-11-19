import { motion } from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import Name from "./Name";
import { easing } from "maath";
import PlotContainer from "../ProjectsScene/PlotContainer"
import { useCameraContext } from "../Contexts";
import { Vector3 } from "three";
import { UIState } from "../Contexts";

export default function Landing() {
  const portal = useRef<PortalMaterialType>(null!);
  const [isFade, setisFade] = useState(false);
  useFrame((_state, dt) => {
    easing.damp(portal.current, "blend", isFade ? 1 : 0, 0.1, dt);
  });

  const { setDefaultLook, setCameraSpeed, setUI } = useCameraContext();

  useEffect(() => {
    setTimeout(() => {
      setisFade(true);
    }, 4500);
    setTimeout(() => {
      setDefaultLook(new Vector3(0, -10, -15))
      setCameraSpeed(0.2)
      setUI(UIState.Map)
    }, 4300);
  }, []);

  return (
    <>
      <Name />
      <hemisphereLight args={["#c9c9c9", "#707070", 0.5]} />
      <directionalLight position={[5, 20, 0]} intensity={1} />

      <motion.mesh
        position={[0, 0, -5]}
        initial={{ rotateY: Math.PI / 2 }}
        animate={{ rotateY: 0, scale: 10 }}
        transition={{
          delay: 3,
          duration: 3,
          ease: [0.6, 0, 0.4, 1],
          rotateY: {
            duration: 2,
            ease: [0.6, 0, 0.4, 1],
          },
        }}
      >
        <planeGeometry />
        <MeshPortalMaterial worldUnits ref={portal}>
          <PlotContainer />
        </MeshPortalMaterial>
      </motion.mesh>
    </>
  );
}
