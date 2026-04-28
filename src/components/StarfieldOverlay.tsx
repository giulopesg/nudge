'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * StarfieldOverlay — transparent canvas with procedural stars + dust clouds.
 * Sits on top of MeshGradient (z-0). Stars twinkle and brighten near cursor.
 */

const LERP = 0.08;

interface Star {
  x: number; y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  hue: number;
}

function makeStars(count: number): Star[] {
  const out: Star[] = [];
  for (let i = 0; i < count; i++) {
    const depth = Math.random();
    out.push({
      x: Math.random(), y: Math.random(),
      size: 0.2 + depth * 1.2 + (Math.random() > 0.98 ? 1.8 : 0),
      brightness: 0.15 + depth * 0.45,
      twinkleSpeed: 0.4 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
      depth,
      hue: Math.random(),
    });
  }
  return out;
}

interface DustCloud {
  x: number; y: number;
  radius: number;
  r: number; g: number; b: number;
  alpha: number;
  driftPhaseX: number; driftPhaseY: number;
  driftAmp: number;
  depth: number;
  breatheSpeed: number; breatheOffset: number;
}

function makeDust(count: number): DustCloud[] {
  const palette = [
    [107, 79, 160], [90, 60, 140], [130, 80, 200],
    [60, 45, 110], [0, 140, 120], [80, 50, 130],
  ];
  const out: DustCloud[] = [];
  for (let i = 0; i < count; i++) {
    const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
    out.push({
      x: Math.random(), y: Math.random(),
      radius: 120 + Math.random() * 280,
      r, g, b,
      alpha: 0.02 + Math.random() * 0.04,
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
      driftAmp: 30 + Math.random() * 60,
      depth: 0.2 + Math.random() * 0.6,
      breatheSpeed: 0.08 + Math.random() * 0.12,
      breatheOffset: Math.random() * Math.PI * 2,
    });
  }
  return out;
}

const STARS = makeStars(160);
const DUST = makeDust(14);

export default function StarfieldOverlay() {
  const rafRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useRef(0.5);
  const mouseY = useRef(0.5);
  const targetX = useRef(0.5);
  const targetY = useRef(0.5);
  const t0 = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    targetX.current = e.clientX / window.innerWidth;
    targetY.current = e.clientY / window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = '100%';
      canvas!.style.height = '100%';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    t0.current = performance.now();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    function animate() {
      const elapsed = (performance.now() - t0.current) / 1000;

      mouseX.current += (targetX.current - mouseX.current) * LERP;
      mouseY.current += (targetY.current - mouseY.current) * LERP;

      const mx = mouseX.current - 0.5;
      const my = mouseY.current - 0.5;
      const driftX = Math.sin(elapsed * 0.03) * 15;
      const driftY = Math.cos(elapsed * 0.02) * 10;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      // ── Dust clouds ──
      for (const cloud of DUST) {
        const p = cloud.depth * 0.5;
        const cx = cloud.x * w
          + Math.sin(elapsed * 0.04 + cloud.driftPhaseX) * cloud.driftAmp
          + mx * -p * 80;
        const cy = cloud.y * h
          + Math.cos(elapsed * 0.03 + cloud.driftPhaseY) * cloud.driftAmp * 0.7
          + my * -p * 60;

        const breathe = 1 + Math.sin(
          elapsed * cloud.breatheSpeed + cloud.breatheOffset
        ) * 0.25;
        const r = cloud.radius * breathe;
        const a = cloud.alpha * (0.8 + Math.sin(
          elapsed * cloud.breatheSpeed * 0.7 + cloud.breatheOffset
        ) * 0.2);

        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${cloud.r},${cloud.g},${cloud.b},${a})`);
        grad.addColorStop(0.4, `rgba(${cloud.r},${cloud.g},${cloud.b},${a * 0.5})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.fillStyle = grad;
        ctx!.fillRect(cx - r, cy - r, r * 2, r * 2);
      }

      // ── Stars ──
      const breatheStar = 0.7 + Math.sin(elapsed * 0.12) * 0.15;
      const cursorX = mouseX.current * w;
      const cursorY = mouseY.current * h;

      for (const star of STARS) {
        const parallax = star.depth * 0.6 + 0.1;
        const sx = star.x * w + mx * -parallax * 100 + driftX * parallax;
        const sy = star.y * h + my * -parallax * 75 + driftY * parallax;

        const twinkle = Math.sin(
          elapsed * star.twinkleSpeed + star.twinkleOffset
        ) * 0.45 + 0.55;
        const alpha = star.brightness * twinkle * breatheStar;

        const dist = Math.hypot(sx - cursorX, sy - cursorY);
        const proximity = Math.max(0, 1 - dist / 200);
        const glow = 1 + proximity * 2;

        const r = Math.round(180 + star.hue * 55);
        const g = Math.round(170 + star.hue * 30 - (1 - star.hue) * 40);
        const b = Math.round(210 + (1 - star.hue) * 40);

        const fa = Math.min(0.85, alpha * glow);
        const fs = star.size * glow;

        if (fs > 1 || proximity > 0.2) {
          const gr = fs * 3.5;
          const grad = ctx!.createRadialGradient(sx, sy, 0, sx, sy, gr);
          grad.addColorStop(0, `rgba(${r},${g},${b},${fa * 0.2})`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${fa * 0.04})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx!.fillStyle = grad;
          ctx!.fillRect(sx - gr, sy - gr, gr * 2, gr * 2);
        }

        ctx!.beginPath();
        ctx!.arc(sx, sy, Math.max(0.2, fs * 0.4), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${fa})`;
        ctx!.fill();

        if (star.size > 2.2 && fa > 0.4) {
          ctx!.strokeStyle = `rgba(${r},${g},${b},${fa * 0.15})`;
          ctx!.lineWidth = 0.4;
          const sl = fs * 5;
          ctx!.beginPath();
          ctx!.moveTo(sx - sl, sy); ctx!.lineTo(sx + sl, sy);
          ctx!.moveTo(sx, sy - sl); ctx!.lineTo(sx, sy + sl);
          ctx!.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
