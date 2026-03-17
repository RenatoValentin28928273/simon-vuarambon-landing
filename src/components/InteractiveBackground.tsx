import { useEffect, useRef, useCallback } from "react";
import organicBg from "@/assets/organic-bg.png";

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = organicBg;
    imageRef.current = img;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;

      // Smooth mouse follow
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, 0.03);
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, 0.03);

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (!imageRef.current?.complete) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Parallax offset based on mouse
      const offsetX = (mx - 0.5) * 60;
      const offsetY = (my - 0.5) * 60;

      // Slow organic drift
      const driftX = Math.sin(t * 0.15) * 20;
      const driftY = Math.cos(t * 0.12) * 15;

      // Scale pulse
      const scalePulse = 1.15 + Math.sin(t * 0.2) * 0.05;

      const imgW = w * scalePulse;
      const imgH = h * scalePulse;
      const drawX = (w - imgW) / 2 + offsetX + driftX;
      const drawY = (h - imgH) / 2 + offsetY + driftY;

      // Draw main image
      ctx.globalAlpha = 0.85;
      ctx.drawImage(imageRef.current, drawX, drawY, imgW, imgH);

      // Draw a second layer, rotated slightly, for depth
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.translate(w / 2, h / 2);
      ctx.rotate(Math.sin(t * 0.08) * 0.04);
      ctx.scale(scalePulse * 1.1, scalePulse * 1.1);
      ctx.drawImage(imageRef.current, -w / 2 - offsetX * 0.5 + driftX * 0.7, -h / 2 - offsetY * 0.5 + driftY * 0.7, w, h);
      ctx.restore();

      // Radial glow following mouse
      const gradient = ctx.createRadialGradient(
        mx * w, my * h, 0,
        mx * w, my * h, w * 0.4
      );
      gradient.addColorStop(0, "rgba(217, 119, 6, 0.08)");
      gradient.addColorStop(0.5, "rgba(217, 119, 6, 0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    img.onload = () => {
      rafRef.current = requestAnimationFrame(animate);
    };
    if (img.complete) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform" }}
    />
  );
};

export default InteractiveBackground;
