import { styled } from "styled-components";
import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  easeOut,
  useMotionValue,
  motion,
} from "framer-motion";
import { useState } from "react";

const Image = styled(motion.img)`
  position: absolute;
  width: 350px;
  left: 50%;
  top: calc(50% - 200px);
  z-index: 101;
`;

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export default function ProfilePic() {
  const [ref, animate] = useAnimate();
  const { scrollY } = useScroll();
  const rotationThreshold = useMotionValue(0);
  rotationThreshold.on("change", (latest) => {
    setPFPVisible(latest > 51.5);
  });

  const [PFPVisible, setPFPVisible] = useState(true);
  useMotionValueEvent(scrollY, "change", (latest) => {
    animate(
      ref.current,
      {
        translateX: clamp(-latest * 0.3, 0, 1000),
        rotateY: clamp(latest * 0.15, 0, 180),
        scale: clamp(latest * 0.016 + 1, 1, 7),
        transformPerspective: 200,
      },
      { ease: easeOut }
    );
  });
  
  return (
    <Image
      src="/soy-boy.webp"
      ref={ref}
      style={{
        visibility: PFPVisible ? "hidden" : "visible",
        rotateY: rotationThreshold,
      }}
    />
  );
}
