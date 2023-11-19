import { Text } from "@react-three/drei";
import { useRef } from "react";
import Geomatic from "../../assets/Geomatic-Black.otf";
//@ts-ignore
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";
import { data } from "../../assets/dissolveShader";
import { useFrame } from "@react-three/fiber";

export default function Name() {

  const material = useRef<any>(null!);

  useFrame((_state, dt) => {
    if (material.current.uniforms.Dissolve_Factor.value === 0) return
    material.current.uniforms.Dissolve_Factor.value -= 0.5 * dt
  });

  return (
    <Text
      anchorX="center"
      anchorY="middle"
      font={Geomatic}
      position={[0, -0.035, -10]}
      scale={1}
      castShadow
    >
      Andrew Cao
      <NodeToyMaterial data={data} ref={material} />
    </Text>
  );
}
