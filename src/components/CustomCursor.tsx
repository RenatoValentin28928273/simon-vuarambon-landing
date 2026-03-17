import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Add  data-cursor="LISTEN"  (or any label) to any element
 * to trigger the expanded cursor with that label.
 * Elements with data-cursor=""  expand the ring but show no text.
 */

const CustomCursor = () => {
  const [label, setLabel]   = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 800, damping: 60 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 60 });

  // Ring lags behind
  const ringX = useSpring(rawX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    // Only on pointer:fine (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onEnterDoc = () => setVisible(true);
    const onLeaveDoc = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        setLabel(el.dataset.cursor ?? "");
      } else {
        const interactive = (e.target as HTMLElement).closest("a, button") as HTMLElement | null;
        setLabel(interactive ? "" : null);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnterDoc);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnterDoc);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  const isExpanded = label !== null;

  if (!visible) return null;

  return (
    <>
      {/* Outer ring / expanded circle */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, border: "1px solid rgba(255,255,255,0.35)" }}
        animate={
          isExpanded
            ? { width: 88, height: 88, marginLeft: -44, marginTop: -44, background: "rgba(255,255,255,0.96)", borderColor: "transparent" }
            : { width: 36, height: 36, marginLeft: -18, marginTop: -18, background: "transparent", borderColor: "rgba(255,255,255,0.35)" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <AnimatePresence>
          {isExpanded && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[8px] tracking-[0.18em] uppercase text-background font-medium text-center leading-tight px-1"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        style={{ x: dotX, y: dotY, marginLeft: -3, marginTop: -3 }}
        animate={isExpanded ? { width: 0, height: 0, opacity: 0 } : { width: 6, height: 6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
