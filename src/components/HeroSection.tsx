import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InteractiveBackground from "@/components/InteractiveBackground";

const words = ["Deep", "Organic", "Melodic", "Soulful", "Resonant"];

const Typewriter = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "erasing">("typing");

  useEffect(() => {
    const word = words[wordIndex];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("waiting"), 2000);
        return () => clearTimeout(t);
      }
    }

    if (phase === "waiting") {
      setPhase("erasing");
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, wordIndex]);

  return (
    <span className="inline-flex items-center gap-[2px]">
      <span>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.75, repeat: Infinity, repeatType: "reverse", ease: "steps(1)" }}
        className="inline-block w-px h-[1em] bg-muted-foreground align-middle"
      />
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Interactive animated background */}
      <div className="absolute inset-0">
        <InteractiveBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pb-[15vh]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          <Typewriter />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] text-foreground max-w-4xl"
        >
          Resonating
          <br />
          <span className="text-primary">in the deep.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-mono text-sm text-muted-foreground mt-8 max-w-md"
        >
          A study on organic textures and melodic depth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-8 mt-10"
        >
          <a href="#music" className="link-underline font-mono text-xs tracking-[0.2em] uppercase text-foreground">
            Listen
          </a>
          <a href="#contact" className="link-underline font-mono text-xs tracking-[0.2em] uppercase text-foreground">
            Inquire
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-foreground/70">Scroll</span>

        {/* Animated track + ball */}
        <div className="relative flex flex-col items-center w-px h-14 bg-foreground/15 overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", repeatDelay: 0.3 }}
            className="w-px h-5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
