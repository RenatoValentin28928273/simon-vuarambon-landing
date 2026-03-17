import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import releaseCover from "@/assets/release-cover.jpg";
import InteractiveBackground from "@/components/InteractiveBackground";
import AnimatedHeading from "@/components/AnimatedHeading";

const releases = [
  { title: "The Night Mail (Simon Vuarambon Remix)", artist: "New Jackson", label: "Bedrock Records", year: "2026" },
  { title: "Guest Mix — Transitions", artist: "John Digweed", label: "Transitions", year: "2026" },
  { title: "Open to Close — Live at Dahaus", artist: "Simon Vuarambon", label: "Palacio Alsina", year: "2026" },
];

const platforms = [
  { name: "Spotify", url: "https://open.spotify.com/intl-pt/artist/2W3M7XIkEKENCT1LXJ6mdj" },
  { name: "Apple Music", url: "https://music.apple.com/br/artist/simon-vuarambon/476557687" },
  { name: "YouTube Music", url: "https://music.youtube.com/channel/UCoIgKB5Tjq7wmWD335ySL2A" },
  { name: "SoundCloud", url: "https://soundcloud.com/simonvuarambon" },
  { name: "Beatport", url: "https://www.beatport.com/pt/artist/simon-vuarambon/151290" },
];

const MusicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const coverY = useTransform(scrollYProgress, [0, 1], [35, -25]);
  const headingY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const listY = useTransform(scrollYProgress, [0, 1], [15, -10]);

  return (
    <section ref={sectionRef} id="music" className="relative py-[15vh] px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <InteractiveBackground />
      </div>
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: featured release with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: coverY }}
          >
            <div className="aspect-square overflow-hidden mb-8">
              <motion.img
                src={releaseCover}
                alt="Latest Release"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2">
              Latest Release — 2026
            </p>
            <h3 className="font-serif italic text-2xl md:text-3xl text-foreground">
              The Night Mail
            </h3>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              Simon Vuarambon Remix · Bedrock Records
            </p>

            {/* Platforms */}
            <div className="flex flex-wrap gap-4 mt-8">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: releases list */}
          <div className="flex flex-col justify-end">
            <AnimatedHeading
              text="Music"
              className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground mb-12"
            />

            <motion.div style={{ y: listY }}>
              {releases.map((release, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start justify-between py-6 border-b border-foreground/5"
                >
                  <div>
                    <h4 className="font-serif italic text-lg text-foreground group-hover:text-primary transition-colors duration-500">
                      {release.title}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      {release.artist} · {release.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {release.year}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Embedded SoundCloud */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-12 glass-card rounded-sm overflow-hidden"
            >
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/simonvuarambon/transitions2026&color=%23D97706&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                title="SoundCloud Player"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
