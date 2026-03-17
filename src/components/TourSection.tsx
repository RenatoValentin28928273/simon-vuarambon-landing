import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const TourMap = lazy(() => import("@/components/TourMap"));
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

const tourDates = [
  { date: "MAR 28", city: "Buenos Aires", country: "AR", venue: "Dahaus, Palacio Alsina", status: "tickets" },
  { date: "APR 05", city: "São Paulo",    country: "BR", venue: "D-Edge",                 status: "tickets" },
  { date: "APR 12", city: "Bogotá",       country: "CO", venue: "Baum Festival",           status: "tickets" },
  { date: "MAY 03", city: "Berlin",       country: "DE", venue: "Watergate",               status: "tickets" },
  { date: "MAY 17", city: "London",       country: "UK", venue: "Fabric",                  status: "sold out" },
  { date: "JUN 07", city: "Ibiza",        country: "ES", venue: "Pacha",                   status: "tickets" },
  { date: "JUL 19", city: "Córdoba",      country: "AR", venue: "Club Paraguay",           status: "tickets" },
];

const ITEM_H  = 80;
const VISIBLE = 5; // show 5 at a time: -2, -1, active, +1, +2

const TourSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const isLockedRef = useRef(false);
  const cooldownRef = useRef(false);
  const activeRef   = useRef(activeIndex);
  activeRef.current = activeIndex;

  /* ── Lock scroll when section is ≥85% visible (desktop only) ── */
  useEffect(() => {
    if (IS_MOBILE) return;

    const obs = new IntersectionObserver(
      ([entry]) => { isLockedRef.current = entry.intersectionRatio >= 0.85; },
      { threshold: [0, 0.85, 1] }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Wheel event interception ── */
  useEffect(() => {
    if (IS_MOBILE) return;

    const onWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;

      const goingDown = e.deltaY > 0;
      const cur = activeRef.current;

      // At boundaries → let scroll pass through naturally
      if (goingDown && cur >= tourDates.length - 1) return;
      if (!goingDown && cur <= 0) return;

      // Trap the scroll
      e.preventDefault();
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      setTimeout(() => { cooldownRef.current = false; }, 700);

      setActiveIndex(prev =>
        goingDown
          ? Math.min(prev + 1, tourDates.length - 1)
          : Math.max(prev - 1, 0)
      );
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (IS_MOBILE) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, tourDates.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const half    = Math.floor(VISIBLE / 2);
  const wheelH  = VISIBLE * ITEM_H;
  const listY   = (half - activeIndex) * ITEM_H;
  const current = tourDates[activeIndex];

  return (
    <>
      {/* ── Mobile: card list ── */}
      <section id="tour" className="relative md:hidden py-[12vh] px-6 overflow-hidden bg-black">
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

      {/* ── Desktop: full-screen trapped section ── */}
      <section
        id="tour"
        ref={sectionRef}
        className="relative hidden md:flex flex-col justify-center px-12 bg-black"
        style={{ height: "100vh" }}
      >
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-baseline justify-between mb-14"
          >
            <AnimatedHeading
              text="Tour"
              className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground"
            />
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">2026</span>
          </motion.div>

          {/* Drum wheel + detail card */}
          <div className="flex flex-row items-center gap-8 xl:gap-12">

            {/* Left: drum wheel */}
            <div className="flex-1 min-w-0 flex justify-center">
              <div className="relative select-none w-full max-w-lg" style={{ height: wheelH }}>
                <div
                  className="absolute inset-x-0 top-0 z-10 pointer-events-none"
                  style={{ height: ITEM_H * 1.5, background: "linear-gradient(to bottom, black 40%, transparent)" }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                  style={{ height: ITEM_H * 1.5, background: "linear-gradient(to top, black 40%, transparent)" }}
                />
                <motion.div
                  initial={{ y: listY }}
                  animate={{ y: listY }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                >
                  {tourDates.map((tour, i) => {
                    const dist = Math.abs(i - activeIndex);
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: Math.max(0.04, 1 - dist * 0.28),
                          scale:   Math.max(0.52, 1 - dist * 0.14),
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center justify-center"
                        style={{ height: ITEM_H }}
                      >
                        <span style={{
                          fontFamily:    "var(--font-serif)",
                          fontStyle:     "italic",
                          fontWeight:    i === activeIndex ? 700 : 400,
                          fontSize:      "clamp(1.8rem, 4.5vw, 4rem)",
                          letterSpacing: "-0.03em",
                          textTransform: "uppercase",
                          color:         "hsl(var(--foreground))",
                          lineHeight:    1,
                        }}>
                          {tour.city}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Right: detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[10px] p-6 flex flex-col gap-4 shrink-0 w-[360px]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
                  {current.date}
                </span>
                <div>
                  <h3 className="font-serif italic text-4xl tracking-[-0.03em] text-foreground leading-tight">
                    {current.city}
                  </h3>
                  <span className="font-mono text-xs text-foreground/50 tracking-[0.15em] uppercase">
                    {current.country}
                  </span>
                </div>
                <p className="font-mono text-sm text-foreground/80 tracking-[0.08em] uppercase">
                  {current.venue}
                </p>

                {!IS_MOBILE && (
                  <Suspense fallback={<div style={{ height: 180 }} className="w-full rounded-md bg-white/5 animate-pulse" />}>
                    <TourMap city={current.city} />
                  </Suspense>
                )}

                <div className="pt-3 border-t border-white/8">
                  {current.status === "sold out" ? (
                    <span className="inline-block font-mono text-xs text-foreground/50 tracking-[0.15em] uppercase border border-white/15 rounded px-3 py-1.5">
                      Sold out
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors duration-300"
                    >
                      Get tickets <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="font-mono text-[10px] text-foreground/30 tracking-[0.15em]">
                  {activeIndex + 1} / {tourDates.length}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {tourDates.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{ opacity: i === activeIndex ? 1 : 0.25, scale: i === activeIndex ? 1 : 0.7 }}
                className="w-1.5 h-1.5 rounded-full bg-foreground"
                aria-label={tourDates[i].city}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default TourSection;
