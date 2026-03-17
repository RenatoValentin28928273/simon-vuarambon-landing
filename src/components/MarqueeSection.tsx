import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const MarqueeSection = () => {
  const text = "Simon Vuarambon  ✦  Deep  ✦  Organic  ✦  Melodic  ✦  Bedrock  ✦  Shanti  ✦  ";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll position to horizontal movement — creates scroll-driven marquee
  const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x = useSpring(rawX, { stiffness: 80, damping: 30 });

  // Second row moves in opposite direction
  const rawX2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const x2 = useSpring(rawX2, { stiffness: 80, damping: 30 });

  return (
    <div ref={ref} className="py-12 border-y border-foreground/5 overflow-hidden space-y-4">
      <motion.div style={{ x }} className="whitespace-nowrap">
        <span className="font-serif italic text-4xl md:text-6xl text-foreground/30 tracking-[-0.02em]">
          {text}{text}{text}{text}
        </span>
      </motion.div>
      <motion.div style={{ x: x2 }} className="whitespace-nowrap">
        <span className="font-serif italic text-4xl md:text-6xl text-foreground/10 tracking-[-0.02em]">
          {text}{text}{text}{text}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeSection;
