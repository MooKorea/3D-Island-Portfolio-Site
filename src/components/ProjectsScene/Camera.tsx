import CameraControls from "camera-controls";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";
import { useCameraContext } from "../Contexts";

CameraControls.install({ THREE });
interface Controls {
  pos?: Vector3;
  look?: Vector3;
}

export default function Camera({ pos = new Vector3(), look = new Vector3() }: Controls) {
  const { isFreeLook, isZoom, focus, defaultLook, cameraSpeed } = useCameraContext();

  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  return useFrame((state, delta) => {
    if (isFreeLook) return;
    isZoom ? pos.set(focus.x, focus.y + 2, focus.z + 5) : pos.set(0, 0, 0);
    isZoom
      ? look.set(focus.x, focus.y - 0.5, focus.z - 0.2)
      : look.set(defaultLook.x, defaultLook.y, defaultLook.z);

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
    return controls.update(delta * cameraSpeed);
  });
}
