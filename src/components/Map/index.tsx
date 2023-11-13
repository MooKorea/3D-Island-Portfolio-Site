import { UIState } from "../Contexts";
import { useEffect, useRef } from "react";
import { usePanels } from "../../assets/Panels";
import Music from "../../assets/music/Simian_Segue.mp3";
import useAudio from "../../hooks/useAudio";
import Projects from "./Projects";
import { useCameraContext } from "../Contexts";
import Label from "./Label";
import { Model } from "../../assets/Island";
import PreviewModel from "./PreviewModel";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export default function Map() {
  const { UI } = useCameraContext();
  const { playAudio, stopAudio } = useAudio(Music);
  useEffect(() => {
    UI === UIState.Map ? playAudio() : stopAudio();
  }, [UI]);

  const scroll = useScroll()
  const ref = useRef<Group>(null!);
  useFrame(() => {
    const r2 = scroll.range(0, 1);
    ref.current.position.y = -3.7 + r2 * 3;
  })

  const { nodes } = usePanels();

  return (
    <group position={[0, 0, -6]} ref={ref}>
      <mesh geometry={nodes.Models.geometry} position={[-2.541, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <mesh geometry={nodes.Models_Reverse.geometry} position={[-2.541, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <Projects>
        <Label label="Projects" xOffset={0.5} />
        <PreviewModel position={[-0.6, -12, -30]} scrollMultiplier={10}>
          <Model rotation={[0.3, 0, 0]} />
        </PreviewModel>
      </Projects>
      <mesh geometry={nodes.Skills.geometry} position={[2.538, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
      <mesh geometry={nodes.Skills_Reverse.geometry} position={[2.538, 0, 0]}>
        <meshPhysicalMaterial />
      </mesh>
    </group>
  );
}
