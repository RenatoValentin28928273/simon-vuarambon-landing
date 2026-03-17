import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Music2, X } from "lucide-react";

const SOUNDCLOUD_URL =
  "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/simonvuarambon/transitions2026" +
  "&color=%23D97706&auto_play=true&hide_related=true&show_comments=false" +
  "&show_user=false&show_reposts=false&show_teaser=false&visual=false";

const WaveBar = ({ delay }: { delay: number }) => (
  <motion.span
    className="inline-block w-0.5 bg-primary rounded-full"
    animate={{ height: ["4px", "14px", "4px"] }}
    transition={{ duration: 0.8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const MiniPlayer = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show the player bar after 1.5 s (enough time for the page to settle)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998]"
        >
          {/* Expanded SoundCloud embed */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 166, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-foreground/10 bg-background"
              >
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={SOUNDCLOUD_URL}
                  title="SoundCloud Player"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact bar */}
          <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-background/90 backdrop-blur-md border-t border-foreground/10">
            {/* Left: icon + track info + waveform */}
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-3 group min-w-0 flex-1"
            >
              <div className="w-7 h-7 flex items-center justify-center border border-foreground/10 rounded-sm group-hover:border-primary/40 transition-colors duration-300 shrink-0">
                <Music2 className="w-3.5 h-3.5 text-primary" />
              </div>

              {/* Waveform */}
              <div className="flex items-end gap-[2px] h-4 shrink-0">
                <WaveBar delay={0} />
                <WaveBar delay={0.15} />
                <WaveBar delay={0.3} />
                <WaveBar delay={0.45} />
                <WaveBar delay={0.6} />
              </div>

              <div className="min-w-0 text-left">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary truncate">
                  Now Playing
                </p>
                <p className="font-mono text-[11px] text-muted-foreground truncate">
                  Guest Mix — Transitions · John Digweed
                </p>
              </div>
            </button>

            {/* Right: expand toggle + dismiss */}
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="w-7 h-7 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/40 transition-colors duration-300"
                aria-label={expanded ? "Collapse player" : "Expand player"}
              >
                <motion.div animate={{ rotate: expanded ? 0 : 180 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.div>
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="w-7 h-7 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-foreground/30 transition-colors duration-300"
                aria-label="Close player"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;
