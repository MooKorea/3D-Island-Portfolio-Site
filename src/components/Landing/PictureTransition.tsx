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

const Image = styled(motion.image)`
  z-index: 6;
  backface-visibility: hidden;
`;

const Clip = styled(motion.rect)`
  z-index: -2;
  backface-visibility: hidden;
`;

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export default function PictureTransition() {
  const [ref1, animate1] = useAnimate();
  const [ref2, animate2] = useAnimate();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const animationParams = (xPos: number) => {
      return {
        translateX: clamp(-latest * 0.3, xPos, 1000),
        rotateY: clamp(latest * 0.2, 0, 180),
        scale: clamp(latest * 0.005 + 1, 1, 7),
        transformPerspective: 200,
      };
    };
    animate1(ref1.current, animationParams(400), { ease: easeOut });
    animate2(ref2.current, animationParams(-123), { ease: easeOut });
  });

  useEffect(() => {
    const transform = {
      translateX: 400,
      translateY: 100,
    };
    animate1(ref1.current, transform);
    animate2(ref2.current, {
      translateX: -123,
      translateY: -90,
    });
  }, []);

  return (
    <Container>
      <SVGContainer width="312" height="312" overflow="visible">
        <Image
          ref={ref2}
          href="/soy-boy.webp"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
        <defs>
          <clipPath id="svgPath">
            <Clip width="312" height="312" ref={ref1} />
          </clipPath>
        </defs>
      </SVGContainer>
    </Container>
  );
}
