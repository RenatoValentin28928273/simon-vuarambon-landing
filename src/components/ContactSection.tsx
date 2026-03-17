import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveBackground from "@/components/InteractiveBackground";
import AnimatedHeading from "@/components/AnimatedHeading";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/simonvuarambon/" },
  { name: "Facebook", url: "https://www.facebook.com/simonvuarambonmusic/" },
  { name: "SoundCloud", url: "https://soundcloud.com/simonvuarambon" },
  { name: "Spotify", url: "https://open.spotify.com/intl-pt/artist/2W3M7XIkEKENCT1LXJ6mdj" },
  { name: "Beatport", url: "https://www.beatport.com/pt/artist/simon-vuarambon/151290" },
  { name: "Resident Advisor", url: "https://pt-br.ra.co/dj/simonvuarambon" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [15, -20]);
  const leftY = useTransform(scrollYProgress, [0, 1], [25, -12]);
  const rightY = useTransform(scrollYProgress, [0, 1], [12, -20]);

  return (
    <section ref={sectionRef} id="contact" className="relative py-[15vh] px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <InteractiveBackground />
      </div>
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: leftY }}
          >
            <motion.h2
              style={{ y: headingY }}
              className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground mb-10"
            >
              Contact
            </motion.h2>

            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Booking — South America
                </p>
                <a
                  href="mailto:diego@analog-a.com"
                  className="link-underline font-mono text-sm text-foreground"
                >
                  diego@analog-a.com
                </a>
                <p className="font-mono text-xs text-muted-foreground mt-1">Diego Romero — Analog-A</p>
              </div>

              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Booking — North America
                </p>
                <a
                  href="mailto:p@slaytoncreative.com"
                  className="link-underline font-mono text-sm text-foreground"
                >
                  p@slaytoncreative.com
                </a>
                <p className="font-mono text-xs text-muted-foreground mt-1">Slayton Creative</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: rightY }}
            className="flex flex-col justify-end"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Connections
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 py-2"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
