import { Text, useScroll } from "@react-three/drei";
import Geomatic from "../../assets/Geomatic-Black.otf";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { data } from "../../assets/dissolveShader";
//@ts-ignore
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";

interface Label {
  label: string;
  xOffset: number;
}

export default function Label({ label, xOffset }: Label) {
  const ref = useRef<Mesh>(null!)
  const scroll = useScroll()
  const material = useRef<any>(null!);

  useFrame(() => {
    const r2 = scroll.range(0, 1);
    ref.current.position.y = -5.8 + r2 * 3

    if (material.current === null) return;
    material.current.uniforms.Dissolve_Factor.value = 1 - r2;
  })
  return (
    <>
      <mesh position={[0, 0, -13]} scale={20}>
        <planeGeometry args={[4, 4, 4]} />
        <meshBasicMaterial color={"#747474"} opacity={0.6} transparent />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        font={Geomatic}
        position={[xOffset, -2.8, -12]}
        ref={ref}
      >
        {label}
        <NodeToyMaterial data={data} ref={material} />
      </Text>
    </>
  );
}
