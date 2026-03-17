import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";
import SmokeBackground from "@/components/SmokeBackground";

const tourDates = [
  { date: "MAR 28", city: "Buenos Aires", country: "AR", venue: "Dahaus, Palacio Alsina", status: "tickets" },
  { date: "APR 05", city: "São Paulo",    country: "BR", venue: "D-Edge",                 status: "tickets" },
  { date: "APR 12", city: "Bogotá",       country: "CO", venue: "Baum Festival",           status: "tickets" },
  { date: "MAY 03", city: "Berlin",       country: "DE", venue: "Watergate",               status: "tickets" },
  { date: "MAY 17", city: "London",       country: "UK", venue: "Fabric",                  status: "sold out" },
  { date: "JUN 07", city: "Ibiza",        country: "ES", venue: "Pacha",                   status: "tickets" },
  { date: "JUL 19", city: "Córdoba",      country: "AR", venue: "Club Paraguay",           status: "tickets" },
];

const ITEM_H = 88;
const VISIBLE = 7;

const TourSection = () => {
  const [active, setActive] = useState(0);

  const goPrev = () => setActive(i => Math.max(0, i - 1));
  const goNext = () => setActive(i => Math.min(tourDates.length - 1, i + 1));

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")   goPrev();
      if (e.key === "ArrowDown") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const half     = Math.floor(VISIBLE / 2);
  const wheelH   = VISIBLE * ITEM_H;
  const listY    = half * ITEM_H - active * ITEM_H;
  const current  = tourDates[active];

  return (
    <section id="tour" className="relative overflow-hidden py-[12vh] px-6 md:px-12">
      <SmokeBackground />

      <div className="container mx-auto max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-12 md:mb-16"
        >
          <AnimatedHeading
            text="Tour"
            className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground"
          />
          <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">2026</span>
        </motion.div>

        {/* ── Drum wheel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Up arrow */}
          <button
            onClick={goPrev}
            disabled={active === 0}
            aria-label="Previous city"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-foreground/40 hover:text-foreground hover:border-white/25 transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Wheel viewport */}
          <div
            className="relative w-full overflow-hidden select-none"
            style={{ height: wheelH }}
          >
            {/* Gradient fades */}
            <div className="absolute inset-x-0 top-0 z-10 pointer-events-none"
              style={{ height: 3 * ITEM_H, background: "linear-gradient(to bottom, hsl(var(--background)) 10%, transparent 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
              style={{ height: 3 * ITEM_H, background: "linear-gradient(to top, hsl(var(--background)) 10%, transparent 100%)" }}
            />

            {/* Sliding list */}
            <motion.div
              animate={{ y: listY }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {tourDates.map((tour, i) => {
                const dist    = Math.abs(i - active);
                const opacity = Math.max(0.04, 1 - dist * 0.28);
                const scale   = Math.max(0.52, 1 - dist * 0.14);
                const isActive = i === active;

                return (
                  <motion.button
                    key={i}
                    onClick={() => setActive(i)}
                    animate={{ opacity, scale }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full flex items-center justify-center"
                    style={{
                      height: ITEM_H,
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: isActive ? 700 : 400,
                      fontSize: "clamp(1.8rem, 5.5vw, 4.8rem)",
                      letterSpacing: "-0.03em",
                      textTransform: "uppercase",
                      color: "hsl(var(--foreground))",
                      cursor: isActive ? "default" : "pointer",
                      lineHeight: 1,
                      border: "none",
                      background: "none",
                    }}
                  >
                    {tour.city}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Down arrow */}
          <button
            onClick={goNext}
            disabled={active === tourDates.length - 1}
            aria-label="Next city"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-foreground/40 hover:text-foreground hover:border-white/25 transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>

        {/* ── Active tour details ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 pt-6 border-t border-foreground/5"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
              {current.date}
            </span>
            <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground hidden md:inline">
              {current.country} · {current.venue}
            </span>
            <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground md:hidden">
              {current.venue}
            </span>
            {current.status === "sold out" ? (
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 border border-white/10 rounded px-3 py-1">
                Sold out
              </span>
            ) : (
              <a
                href="#"
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-primary hover:text-primary transition-colors duration-300"
              >
                Get tickets <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            <span className="font-mono text-[10px] text-foreground/25 tracking-[0.15em]">
              {active + 1} / {tourDates.length}
            </span>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TourSection;
