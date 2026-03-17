import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TourSection from "@/components/TourSection";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import MarqueeSection from "@/components/MarqueeSection";
import PresskitSection from "@/components/PresskitSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="grain-overlay">
      <Navbar />
      <HeroSection />
      <TourSection />
      <MarqueeSection />
      <MusicSection />
      <AboutSection />
      <MarqueeSection />
      <PresskitSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
