import usePointerHover from "../../hooks/usePointerHover";
import { OrbitControls, MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import PlotContainer from "../ProjectsScene/PlotContainer";
import { Vector3 } from "three";
import React, { useEffect, useRef, useState } from "react";
import { AnimationControls, easeInOut, useAnimation } from "framer-motion";
import { UIState } from "../Contexts";
import { useCameraContext } from "../Contexts";
import { motion } from "framer-motion-3d";
import { usePanels } from "../../assets/Panels";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function Projects({ children }: { children: React.ReactNode }) {
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

  const { nodes } = usePanels();

  return (
    <>
      <PanelBackSide
        isFreeLook={isFreeLook}
        isFade={isFade}
        controls={controls}
        nodes={nodes}
      />
      <motion.mesh
        animate={controls}
        onClick={() => {
          setUI(UIState.Map);
          onPointerOut();
        }}
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
        <MeshPortalMaterial worldUnits={true}>{children}</MeshPortalMaterial>
      </motion.mesh>
    </>
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
