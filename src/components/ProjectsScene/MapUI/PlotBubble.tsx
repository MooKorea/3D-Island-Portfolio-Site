import { Html } from "@react-three/drei";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useCameraContext } from "../../Contexts";
import { styled } from "styled-components";
import { project } from "../../../assets/ProjectContent";

const Bubble = styled.div`
  backdrop-filter: blur(8px);
  background-color: #ffffff47;
  display: flex;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  align-items: center;
  border-radius: 20px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  left: -50%;
  height: 2em;
  
  .label {
    margin-inline: 1em;
  }
`;

const previewWidth = "200px"
const Description = styled(motion.div)`
  position: absolute;
  white-space: pre-wrap;
  text-align: left;
  padding: 1em;
  height: 100%;
  width: ${previewWidth};
`;

interface PlotBubble {
  isHovered: boolean;
  projectData: project;
}

export default function PlotBubble({ isHovered, projectData }: PlotBubble) {
  const [scope, animate] = useAnimate();
  const { isFreeLook, isZoom } = useCameraContext();

  useEffect(() => {
    document.body.style.cursor = isHovered && !isFreeLook ? "pointer" : "auto";
    if (scope.current === null) return;
    animate(scope.current, {
      height: isHovered ? 150 : "2em",
      width: isHovered ? previewWidth : "auto",
      backgroundColor: isHovered ? "#ffffff8d" : "#ffffff47",
    });
  }, [isHovered]);

  useEffect(() => {
    if (scope.current === null) return;
    animate(scope.current, { opacity: isZoom || isFreeLook ? 0 : 1 });
  }, [isZoom, isFreeLook]);

  return (
    <Html
    position={[0, -0.5, 0]}
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
            <div className="label">{projectData.label}</div>
          </motion.div>
          <Description
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: isHovered ? 0.2 : 0 }}
          >
            {projectData.shortDescription}
          </Description>
        </Bubble>
      </motion.div>
    </Html>
  );
}
