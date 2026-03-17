const MarqueeSection = () => {
  const text = "Simon Vuarambon  ✦  Deep  ✦  Organic  ✦  Melodic  ✦  Bedrock  ✦  Shanti  ✦  ";

  return (
    <div className="py-12 border-y border-foreground/5 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="font-serif italic text-4xl md:text-6xl text-foreground/10 tracking-[-0.02em]">
          {text}{text}{text}
        </span>
      </div>
    </div>
  );
};

export default MarqueeSection;
