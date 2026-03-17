import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={ref} className="px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          style={{ scaleX, opacity }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-center"
        />
      </div>
    </div>
  );
};

export default SectionDivider;
