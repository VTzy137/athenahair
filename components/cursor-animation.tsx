"use client";

import { useEffect, useRef } from "react";

class Dot {
  baseX: number;
  baseY: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.baseX = x;
    this.baseY = y;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    const dx = mouseX - this.baseX;
    const dy = mouseY - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Magnetic repel effect
    const maxDistance = 350; // Radius of effect
    let force = 0;
    if (distance < maxDistance) {
      force = Math.pow((maxDistance - distance) / maxDistance, 2);
    }

    // Angle from mouse to dot
    let angle = Math.atan2(this.baseY - mouseY, this.baseX - mouseX);
    if (mouseX === -1000) angle = 0;
    
    // Displacement (push away from mouse)
    const push = force * 20; 
    const currentX = this.baseX + Math.cos(angle) * push;
    const currentY = this.baseY + Math.sin(angle) * push;

    // Line length and thickness
    // When far, length is equal to thickness (forms a dot)
    const length = 3 + force * 25; 
    const thickness = 3 + force * 1.5;

    const startX = currentX - Math.cos(angle) * (length / 2);
    const startY = currentY - Math.sin(angle) * (length / 2);
    const endX = currentX + Math.cos(angle) * (length / 2);
    const endY = currentY + Math.sin(angle) * (length / 2);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

export function CursorAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const spacing = 30; // Distance between dots

    const initDots = () => {
      dots = [];
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      const offsetX = (canvas.width - cols * spacing) / 2;
      const offsetY = (canvas.height - rows * spacing) / 2;

      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          const posX = offsetX + x * spacing;
          const posY = offsetY + y * spacing;
          
          // Color gradient from Top-Left (Blue) to Bottom-Right (Orange)
          const ratioX = posX / canvas.width;
          const ratioY = posY / canvas.height;
          const ratio = (ratioX + ratioY) / 2; 
          // 240 is Blue, 30 is Orange
          const hue = 240 - (ratio * 210); 
          const color = `hsl(${hue}, 80%, 60%)`;
          
          dots.push(new Dot(posX, posY, color));
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const dot of dots) {
        dot.draw(ctx, mouse.x, mouse.y);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
