import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

// Detect mobile synchronously on first render to avoid flash
function useMobileSync() {
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  return isMobile;
}

const ScrollReveal = ({ children, speed = 0.15, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMobileSync();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Always create transforms (hooks must be unconditional)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}px`, `-${speed * 100}px`]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0.7]
  );

  // Mobile / reduced-motion: skip all animations, always show content
  if (isMobile || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
