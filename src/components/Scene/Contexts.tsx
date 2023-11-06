import { createContext, useContext, useState } from "react";
import { Vector3 } from "three";

type CameraContext = {
  isFreeLook: boolean;
  setIsFreeLook: React.Dispatch<React.SetStateAction<boolean>>;
  isZoom: boolean;
  setIsZoom: React.Dispatch<React.SetStateAction<boolean>>;
  currentPos: number;
  setCurrentPos: React.Dispatch<React.SetStateAction<number>>;
  focus: Vector3;
  setFocus: React.Dispatch<React.SetStateAction<Vector3>>;
  defaultLook: Vector3;
  setDefaultLook: React.Dispatch<React.SetStateAction<Vector3>>;
  UI: UIState;
  setUI: React.Dispatch<React.SetStateAction<UIState>>;
  plotWorldPositions: Vector3[];
  setPlotWorldPositions: React.Dispatch<React.SetStateAction<Vector3[]>>;
  cameraSpeed: number;
  setCameraSpeed: React.Dispatch<React.SetStateAction<number>>;
};

const CameraContext = createContext<CameraContext | null>(null);

export const enum UIState {
  Home,
  Map
}

export function CameraContextProvider({ children }: { children: React.ReactNode }) {
  const [isFreeLook, setIsFreeLook] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const [currentPos, setCurrentPos] = useState(0);
  const [focus, setFocus] = useState(new Vector3(0, 0, 0));
  const [defaultLook, setDefaultLook] = useState(new Vector3(0, 0, 0))
  const [UI, setUI] = useState(UIState.Home)
  const [plotWorldPositions, setPlotWorldPositions] = useState<Vector3[]>([])
  const [cameraSpeed, setCameraSpeed] = useState<number>(1)

  return (
    <CameraContext.Provider
      value={{
        isFreeLook,
        setIsFreeLook,
        isZoom,
        setIsZoom,
        currentPos,
        setCurrentPos,
        focus,
        setFocus,
        defaultLook,
        setDefaultLook,
        UI,
        setUI,
        plotWorldPositions,
        setPlotWorldPositions,
        cameraSpeed,
        setCameraSpeed,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCameraContext() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCameraContext must be used within a CameraContextProvider");
  }
  return context;
}
