import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useCameraContext } from "../Contexts";
import { styled } from "styled-components";

const Bubble = styled.div`
  backdrop-filter: blur(8px);
  background-color: #ffffff47;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  left: -50%;
  height: 2em;
`;

const Description = styled(motion.div)`
  position: absolute;
  padding: 1em;
  height: 100%;
  width: 100%;
`;

interface PlotBubble {
  position: Vector3;
  isHovered: boolean;
}

export default function PlotBubble({ position, isHovered }: PlotBubble) {
  const [scope, animate] = useAnimate();
  const { isFreeLook, isZoom } = useCameraContext();

  useEffect(() => {
    document.body.style.cursor = isHovered && !isFreeLook ? "pointer" : "auto";
    if (scope.current === null) return;
    animate(scope.current, {
      height: isHovered ? 150 : "2em",
      width: isHovered ? 200 : 100,
      backgroundColor: isHovered ? "#ffffff8d" : "#ffffff47",
    });
  }, [isHovered]);

  useEffect(() => {
    if (scope.current === null) return;
    animate(scope.current, { opacity: isZoom || isFreeLook ? 0 : 1 });
  }, [isZoom, isFreeLook]);

  return (
    <Html
      position={new Vector3(position.x, position.y - 0.3, position.z)}
      zIndexRange={[isHovered ? 110 : 100, 0]}
      wrapperClass="plot-bubble"
    >
      <motion.div
        animate={{ y: isHovered ? 0 : 10 }}
        transition={{
          repeat: isHovered ? 0 : Infinity,
          repeatType: "reverse",
          duration: isHovered ? 0.1 : 1.5,
        }}
      >
        <Bubble ref={scope}>
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ delay: isHovered ? 0 : 0.2, duration: 0.1 }}
          >
            you suck
          </motion.div>
          <Description
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: isHovered ? 0.2 : 0 }}
          >
            I own a white vaporeon.
          </Description>
        </Bubble>
      </motion.div>
    </Html>
  );
}
