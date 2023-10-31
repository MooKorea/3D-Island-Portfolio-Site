import { styled } from "styled-components";
import { useCameraContext } from "./Contexts";
import { motion, useAnimate, easeOut } from "framer-motion";
import { useEffect } from "react";

const BottomContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #00000068;
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
  &:hover {
    cursor: pointer;
  }
`;
function BottomButtons() {
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
        Free Look
      </Button>
    </BottomContainer>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  pointer-events: none;
  top: 0;
`;
export default function MapUI() {
  return (
    <Container>
      <BottomButtons />
    </Container>
  );
}
