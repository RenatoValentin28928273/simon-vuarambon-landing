import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import MiniPlayer from "@/components/MiniPlayer";
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
      <MiniPlayer />
      <HeroSection />
      <SectionDivider />
      <TourSection />
      <ScrollReveal speed={0.06}>
        <MarqueeSection />
      </ScrollReveal>
      <ScrollReveal speed={0.18}>
        <MusicSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal speed={0.14}>
        <AboutSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal speed={0.1}>
        <GallerySection />
      </ScrollReveal>
      <ScrollReveal speed={0.06}>
        <MarqueeSection />
      </ScrollReveal>
      <ScrollReveal speed={0.16}>
        <PresskitSection />
      </ScrollReveal>
      <SectionDivider />
      <ScrollReveal speed={0.13}>
        <ContactSection />
      </ScrollReveal>
      <ScrollReveal speed={0.08}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
