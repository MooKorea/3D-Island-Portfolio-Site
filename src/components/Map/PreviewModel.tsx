import { useRef } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

interface PreviewModel {
  children: React.ReactNode;
  position: number[];
  scrollMultiplier?: number;
}

export default function PreviewModel({ children, position, scrollMultiplier = 1 }: PreviewModel) {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();
  useFrame((state) => {
    const r2 = scroll.range(0, 1);
    ref.current.position.y = position[1] + r2 * scrollMultiplier;

    const multiplier = 0.07;
    ref.current.rotation.x = state.pointer.y * multiplier;
    ref.current.rotation.y = state.pointer.x * -multiplier;
  });
  return (
    <group position={new Vector3(position[0], position[1], position[2])} ref={ref}>
      {children}
    </group>
  );
}
