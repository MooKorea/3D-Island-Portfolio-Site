import { RoundedBox } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";
import { useCameraContext } from "./Contexts";
import PlotBubble from "./MapUI/PlotBubble";
import Select from "../../assets/sounds/Select.ogg";

interface Plot {
  position: Vector3;
  index: number;
}

export default function Plot({ position, index }: Plot) {
  const { isFreeLook, isZoom, setIsZoom, setCurrentPos, setFocus } = useCameraContext();
  const [isHovered, setIsHovered] = useState(false);
  const audio = new Audio(Select)

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
          setCurrentPos(index)
          setIsZoom(!isZoom);
          audio.play()
        }}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshPhysicalMaterial />
      </RoundedBox>
    </group>
  );
}
