import { useEffect } from "react";
import Scroll from "../../../assets/sounds/Scroll.ogg";
import { styled } from "styled-components";
import { useCameraContext } from "../../Contexts";

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: calc(-6em - 1em);
  height: 3em;
  width: 6em;
  display: flex;
  border-radius: 40px;
  overflow: hidden;
  z-index: 3;
`;

const Button = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffffb9;
  pointer-events: all;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: #ffffff90;
  }

  svg {
    transform: scale(1.4);
    opacity: 0.5;
  }
`;

export default function NavigateButtons() {
  const { currentPos, setCurrentPos, setFocus, plotWorldPositions } = useCameraContext();
  const audio = new Audio(Scroll);
  const handleNavigation = (direction: number) => {
    if (currentPos === 0 && direction === -1) return;
    if (currentPos === plotWorldPositions.length - 1 && direction === 1) return;
    setCurrentPos(currentPos + direction);
    audio.play();
  };

  useEffect(() => {
    setFocus(plotWorldPositions[currentPos]);
  }, [currentPos]);

  return (
    <ButtonContainer>
      <Button onClick={() => handleNavigation(-1)}>
        <ArrowLeft />
      </Button>
      <Button onClick={() => handleNavigation(1)}>
        <ArrowRight />
      </Button>
    </ButtonContainer>
  );
}

function ArrowRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}
