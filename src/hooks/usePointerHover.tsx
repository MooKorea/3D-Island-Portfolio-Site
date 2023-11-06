import { useState, useEffect } from "react";

export default function usePointerHover() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  return {
    onPointerOver: () => setIsHovered(true),
    onPointerOut: () => setIsHovered(false),
  };
}
