'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import type { HealthZone } from '@/lib/portfolio';

interface ECGConfig {
  bpm: number;
  waveform: number[]; // Y values normalized 0..1 (0.5 = baseline)
  amplitude: number;  // multiplier for peak height
}

const ECG_CONFIGS: Record<HealthZone, ECGConfig> = {
  safe: {
    bpm: 60,
    amplitude: 0.6,
    waveform: [
      0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
      0.45, 0.4, 0.45, 0.5,
      0.5, 0.55, 0.3, 0.05, 0.7, 0.5,
      0.5, 0.45, 0.35, 0.4, 0.5,
      0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
    ],
  },
  attention: {
    bpm: 90,
    amplitude: 0.8,
    waveform: [
      0.5, 0.5, 0.5, 0.5,
      0.42, 0.35, 0.42, 0.5,
      0.55, 0.65, 0.2, 0.02, 0.75, 0.5,
      0.48, 0.38, 0.3, 0.38, 0.5,
      0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
    ],
  },
  danger: {
    bpm: 130,
    amplitude: 1.0,
    waveform: [
      0.5, 0.5, 0.5,
      0.4, 0.28, 0.4, 0.5,
      0.6, 0.75, 0.1, 0.0, 0.85, 0.45,
      0.42, 0.3, 0.2, 0.35, 0.5,
      0.5, 0.52, 0.48, 0.5, 0.5,
    ],
  },
};

const ECG_HEIGHT = 80;

interface UseECGResult {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasWidth: number;
}

export function useECGAnimation(
  status: HealthZone,
): UseECGResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number>(0);
  const cursorRef = useRef(0);
  const [canvasWidth, setCanvasWidth] = useState(320);

  // Measure container width with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const w = container.clientWidth;
      if (w > 0) setCanvasWidth(w);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Scale canvas for DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = ECG_HEIGHT * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, [canvasWidth]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvasWidth;
    const height = ECG_HEIGHT;
    const config = ECG_CONFIGS[status];
    const pixelsPerSecond = width / 4;
    const pixelsPerBeat = (pixelsPerSecond * 60) / config.bpm;
    const speed = pixelsPerSecond / 60;

    cursorRef.current = (cursorRef.current + speed) % width;
    const cursor = cursorRef.current;

    const clearWidth = 30;
    ctx.clearRect(cursor, 0, clearWidth, height);

    // Grid
    ctx.strokeStyle = 'rgba(163, 102, 255, 0.08)';
    ctx.lineWidth = 0.5;
    const gridSize = 20;
    for (let gx = cursor; gx < cursor + speed + 1; gx += gridSize) {
      const snapped = Math.round(gx / gridSize) * gridSize;
      if (snapped >= cursor && snapped <= cursor + speed + 1) {
        ctx.beginPath();
        ctx.moveTo(snapped, 0);
        ctx.lineTo(snapped, height);
        ctx.stroke();
      }
    }
    for (let gy = 0; gy < height; gy += gridSize) {
      ctx.beginPath();
      ctx.moveTo(cursor, gy);
      ctx.lineTo(cursor + speed + 1, gy);
      ctx.stroke();
    }

    // ECG trace
    const wf = config.waveform;
    const beatProgress = (cursor % pixelsPerBeat) / pixelsPerBeat;
    const wfIndex = beatProgress * wf.length;
    const idx = Math.floor(wfIndex);
    const frac = wfIndex - idx;

    const v0 = wf[idx % wf.length];
    const v1 = wf[(idx + 1) % wf.length];
    const value = v0 + (v1 - v0) * frac;

    const margin = 10;
    const drawHeight = height - margin * 2;
    const y = margin + value * drawHeight * config.amplitude
      + (1 - config.amplitude) * drawHeight * 0.5;

    const colors: Record<HealthZone, string> = {
      safe: '#2ED88A',
      attention: '#F5A623',
      danger: '#FF4D6A',
    };

    ctx.strokeStyle = colors[status];
    ctx.lineWidth = 2;
    ctx.shadowColor = colors[status];
    ctx.shadowBlur = 8;

    const prevCursor = cursor - speed;
    if (prevCursor >= 0) {
      const prevBeatProgress = (prevCursor % pixelsPerBeat) / pixelsPerBeat;
      const prevWfIndex = prevBeatProgress * wf.length;
      const prevIdx = Math.floor(prevWfIndex);
      const prevFrac = prevWfIndex - prevIdx;
      const pv0 = wf[prevIdx % wf.length];
      const pv1 = wf[(prevIdx + 1) % wf.length];
      const prevValue = pv0 + (pv1 - pv0) * prevFrac;
      const prevY = margin + prevValue * drawHeight * config.amplitude
        + (1 - config.amplitude) * drawHeight * 0.5;

      ctx.beginPath();
      ctx.moveTo(prevCursor, prevY);
      ctx.lineTo(cursor, y);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    animRef.current = requestAnimationFrame(draw);
  }, [status, canvasWidth]);

  useEffect(() => {
    cursorRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasWidth, ECG_HEIGHT);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, canvasWidth]);

  return { canvasRef, containerRef, canvasWidth };
}
