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

const Index = () => {
  return (
    <div className="grain-overlay">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <TourSection />
      <MarqueeSection />
      <MusicSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <GallerySection />
      <MarqueeSection />
      <PresskitSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
