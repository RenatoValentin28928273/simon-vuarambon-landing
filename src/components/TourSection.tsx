import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowUpRight } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const tourDates = [
  { date: "MAR 28", city: "Buenos Aires", country: "AR", venue: "Dahaus, Palacio Alsina", status: "tickets" },
  { date: "APR 05", city: "São Paulo", country: "BR", venue: "D-Edge", status: "tickets" },
  { date: "APR 12", city: "Bogotá", country: "CO", venue: "Baum Festival", status: "tickets" },
  { date: "MAY 03", city: "Berlin", country: "DE", venue: "Watergate", status: "tickets" },
  { date: "MAY 17", city: "London", country: "UK", venue: "Fabric", status: "sold out" },
  { date: "JUN 07", city: "Ibiza", country: "ES", venue: "Pacha", status: "tickets" },
  { date: "JUL 19", city: "Córdoba", country: "AR", venue: "Club Paraguay", status: "tickets" },
];

const VISIBLE_ITEMS = 5;
const ITEM_HEIGHT = 96;

const getItemStyle = (distance: number) => {
  const abs = Math.abs(distance);
  if (abs === 0) return { scale: 1,    opacity: 1,    color: "hsl(var(--foreground))" };
  if (abs === 1) return { scale: 0.72, opacity: 0.45, color: "hsl(var(--foreground))" };
  if (abs === 2) return { scale: 0.52, opacity: 0.2,  color: "hsl(var(--foreground))" };
  return              { scale: 0.38, opacity: 0.08, color: "hsl(var(--foreground))" };
};

const TourSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [20, -25]);

  const prev = () => setActiveIndex((i) => (i - 1 + tourDates.length) % tourDates.length);
  const next = () => setActiveIndex((i) => (i + 1) % tourDates.length);

  // Build the visible window: activeIndex ± (VISIBLE_ITEMS // 2)
  const half = Math.floor(VISIBLE_ITEMS / 2);
  const indices = Array.from({ length: VISIBLE_ITEMS }, (_, k) => {
    const offset = k - half;
    return { offset, idx: (activeIndex + offset + tourDates.length) % tourDates.length };
  });

  const active = tourDates[activeIndex];

  return (
    <section ref={sectionRef} id="tour" className="py-[15vh] px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ y: headingY }}
          className="flex items-baseline justify-between mb-16"
        >
          <AnimatedHeading
            text="Tour"
            className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground"
          />
          <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">2026</span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Drum wheel */}
          <div className="flex flex-col items-center gap-6 flex-shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/50 transition-colors duration-300"
            >
              <ChevronUp className="w-5 h-5 text-foreground" />
            </button>

            <div
              className="relative overflow-hidden select-none"
              style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
            >
              {/* Fade masks top & bottom */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

              <div className="flex flex-col">
                {indices.map(({ offset, idx }) => {
                  const tour = tourDates[idx];
                  const style = getItemStyle(offset);
                  return (
                    <motion.button
                      key={`${offset}-${idx}`}
                      onClick={() => setActiveIndex(idx)}
                      animate={{
                        scale: style.scale,
                        opacity: style.opacity,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="font-sans font-black uppercase text-center leading-none cursor-pointer"
                      style={{
                        height: ITEM_HEIGHT,
                        fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                        color: style.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tour.city}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/50 transition-colors duration-300"
            >
              <ChevronDown className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Active date detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
                {active.date}
              </span>
              <h3 className="font-serif italic text-4xl md:text-6xl tracking-[-0.03em] text-foreground">
                {active.city}
                <span className="text-muted-foreground text-2xl md:text-3xl ml-3">{active.country}</span>
              </h3>
              <p className="font-mono text-sm text-muted-foreground tracking-[0.1em] uppercase">
                {active.venue}
              </p>
              <div className="mt-2">
                {active.status === "sold out" ? (
                  <span className="font-mono text-xs text-muted-foreground/50 tracking-[0.15em] uppercase">
                    Sold out
                  </span>
                ) : (
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-foreground border-b border-foreground/20 pb-1 hover:border-primary transition-colors duration-300"
                  >
                    Get tickets <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="font-mono text-[10px] text-muted-foreground/40 tracking-[0.15em] mt-2">
                {activeIndex + 1} / {tourDates.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TourSection;
