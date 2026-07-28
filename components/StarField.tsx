"use client";

import { useEffect, useRef } from "react";

const CFG = {
  density: 3500,
  minRadius: 0.5,
  maxRadius: 2.0,
  minAlpha: 0.3,
  maxAlpha: 0.9,
  minSpeed: 0.05,
  maxSpeed: 0.2,
  twinkleSpeed: 0.002,
  influenceRadius: 150,
  attractStrength: 0.055,
  returnStrength: 0.03,
  constellDist: 100,
  warmThreshold: 40,
} as const;

interface Star {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  twinklePhase: number;
  attracted: boolean;
}

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function makeStar(x: number, y: number): Star {
  const speed = rand(CFG.minSpeed, CFG.maxSpeed);
  const angle = Math.random() * Math.PI * 2;
  return {
    x,
    y,
    ox: x,
    oy: y,
    r: rand(CFG.minRadius, CFG.maxRadius),
    baseAlpha: rand(CFG.minAlpha, CFG.maxAlpha),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    twinklePhase: Math.random() * Math.PI * 2,
    attracted: false,
  };
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let stars: Star[] = [];
    let dpr = 1;
    let W = 0;
    let H = 0;
    let rafId = 0;
    let frame = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    /* ── Init / resize ── */
    function resize(hard: boolean) {
      dpr = window.devicePixelRatio || 1;
      const oldW = W,
        oldH = H;
      W = window.innerWidth;
      H = window.innerHeight;

      if (canvas) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
      }
      ctx.scale(dpr, dpr);

      const newCount = Math.round((W * H) / CFG.density);

      if (hard || stars.length === 0) {
        stars = Array.from({ length: newCount }, () =>
          makeStar(rand(0, W), rand(0, H)),
        );
      } else {
        stars = stars.map((s) => ({
          ...s,
          x: (s.x / oldW) * W,
          y: (s.y / oldH) * H,
          ox: (s.ox / oldW) * W,
          oy: (s.oy / oldH) * H,
        }));
        while (stars.length < newCount)
          stars.push(makeStar(rand(0, W), rand(0, H)));
        if (stars.length > newCount) stars.length = newCount;
      }
    }

    /* ── Draw loop ── */
    function draw() {
      rafId = requestAnimationFrame(draw);
      frame++;

      ctx.clearRect(0, 0, W, H);

      const nearCursor: { s: Star; dist: number; t: number }[] = [];
      const IR2 = CFG.influenceRadius * CFG.influenceRadius;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        /* Idle drift */
        s.ox += s.vx;
        s.oy += s.vy;
        if (s.ox < -2) s.ox = W + 2;
        if (s.ox > W + 2) s.ox = -2;
        if (s.oy < -2) s.oy = H + 2;
        if (s.oy > H + 2) s.oy = -2;

        /* Mouse influence */
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist2 = dx * dx + dy * dy;
        const dist = Math.sqrt(dist2);

        let displayR = s.r;
        let displayAlpha = s.baseAlpha;

        if (mouse.active && dist2 < IR2) {
          const t = 1 - dist / CFG.influenceRadius;
          s.x += (mouse.x + dx * -0.2 - s.x) * CFG.attractStrength * t;
          s.y += (mouse.y + dy * -0.2 - s.y) * CFG.attractStrength * t;

          displayR = lerp(s.r, s.r * 3.5, t);
          displayAlpha = clamp(lerp(s.baseAlpha, 1.0, t), 0, 1);

          nearCursor.push({ s, dist, t });
          s.attracted = true;
        } else {
          s.x = lerp(s.x, s.ox, CFG.returnStrength);
          s.y = lerp(s.y, s.oy, CFG.returnStrength);
          s.attracted = false;
        }

        /* Twinkle */
        if (!s.attracted) {
          const tw = Math.sin(
            s.twinklePhase + frame * CFG.twinkleSpeed * (1 + s.r),
          );
          displayAlpha = clamp(s.baseAlpha + tw * 0.15, 0.1, 1);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, displayR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${displayAlpha})`;
        ctx.fill();
      }
    }

    /* ── Events ── */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    const onResize = () => resize(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    resize(true);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
        background: "#000",
      }}
    />
  );
}
