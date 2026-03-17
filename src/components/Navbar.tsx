import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { label: "Tour", href: "#tour" },
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Presskit", href: "#presskit" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md" : ""
      }`}
    >
      {/* Border line draws left→right when scrolled */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10"
      />

      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo — curtain reveal from left */}
        <div className="overflow-hidden">
          <motion.a
            href="#"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-mono text-xs tracking-[0.3em] uppercase text-foreground"
          >
            Simon Vuarambon
          </motion.a>
        </div>

        {/* Desktop nav — stagger from top */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <div key={item.label} className="overflow-hidden">
              <motion.a
                href={item.href}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.25 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block link-underline font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                {item.label}
              </motion.a>
            </div>
          ))}
        </div>

        {/* Mobile toggle — fades in last */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-px bg-foreground"
          />
        </motion.button>
      </nav>

      {/* Mobile full-screen menu — curtain from top */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background/97 backdrop-blur-md flex flex-col items-center justify-center gap-10 z-40"
          >
            {navItems.map((item, i) => (
              <div key={item.label} className="overflow-hidden">
                <motion.a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block font-serif italic text-4xl text-foreground hover:text-primary transition-colors duration-500"
                >
                  {item.label}
                </motion.a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
