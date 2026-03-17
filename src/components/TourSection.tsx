import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const tourDates = [
  { date: "MAR 28", city: "Buenos Aires, AR", venue: "Dahaus, Palacio Alsina", status: "tickets" },
  { date: "APR 05", city: "São Paulo, BR", venue: "D-Edge", status: "tickets" },
  { date: "APR 12", city: "Bogotá, CO", venue: "Baum Festival", status: "tickets" },
  { date: "MAY 03", city: "Berlin, DE", venue: "Watergate", status: "tickets" },
  { date: "MAY 17", city: "London, UK", venue: "Fabric", status: "sold out" },
  { date: "JUN 07", city: "Ibiza, ES", venue: "Pacha", status: "tickets" },
  { date: "JUL 19", city: "Córdoba, AR", venue: "Club Paraguay", status: "tickets" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const TourSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [20, -25]);
  const listY = useTransform(scrollYProgress, [0, 1], [10, -8]);

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
          <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">
            2026
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: listY }}
        >
          {tourDates.map((tour, i) => (
            <motion.a
              key={i}
              href="#"
              variants={item}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between py-6 md:py-8 border-b border-foreground/5 cursor-pointer group"
            >
              <span className="font-mono text-xs md:text-sm text-muted-foreground w-20 md:w-24 tabular-nums">
                {tour.date}
              </span>
              <h3 className="font-serif italic text-lg md:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 flex-1 ml-4 md:ml-8">
                {tour.city}
              </h3>
              <span className="hidden md:block font-mono text-xs text-muted-foreground tracking-[0.1em] uppercase flex-1 text-right">
                {tour.venue}
              </span>
              <div className="flex items-center gap-3 ml-4 md:ml-8">
                {tour.status === "sold out" ? (
                  <span className="font-mono text-xs text-muted-foreground/50 tracking-[0.1em] uppercase">
                    Sold out
                  </span>
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TourSection;
