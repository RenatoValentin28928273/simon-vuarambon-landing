import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

const ScrollReveal = ({ children, speed = 0.15, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // On mobile or reduced-motion: cut speed in half, keep opacity gentle
  const effectiveSpeed = (prefersReducedMotion || isMobile) ? speed * 0.4 : speed;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${effectiveSpeed * 100}px`, `-${effectiveSpeed * 100}px`]
  );

  // Mobile: much softer fade so content is never invisible mid-scroll
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.06, 0.94, 1] : [0, 0.15, 0.85, 1],
    isMobile ? [0, 1, 1, 0.9] : [0, 1, 1, 0.6]
  );

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
