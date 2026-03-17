import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading = ({ text, className = "" }: AnimatedHeadingProps) => {
  const chars = text.split("");

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedHeading;
