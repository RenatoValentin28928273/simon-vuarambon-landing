import { motion } from "framer-motion";
import { Download, FileText, Image, Music } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";
import portrait from "@/assets/simon-portrait.jpg";

const presskitItems = [
  {
    icon: FileText,
    title: "Bio",
    description: "Biografia completa em inglês e espanhol, pronta para publicação.",
    filename: "Simon_Vuarambon_Bio.pdf",
  },
  {
    icon: Image,
    title: "Fotos em Alta Resolução",
    description: "Pack com fotos profissionais em alta resolução para uso editorial.",
    filename: "Simon_Vuarambon_Photos_HiRes.zip",
  },
  {
    icon: Music,
    title: "Rider Técnico",
    description: "Especificações técnicas de áudio, setup de DJ e requisitos de palco.",
    filename: "Simon_Vuarambon_Technical_Rider.pdf",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const PresskitSection = () => {
  const handleDownload = (filename: string) => {
    // In a production scenario these would link to real files.
    // For now we show an alert indicating the download intent.
    const message = `O download de "${filename}" estará disponível em breve. Entre em contato via booking para solicitar o presskit completo.`;
    alert(message);
  };

  return (
    <section id="presskit" className="py-[15vh] px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — header + photo grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedHeading
              text="Presskit"
              className="font-serif italic text-5xl md:text-7xl tracking-[-0.04em] text-foreground mb-6"
            />
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-12 max-w-sm">
              Material de imprensa, fotos em alta resolução e rider técnico disponíveis para download.
            </p>

            {/* Artist photo as background */}
            <div className="relative overflow-hidden aspect-[3/4] w-full max-w-sm">
              <motion.img
                src={portrait}
                alt="Simon Vuarambon — Press photo"
                className="w-full h-full object-cover grayscale"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right — download cards */}
          <div className="flex flex-col justify-center">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              {presskitItems.map((pk) => (
                <motion.button
                  key={pk.title}
                  variants={item}
                  onClick={() => handleDownload(pk.filename)}
                  className="group w-full text-left glass-card rounded-sm p-6 md:p-8 flex items-start gap-6 hover:border-primary/20 transition-all duration-500 cursor-pointer"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 rounded-sm group-hover:border-primary/40 group-hover:text-primary transition-colors duration-500">
                    <pk.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif italic text-lg text-foreground group-hover:text-primary transition-colors duration-500">
                      {pk.title}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1 leading-relaxed">
                      {pk.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50 mt-3 group-hover:text-primary/70 transition-colors duration-500">
                      <Download className="w-3 h-3" />
                      {pk.filename}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Full presskit CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-foreground/5"
            >
              <p className="font-mono text-xs text-muted-foreground mb-3">
                Precisa de material adicional ou personalizado?
              </p>
              <a
                href="mailto:diego@analog-a.com?subject=Presskit Request — Simon Vuarambon"
                className="link-underline font-mono text-xs tracking-[0.2em] uppercase text-foreground"
              >
                Solicitar Presskit Completo
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresskitSection;
