import { Html, RoundedBox } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { useCameraContext } from "./Contexts";
import { styled } from "styled-components";
import { motion } from "framer-motion";

interface Plot {
  setFocus: React.Dispatch<React.SetStateAction<Vector3>>;
  position: Vector3;
}

const Bubble = styled(motion.div)`
  background-color: #ffffff83;
  backdrop-filter: blur(8px); 

  width: 100px;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-weight: 700;
  position: relative;
  left: -50%;
`;

export default function Plot({ setFocus, position }: Plot) {
  const { isFreeLook, isZoom, setIsZoom } = useCameraContext();
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered && !isFreeLook ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group>
      <Html
        position={new Vector3(position.x, position.y - 0.3, position.z)}
        zIndexRange={[100, 0]}
        wrapperClass="plot-bubble"
      >
        <Bubble animate={{ y: 10 }} transition={{ repeat: Infinity, repeatType:"reverse", duration: 1.5 }}>
          you suck
        </Bubble>
      </Html>
      <RoundedBox
        args={[1, 0.6, 1]}
        smoothness={4}
        radius={0.1}
        position={position}
        onClick={(e) => {
          if (isFreeLook) return;
          setFocus(e.object.position);
          setIsZoom(!isZoom);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial />
      </RoundedBox>
    </group>
  );
}
