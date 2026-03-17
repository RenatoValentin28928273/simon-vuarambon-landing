const SmokeBackground = () => (
  <div
    aria-hidden
    className="absolute inset-0 overflow-hidden pointer-events-none select-none"
  >
    <div className="smoke-blob smoke-a" />
    <div className="smoke-blob smoke-b" />
    <div className="smoke-blob smoke-c" />
    <div className="smoke-blob smoke-d" />
    <div className="smoke-blob smoke-e" />
  </div>
);

export default SmokeBackground;
