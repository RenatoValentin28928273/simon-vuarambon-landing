import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/simon-portrait.jpg";
import InteractiveBackground from "@/components/InteractiveBackground";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section ref={sectionRef} id="about" className="relative py-[15vh] px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <InteractiveBackground />
      </div>
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src={portrait}
              alt="Simon Vuarambon"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

          {/* Text with parallax */}
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ y: headingY }}
              className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground mb-10"
            >
              About
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: textY }}
            >
              <div className="space-y-6 font-mono text-sm leading-relaxed text-muted-foreground">
                <p>
                  Simon Vuarambon is an Argentine DJ and producer whose sound lives at the 
                  intersection of deep, organic, and melodic house. With releases on labels 
                  like <span className="text-foreground">Bedrock Records</span>, <span className="text-foreground">Shanti Moscow Radio</span>, 
                  and <span className="text-foreground">Hope Recordings</span>, he has established 
                  himself as a distinctive voice in the progressive underground.
                </p>
                <p>
                  His sets are known for their immersive, journey-like quality — building tension 
                  through layered textures and organic grooves that speak to both body and mind. 
                  From the clubs of Buenos Aires to international stages, his craft remains rooted 
                  in the art of deep listening.
                </p>
                <p>
                  Featured on <span className="text-foreground">John Digweed's Transitions</span>, 
                  and a regular at venues across South America and Europe.
                </p>
              </div>

              {/* Labels */}
              <div className="flex flex-wrap gap-6 mt-12">
                {["Bedrock", "Shanti Moscow", "Hope Rec", "All Day I Dream"].map((label) => (
                  <span
                    key={label}
                    className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground/50"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
