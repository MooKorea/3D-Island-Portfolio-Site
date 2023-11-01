import { useCameraContext } from "../Contexts";
import { useEffect } from "react";
import { styled } from "styled-components";
import { motion, useAnimate, easeOut } from "framer-motion";

const BottomContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 10em;
  border: none;
  width: 10em;
  height: 3em;
  font-size: inherit;
  font-family: inherit;
  font-weight: 700;
  pointer-events: all;
  filter: drop-shadow(0 1em 1rem #000000b2);
  &:hover {
    cursor: pointer;
  }
`;

export default function BottomButtons() {
  const { isFreeLook, setIsFreeLook, isZoom } = useCameraContext();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      scope.current,
      {
        y: isZoom ? "100%" : 0,
      },
      { ease: easeOut }
    );
  }, [isZoom]);
  return (
    <BottomContainer ref={scope}>
      <Button
        onClick={() => setIsFreeLook(!isFreeLook)}
        style={{ pointerEvents: isZoom ? "none" : "all" }}
      >
        {isFreeLook ? "Back" : "Free Look"}
      </Button>
    </BottomContainer>
  );
}
