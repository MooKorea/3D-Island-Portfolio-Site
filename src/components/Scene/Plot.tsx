import { RoundedBox } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";
import { useCameraContext } from "./Contexts";
import PlotBubble from "./MapUI/PlotBubble";

interface Plot {
  setFocus: React.Dispatch<React.SetStateAction<Vector3>>;
  position: Vector3;
}

export default function Plot({ setFocus, position }: Plot) {
  const { isFreeLook, isZoom, setIsZoom } = useCameraContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group>
      <PlotBubble position={position} isHovered={isHovered}/>
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
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshPhysicalMaterial />
      </RoundedBox>
    </group>
  );
}
