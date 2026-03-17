const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-foreground/5">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Simon Vuarambon
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          A study on organic textures
        </span>
      </div>
    </footer>
  );
};

export default Footer;
