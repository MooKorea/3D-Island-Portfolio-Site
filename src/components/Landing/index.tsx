import { motion } from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import Map from "../Map";
import { useEffect, useRef, useState } from "react";
import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import Name from "./Name";
import { Senti } from "../../assets/Senti";
import { easing } from "maath";

interface Landing {
  setScrollAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Landing({ setScrollAmount }: Landing) {
  const portal = useRef<PortalMaterialType>(null!);
  const [isFade, setisFade] = useState(false);
  useFrame((_state, dt) => {
    easing.damp(portal.current, "blend", isFade ? 1 : 0, 0.1, dt);
  });

  useEffect(() => {
    setTimeout(() => {
      setisFade(true);
      setScrollAmount(1);
    }, 5000);
  }, []);

  return (
    <>
      <Name svg />
      <hemisphereLight args={["#c9c9c9", "#707070", 0.5]} />
      <directionalLight position={[5, 20, 0]} intensity={1} />

      <motion.mesh
        position={[0, 0, -5]}
        initial={{ rotateY: Math.PI / 2 }}
        animate={{ rotateY: 0, scale: 10 }}
        transition={{
          delay: 3.5,
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
          <pointLight position={[-1, -1, -4.9]} intensity={1} color="#6dd1ed" />
          <pointLight position={[1, 1, -4.9]} intensity={1} color="#edbc6d" />
          <pointLight position={[0, 10, -15]} intensity={200} color="#ecd8b8" />
          <pointLight position={[2, -3, -30]} intensity={200} color="#f1e8cc" />
          <pointLight position={[-2, -10, -6]} intensity={100} color="#eb878c" />
          <Name />
          <mesh position={[0, 0, -50]} scale={20}>
            <planeGeometry args={[4, 4, 4]} />
            <meshPhysicalMaterial />
          </mesh>
          <Senti />
          <Map />
        </MeshPortalMaterial>
      </motion.mesh>
    </>
  );
}
