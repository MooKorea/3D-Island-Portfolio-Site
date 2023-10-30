import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { Group, Mesh, Vector3 } from "three";
import { Model } from "../../assets/Island";
import { RoundedBox, Environment, useEnvironment } from "@react-three/drei";
import CameraControls from "camera-controls";
import * as THREE from 'three'

CameraControls.install({ THREE })
interface Controls {
  zoom: Boolean;
  focus: Vector3;
  pos?: Vector3;
  look?: Vector3;
}

function Controls({
  zoom,
  focus,
  pos = new Vector3(),
  look = new Vector3(),
} : Controls) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y + 2, focus.z + 5) : pos.set(-5, 10, 15);
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 0);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

export default function Map() {
  const ref = useRef<Group>(null!);

  const boxRef = useRef<Mesh>(null!);

  useFrame((state) => {
    ref.current.position.x = 0.5 + state.pointer.x * 0.2;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  const envMap = useEnvironment({ files: "src/assets/animestyled_hdr3.hdr" });

  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState(new Vector3(0, 0, 0))

  return (
    <group ref={ref}>
      <Environment map={envMap} background="only" />
      <hemisphereLight args={["#fff", "#333", 1]} />
      <Model />
      <RoundedBox
        args={[1, 1, 1]}
        smoothness={4}
        radius={0.1}
        position={[-4.5, 1.9, -2.5]}
        onClick={(e) => {
          setFocus(e.object.position)
          setZoom(!zoom)
        }}
        ref={boxRef}
      >
        <meshPhysicalMaterial />
      </RoundedBox>
      <Controls zoom={zoom} focus={focus} />
    </group>
  );
}
