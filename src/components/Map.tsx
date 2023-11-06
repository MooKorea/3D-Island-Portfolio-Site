import { Group, PlaneGeometry, Vector3 } from "three";
import { Model } from "../assets/Island";
import {
  Environment,
  useEnvironment,
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  PortalMaterialType,
} from "@react-three/drei";
import Plot from "./Scene/Plot";
import { useCameraContext, UIState } from "./Scene/Contexts";
import { easeInOut, useAnimation } from "framer-motion";
import { motion } from "framer-motion-3d";
import usePointerHover from "../hooks/usePointerHover";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function Map() {
  const { onPointerOver, onPointerOut } = usePointerHover();
  const { isFreeLook, setDefaultLook, UI, setUI, setCameraSpeed } = useCameraContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isFade, setIsFade] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    setCameraSpeed(0.5);
    controls.start({
      scale: isOpen ? 4 : 1,
      rotateY: isOpen ? Math.PI : 0,
      transition: {
        delay: isOpen ? 0 : 0.5,
        duration: 1,
        ease: easeInOut,
      },
    });

    setTimeout(
      () => {
        setDefaultLook(isOpen ? new Vector3(0, -10, -15) : new Vector3(0, 0, -5));
      },
      isOpen ? 800 : 0
    );
    setTimeout(() => {
      setIsFade(isOpen);
    }, 600);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(UI === UIState.Map);
  }, [UI]);

  //temporary plane
  const planeGeometry = new PlaneGeometry(2, 2);
  planeGeometry.rotateY(Math.PI);
  const texture = useTexture("/soy-boy.webp");

  const portal = useRef<PortalMaterialType>(null!);
  useFrame((_state, dt) => easing.damp(portal.current, "blend", isFade ? 1 : 0, 0.1, dt));

  return (
    <>
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
        initial={{ z: -5 }}
      >
        <planeGeometry args={[2, 2, 2]} />
        <meshBasicMaterial map={texture} />
      </motion.mesh>
      <motion.mesh animate={controls} initial={{ z: -5 }} geometry={planeGeometry}>
        <MeshPortalMaterial ref={portal} worldUnits={true}>
          <PlotGroup isFreeLook={isFreeLook} />
        </MeshPortalMaterial>
        {isFreeLook && <OrbitControls target={[0, -10, -15]} maxPolarAngle={1.5} />}
      </motion.mesh>
    </>
  );
}

const plotPositions = [
  new Vector3(-4.5, 1.9, -2.5),
  new Vector3(-2, 1.9, 2.5),
  new Vector3(1.5, 1.9, -0.5),
  new Vector3(2.2, 1, 2.6),
];

function PlotGroup({ isFreeLook }: { isFreeLook: boolean }) {
  const envMap = useEnvironment({ files: "/animestyled_hdr3.hdr" });
  const ref = useRef<Group>(null!);
  const { isZoom } = useCameraContext();

  useFrame((state) => {
    if (isFreeLook) return;
    const multiplier:number = isZoom ? 0.03 : 0.1;
    ref.current.rotation.x = state.pointer.y * multiplier;
    ref.current.rotation.y = state.pointer.x * -multiplier;
  });

  return (
    <group position={[0, -10, -15]} ref={ref}>
      <Environment map={envMap} background="only" />
      <hemisphereLight args={["#c9c9c9", "#707070", 1]} />
      <directionalLight position={[5, 20, 0]} intensity={1} />
      <Model />
      {plotPositions.map((e, i) => {
        return <Plot position={e} key={i} index={i} amount={plotPositions.length} />;
      })}
    </group>
  );
}
