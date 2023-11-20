import Plot from "./Plot";
import { Group, Vector3 } from "three";
import { Model } from "../../assets/Island";
import { Environment, OrbitControls, useEnvironment } from "@react-three/drei";
import { useCameraContext } from "../Contexts";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const plotPositions = [
  new Vector3(-4, 1.9, -1.5),
  new Vector3(-1.5, 1.9, 2.5),
  new Vector3(1.5, 1.9, -0.5),
  new Vector3(2.2, 1, 2.6),
];

export default function PlotContainer() {
  const envMap = useEnvironment({ files: "/animestyled_hdr3.hdr" });
  const ref = useRef<Group>(null!);
  const { isZoom, isFreeLook } = useCameraContext();

  useFrame((state) => {
    const multiplier: number = isZoom ? 0.03 : 0.1;
    ref.current.rotation.x = state.pointer.y * multiplier;
    ref.current.rotation.y = state.pointer.x * -multiplier;
  });

  return (
    <group position={[0, -10, -15]} ref={ref}>
      <Environment map={envMap} background />
      <hemisphereLight args={["#ee942d", "#ac7a59", 5]} />
      <directionalLight position={[5, 20, 10]} intensity={1} />
      <Model />
      {plotPositions.map((e, i) => {
        return <Plot position={e} key={i} index={i} amount={plotPositions.length} />;
      })}
      {isFreeLook && <OrbitControls target={[0, -10, -15]} maxPolarAngle={1.5} />}
    </group>
  );
}
