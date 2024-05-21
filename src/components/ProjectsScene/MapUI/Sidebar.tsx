import { useCameraContext } from "../../Contexts";
import { motion, easeInOut } from "framer-motion";
import { styled } from "styled-components";
import { projectData } from "../../../assets/ProjectContent";
import NavigateButtons from "./NavigateButtons";


const SidebarContainer = styled(motion.div)`
  @media (min-width: 1200px) {
    left: calc(15vw - 100px);
    height: calc(100vh - 8em);
    top: 4em;
    width: 25vw;
    border-radius: 2em;
  }

  position: absolute;
  left: 0;
  height: 100%;
  width: 350px;
  background: radial-gradient(circle, #ddfcf8a7 0%, rgba(161, 187, 209, 0.144) 100%);
  backdrop-filter: blur(50px);
  padding: 2em;
  box-shadow: inset 0 0 10rem #ffffff;
  pointer-events: all;
  filter: drop-shadow(0 0 2rem #26746176);
  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Sidebar() {
    const { isZoom, currentPos } = useCameraContext();
    return (
      <SidebarContainer
        initial={{opacity: 0}}
        animate={{ opacity: isZoom ? 1 : 0, x: isZoom ? 0 : -100 }}
        transition={{ ease: easeInOut, duration: 0.7 }}
      >
        <NavigateButtons />
        <h2><a href={projectData[currentPos].link} target="_blank">{projectData[currentPos].title}</a></h2>
        <p>
          {projectData[currentPos].description}
        </p>
      </SidebarContainer>
    );
  }