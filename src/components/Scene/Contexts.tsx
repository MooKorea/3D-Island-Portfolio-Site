import { createContext, useContext, useState } from "react";

type CameraContext = {
  isFreeLook: boolean;
  setIsFreeLook: React.Dispatch<React.SetStateAction<boolean>>;
  isZoom: boolean;
  setIsZoom: React.Dispatch<React.SetStateAction<boolean>>;
};

const CameraContext = createContext<CameraContext | null>(null);

export function CameraContextProvider({ children }: { children: React.ReactNode }) {
  const [isFreeLook, setIsFreeLook] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  return (
    <CameraContext.Provider value={{ isFreeLook, setIsFreeLook, isZoom, setIsZoom }}>
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
