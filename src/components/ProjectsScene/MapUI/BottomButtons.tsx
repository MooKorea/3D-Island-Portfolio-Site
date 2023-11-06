import { useCameraContext, UIState } from "../../Contexts";
import { useEffect } from "react";
import { styled } from "styled-components";
import { motion, useAnimate, easeOut } from "framer-motion";
import { Button } from "../../../assets/Styles";

const BottomContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BottomButtons() {
  const { isFreeLook, setIsFreeLook, isZoom, UI } = useCameraContext();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      scope.current,
      {
        y: isZoom || UI !== UIState.Map ? "100%" : 0,
      },
      { ease: easeOut }
    );
  }, [isZoom, UI]);
  return (
    <BottomContainer ref={scope} initial={{ y: "100%" }}>
      <Button
        onClick={() => setIsFreeLook(!isFreeLook)}
        style={{ pointerEvents: isZoom ? "none" : "all" }}
      >
        {isFreeLook ? "Back" : "Free Look"}
      </Button>
    </BottomContainer>
  );
}
