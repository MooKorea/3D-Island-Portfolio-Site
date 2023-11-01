import { useCameraContext } from "../Contexts";
import { NavHeight } from "../../Navbar";
import { motion, easeInOut } from "framer-motion";
import { styled } from "styled-components";

const SidebarContainer = styled(motion.div)`
  @media (min-width: 1200px) {
    left: calc(15vw - 100px);
    height: calc(100vh - ${NavHeight} - 8em);
    top: calc(4em + ${NavHeight});
    width: 25vw;
    border-radius: 2em;
  }

  position: absolute;
  left: 0;
  top: ${NavHeight};
  height: calc(100% - ${NavHeight});
  width: 350px;
  background: radial-gradient(circle, #ddfcf8a7 0%, rgba(161, 187, 209, 0.144) 100%);
  backdrop-filter: blur(50px);
  padding: 2em;
  box-shadow: inset 0 0 10rem #ffffff;
  filter: drop-shadow(0 0 2rem #26746176);
`;

export default function Sidebar() {
    const { isZoom } = useCameraContext();
    return (
      <SidebarContainer
        animate={{ opacity: isZoom ? 1 : 0, x: isZoom ? 0 : -100 }}
        transition={{ ease: easeInOut, duration: 0.7 }}
      >
        <h2>I like bread</h2>
        <p>
          A drop shadow is effectively a blurred, offset version of the input image's alpha
          mask, drawn in a specific color and composited below the image.
        </p>
      </SidebarContainer>
    );
  }