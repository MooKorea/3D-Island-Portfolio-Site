import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { Model } from "../../assets/Island";
import { Environment, useEnvironment, OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
import Plot from "./Plot";
import { useCameraContext } from "./Contexts";

export default function Map() {
  const { isFreeLook } = useCameraContext();

  const ref = useRef<Group>(null!);
  useFrame((state) => {
    if (isFreeLook) return
    ref.current.position.x = 0.5 + state.pointer.x * 0.2;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  const envMap = useEnvironment({ files: "/animestyled_hdr3.hdr" });
  const [focus, setFocus] = useState(new Vector3(0, 0, 0));

  const plotPositions = [
    new Vector3(-4.5, 1.9, -2.5),
    new Vector3(-2, 1.9, 2.5),
    new Vector3(1.5, 1.9, -0.5),
    new Vector3(2.2, 1, 2.6),
  ];

  return (
    <group ref={ref}>
      <Environment map={envMap} background="only" />
      <hemisphereLight args={["#fff", "#333", 1]} />
      <Model />
      {plotPositions.map((e, i) => {
        return <Plot setFocus={setFocus} position={e} key={i} />;
      })}
      {isFreeLook && <OrbitControls />}
      <Camera focus={focus} />
    </group>
  );
}
