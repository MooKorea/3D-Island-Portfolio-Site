import CameraControls from "camera-controls";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";

CameraControls.install({ THREE });
interface Controls {
  zoom: Boolean;
  focus: Vector3;
  pos?: Vector3;
  look?: Vector3;
}

export default function Camera({
  zoom,
  focus,
  pos = new Vector3(),
  look = new Vector3(),
}: Controls) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
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
