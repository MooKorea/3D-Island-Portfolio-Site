import { RoundedBox } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Vector3 } from "three";

interface Plot {
  setFocus: React.Dispatch<React.SetStateAction<Vector3>>;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
  zoom: Boolean
  position: Vector3
}

export default function Plot({ setFocus, setZoom, zoom, position }: Plot) {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <RoundedBox
      args={[1, 0.6, 1]}
      smoothness={4}
      radius={0.1}
      position={position}
      onClick={(e) => {
        setFocus(e.object.position);
        setZoom(!zoom);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhysicalMaterial />
    </RoundedBox>
  );
}
