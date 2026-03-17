import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import TourSection from "@/components/TourSection";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MarqueeSection from "@/components/MarqueeSection";
import PresskitSection from "@/components/PresskitSection";
import ContactSection from "@/components/ContactSection";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="grain-overlay">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <ScrollReveal>
        <TourSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <MarqueeSection />
      </ScrollReveal>
      <ScrollReveal>
        <MusicSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal>
        <GallerySection />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <MarqueeSection />
      </ScrollReveal>
      <ScrollReveal>
        <PresskitSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
