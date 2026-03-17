import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
  aspect: "landscape" | "portrait";
  videoUrl?: string;
};

const media: MediaItem[] = [
  { type: "image", src: gallery1, alt: "DJ set at underground club", caption: "Live at Dahaus, Buenos Aires", aspect: "landscape" },
  { type: "video", src: gallery2, alt: "Festival performance", caption: "Baum Festival — Bogotá 2025", aspect: "landscape", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { type: "image", src: gallery3, alt: "CDJ close-up", caption: "Studio session detail", aspect: "portrait" },
  { type: "image", src: gallery4, alt: "Backstage portrait", caption: "Backstage — Watergate, Berlin", aspect: "portrait" },
  { type: "video", src: gallery5, alt: "Club atmosphere", caption: "Open to Close — Fabric, London", aspect: "landscape", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { type: "image", src: gallery6, alt: "Studio production", caption: "Studio — Buenos Aires", aspect: "landscape" },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [20, -25]);
  const gridY = useTransform(scrollYProgress, [0, 1], [15, -8]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: -1 | 1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((lightboxIndex + dir + media.length) % media.length);
    },
    [lightboxIndex]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    },
    [navigate]
  );

  return (
    <section ref={sectionRef} id="gallery" className="py-[15vh] px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ y: headingY }}
          className="flex items-baseline justify-between mb-16"
        >
          <AnimatedHeading
            text="Gallery"
            className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground"
          />
          <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">
            Photos & Videos
          </span>
        </motion.div>

        {/* Masonry-style grid with parallax */}
        <motion.div style={{ y: gridY }} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {media.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openLightbox(i)}
              className={`group relative overflow-hidden cursor-pointer ${
                item.aspect === "portrait" ? "row-span-2" : ""
              }`}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 flex flex-col items-center justify-center">
                {item.type === "video" && (
                  <div className="w-12 h-12 border border-foreground/30 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:border-primary/60 transition-all duration-500">
                    <Play className="w-5 h-5 text-foreground ml-0.5" />
                  </div>
                )}
                <span className="font-mono text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-3 tracking-[0.1em] uppercase px-4 text-center">
                  {item.caption}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            ref={(el) => el?.focus()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/40 transition-colors duration-300"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/40 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm hover:border-primary/40 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl max-h-[80vh] w-full mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {media[lightboxIndex].type === "video" && media[lightboxIndex].videoUrl ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={media[lightboxIndex].videoUrl}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={media[lightboxIndex].alt}
                  />
                </div>
              ) : (
                <img
                  src={media[lightboxIndex].src}
                  alt={media[lightboxIndex].alt}
                  className="max-h-[70vh] w-auto object-contain"
                />
              )}

              <div className="mt-6 text-center">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  {media[lightboxIndex].caption}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground/50 mt-1">
                  {lightboxIndex + 1} / {media.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
