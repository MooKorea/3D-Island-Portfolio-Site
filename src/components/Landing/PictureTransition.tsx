import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
  easeOut,
} from "framer-motion";
import { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  right: 20vw;
`;

const SVGContainer = styled.svg`
  visibility: visible;
  transform-style: preserve-3d;
`;

const Clip = styled(motion.rect)`
  z-index: -2;
  backface-visibility: hidden;
`;

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export default function PictureTransition() {
  const [ref, animate] = useAnimate();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    animate(
      ref.current,
      {
        rotateY: clamp(latest * 0.3, 0, 180),
        scale: clamp(latest * 0.007 + 1, 1, 8),
        transformPerspective: 200,
      },
      { ease: easeOut }
    );
  });
  useEffect(() => {
    const transform = {
      translateX: "50vw",
      translateY: "calc(50vh - 140px)",
    };
    animate(ref.current, transform);
  }, []);

  return (
    <Container>
      <SVGContainer width="312" height="312" overflow="visible">
        <defs>
          <clipPath id="svgPath">
            <Clip width="312" height="312" ref={ref} />
          </clipPath>
        </defs>
      </SVGContainer>
    </Container>
  );
}
