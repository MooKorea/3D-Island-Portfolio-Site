import { useCameraContext, UIState } from "../Contexts";
import { useEffect } from "react";
import { styled } from "styled-components";
import { motion, useAnimate, easeOut } from "framer-motion";
import { Button } from "../../../assets/Styles";

const TopContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BottomButtons() {
  const { UI, setUI, isZoom, isFreeLook } = useCameraContext();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      scope.current,
      {
        y: isZoom || isFreeLook || UI !== UIState.Map ? "-100%" : 0,
      },
      { ease: easeOut }
    );
  }, [isZoom, isFreeLook, UI]);
  return (
    <TopContainer ref={scope} initial={{ y: "-100%" }}>
      <Button
        onClick={() => setUI(UIState.Home)}
        style={{ pointerEvents: isZoom ? "none" : "all" }}
      >
        Back
      </Button>
    </TopContainer>
  );
}
