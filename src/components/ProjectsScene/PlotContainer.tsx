import Plot from "./Plot";
import { Group, Vector3 } from "three";
import { Model } from "../../assets/Island";
import { Environment, useEnvironment } from "@react-three/drei";
import { useCameraContext } from "../Contexts";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const plotPositions = [
  new Vector3(-4.5, 1.9, -2.5),
  new Vector3(-2, 1.9, 2.5),
  new Vector3(1.5, 1.9, -0.5),
  new Vector3(2.2, 1, 2.6),
];

export default function PlotContainer({ isFreeLook }: { isFreeLook: boolean }) {
  const envMap = useEnvironment({ files: "/animestyled_hdr3.hdr" });
  const ref = useRef<Group>(null!);
  const { isZoom } = useCameraContext();

  useFrame((state) => {
    if (isFreeLook) return;
    const multiplier: number = isZoom ? 0.03 : 0.1;
    ref.current.rotation.x = state.pointer.y * multiplier;
    ref.current.rotation.y = state.pointer.x * -multiplier;
  });

  return (
    <group position={[0, -10, -15]} ref={ref}>
      <Environment map={envMap} background="only" />
      <hemisphereLight args={["#c9c9c9", "#707070", 1]} />
      <directionalLight position={[5, 20, 0]} intensity={1} />
      <Model />
      {plotPositions.map((e, i) => {
        return <Plot position={e} key={i} index={i} amount={plotPositions.length} />;
      })}
    </group>
  );
}
