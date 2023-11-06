import { RoundedBox } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { Mesh, Vector3 } from "three";
import { useCameraContext } from "../Contexts";
import PlotBubble from "./MapUI/PlotBubble";
import Select from "../../assets/sounds/Select.ogg";
import { ThreeEvent } from "@react-three/fiber";

interface Plot {
  position: Vector3;
  index: number;
  amount: number;
}

export default function Plot({ position, index, amount }: Plot) {
  const {
    isFreeLook,
    isZoom,
    setIsZoom,
    setCurrentPos,
    setFocus,
    plotWorldPositions,
    setPlotWorldPositions,
    setCameraSpeed
  } = useCameraContext();
  const [isHovered, setIsHovered] = useState(false);
  const audio = new Audio(Select);

  const handleFocus = (e: ThreeEvent<MouseEvent>) => {
    const pos: Vector3 = new Vector3();
    e.object.getWorldPosition(pos);
    setFocus(pos);
  };

  const ref = useRef<Mesh>(null!);
  useEffect(() => {
    if (plotWorldPositions.length >= amount) return;
    const pos: Vector3 = new Vector3();
    ref.current.getWorldPosition(pos);
    setPlotWorldPositions((prev) => {
      return [...prev, pos];
    });
  }, []);

  return (
    <group>
      <PlotBubble position={position} isHovered={isHovered} />
      <RoundedBox
        args={[1, 0.6, 1]}
        smoothness={4}
        radius={0.1}
        position={position}
        onClick={(e) => {
          if (isFreeLook) return;
          handleFocus(e);
          setCurrentPos(index);
          setIsZoom(!isZoom);
          setCameraSpeed(1)
          audio.play();
        }}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        ref={ref}
      >
        <meshPhysicalMaterial />
      </RoundedBox>
    </group>
  );
}
