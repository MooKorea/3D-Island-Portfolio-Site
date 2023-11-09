import { Vector3 } from "three";
import {
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  PortalMaterialType,
} from "@react-three/drei";
import { useCameraContext, UIState } from "./Contexts";
import { AnimationControls, easeInOut, useAnimation } from "framer-motion";
import { motion } from "framer-motion-3d";
import usePointerHover from "../hooks/usePointerHover";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import PlotContainer from "./ProjectsScene/PlotContainer";
import { usePanels } from "../assets/Panels";

export default function Map() {
  const { onPointerOver, onPointerOut } = usePointerHover();
  const { isFreeLook, setDefaultLook, UI, setUI, setCameraSpeed } = useCameraContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isFade, setIsFade] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    setCameraSpeed(isOpen ? 0.2 : 0.5);
    controls.start({
      scale: isOpen ? 5 : 1,
      z: isOpen ? 5 : 0,
      rotateY: isOpen ? Math.PI : 0,
      transition: {
        delay: isOpen ? 0 : 0.5,
        duration: 1.5,
        ease: easeInOut,
        rotateY: {
          duration: 1.5,
          ease: isOpen ? [0, 0.5, 0.13, 1] : [0.63, 0, 0.7, 1],
        },
        z: {
          duration: 1.5,
          ease: isOpen ? [0, 0.4, 0.4, 1] : [0.4, 0, 0.8, 1],
        },
      },
    });

    setTimeout(
      () => {
        setDefaultLook(isOpen ? new Vector3(0, -10, -15) : new Vector3(0, 0, -5));
      },
      isOpen ? 300 : 0
    );
    setTimeout(() => {
      setIsFade(isOpen);
    }, 600);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(UI === UIState.Map);
  }, [UI]);

  const texture = useTexture("/soy-boy.webp");
  const { nodes } = usePanels();
  return (
    <group position={[0, 0, -6]}>
      <mesh geometry={nodes.Models.geometry} position={[-2.541, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <mesh geometry={nodes.Models_Reverse.geometry} position={[-2.541, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <PanelBackSide
        isFreeLook={isFreeLook}
        isFade={isFade}
        controls={controls}
        nodes={nodes}
      />
      <motion.mesh
        animate={controls}
        onClick={() => setUI(UIState.Map)}
        onPointerEnter={() => {
          if (isOpen) return;
          onPointerOver();
        }}
        onPointerLeave={() => {
          if (isOpen) return;
          onPointerOut();
        }}
        geometry={nodes.Projects.geometry}
      >
        <meshBasicMaterial map={texture} />
      </motion.mesh>
      <mesh geometry={nodes.Skills.geometry} position={[2.538, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <mesh geometry={nodes.Skills_Reverse.geometry} position={[2.538, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
    </group>
  );
}

interface PanelBackSide {
  isFreeLook: boolean;
  isFade: boolean;
  controls: AnimationControls;
  nodes: any;
}

function PanelBackSide({ isFreeLook, isFade, controls, nodes }: PanelBackSide) {
  const portal = useRef<PortalMaterialType>(null!);
  useFrame((_state, dt) => easing.damp(portal.current, "blend", isFade ? 1 : 0, 0.1, dt));
  return (
    <motion.mesh
      animate={controls}
      initial={{ z: -5 }}
      geometry={nodes.Projects_Reverse.geometry}
    >
      <MeshPortalMaterial ref={portal} worldUnits={true}>
        <PlotContainer isFreeLook={isFreeLook} />
      </MeshPortalMaterial>
      {isFreeLook && <OrbitControls target={[0, -10, -15]} maxPolarAngle={1.5} />}
    </motion.mesh>
  );
}
