import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const ITEM_H  = 88;
const VISIBLE = 7;
// 35vh per city on desktop → ~245vh total (reasonable)
const VH_PER_ITEM = 35;

const TourSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-driven index (desktop only) ── */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const fractional = useTransform(smoothProgress, [0, 1], [0, tourDates.length - 1]);

  useEffect(() => {
    return fractional.on("change", (fi) => {
      setActiveIndex(Math.min(Math.max(Math.round(fi), 0), tourDates.length - 1));
    });
  }, [fractional]);

  const half   = Math.floor(VISIBLE / 2);
  const wheelH = VISIBLE * ITEM_H;
  const listY  = useTransform(fractional, (fi) => (half - fi) * ITEM_H);

  const current = tourDates[activeIndex];

  return (
    <>
      {/* ── Mobile: simple list ── */}
      <section id="tour" className="relative md:hidden py-[12vh] px-6 overflow-hidden">
        <SmokeBackground />
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between mb-10">
            <AnimatedHeading
              text="Tour"
              className="font-serif italic text-5xl tracking-[-0.04em] text-foreground"
            />
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">2026</span>
          </div>
          <div className="space-y-3">
            {tourDates.map((tour, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-[10px] border border-white/10 outline outline-1 outline-white/[0.06] px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary block mb-1">
                    {tour.date}
                  </span>
                  <h4 className="font-serif italic text-xl text-foreground leading-tight">
                    {tour.city}
                    <span className="text-foreground/50 text-sm ml-2">{tour.country}</span>
                  </h4>
                  <p className="font-mono text-xs text-foreground/60 mt-1 tracking-[0.08em] uppercase">
                    {tour.venue}
                  </p>
                </div>
                <div className="shrink-0">
                  {tour.status === "sold out" ? (
                    <span className="inline-block font-mono text-[10px] text-foreground/55 tracking-[0.15em] uppercase border border-white/15 rounded px-2.5 py-1">
                      Sold out
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-primary hover:text-primary transition-colors duration-300"
                    >
                      Tickets <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: scroll-driven drum wheel ── */}
      <div
        ref={outerRef}
        style={{ height: `${tourDates.length * VH_PER_ITEM}vh` }}
        className="hidden md:block"
      >
        <section className="sticky top-0 h-screen flex flex-col justify-center px-12 overflow-hidden">
          <SmokeBackground />

          <div className="container mx-auto max-w-5xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-baseline justify-between mb-12"
            >
              <AnimatedHeading
                text="Tour"
                className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground"
              />
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">2026</span>
            </motion.div>

            {/* Drum wheel */}
            <div
              className="relative w-full overflow-hidden select-none"
              style={{ height: wheelH }}
            >
              {/* Gradient fades */}
              <div
                className="absolute inset-x-0 top-0 z-10 pointer-events-none"
                style={{ height: 3 * ITEM_H, background: "linear-gradient(to bottom, hsl(var(--background)) 5%, transparent 100%)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                style={{ height: 3 * ITEM_H, background: "linear-gradient(to top, hsl(var(--background)) 5%, transparent 100%)" }}
              />

              {/* Sliding list */}
              <motion.div style={{ y: listY }}>
                {tourDates.map((tour, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: Math.max(0.04, 1 - Math.abs(i - activeIndex) * 0.28),
                        scale:   Math.max(0.52, 1 - Math.abs(i - activeIndex) * 0.14),
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full flex items-center justify-center"
                      style={{ height: ITEM_H }}
                    >
                      <span
                        style={{
                          fontFamily:    "var(--font-serif)",
                          fontStyle:     "italic",
                          fontWeight:    isActive ? 700 : 400,
                          fontSize:      "clamp(1.8rem, 5.5vw, 4.8rem)",
                          letterSpacing: "-0.03em",
                          textTransform: "uppercase",
                          color:         "hsl(var(--foreground))",
                          lineHeight:    1,
                        }}
                      >
                        {tour.city}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Active tour details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-8 mt-8 pt-6 border-t border-foreground/8"
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
                  {current.date}
                </span>
                <span className="font-mono text-sm text-foreground/70 tracking-[0.12em] uppercase">
                  {current.venue}
                </span>
                <span className="font-mono text-xs text-foreground/40 tracking-[0.1em]">
                  {current.country}
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
                  {activeIndex + 1} / {tourDates.length}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-muted-foreground/30 mx-auto"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default TourSection;
