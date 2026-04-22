'use client';

import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function BackgroundsGroup({ copyCode, copied }: Props) {
  return (
    <>
      {/* ── MeshGradient ───────────── */}
      <ComponentDoc
        id="comp-mesh-gradient"
        name="MeshGradient"
        description="WebGL canvas background with flowing procedural gradient animation. Lowest z-layer (z-0)."
        forDesigner="Full viewport canvas, fixed position, z-index 0. Colors: deep orchid, plum, dark void. Organic flowing motion via simplex noise + FBM (fractal Brownian motion). Subtle, never distracting."
        forDev="Canvas with WebGL2 context. Fragment shader uses simplex noise + FBM for animated gradient. Fixed inset-0 z-0 pointer-events-none. Performance: ~60fps, requestAnimationFrame loop."
        preview={
          <div className="w-full rounded-xl border border-surface-border overflow-hidden" style={{ height: 160 }}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 30% 50%, rgba(163,102,255,0.15), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,107,157,0.08), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(61,219,164,0.06), transparent 50%), var(--background)',
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-mono text-[10px] text-text-muted">WebGL Canvas — z-index: 0</p>
                  <p className="font-mono text-[9px] text-text-muted mt-1">Simplex noise + FBM shader</p>
                </div>
              </div>
            </div>
          </div>
        }
        code={`<canvas
  ref={canvasRef}
  className="fixed inset-0 z-0 pointer-events-none"
  style={{ width: '100vw', height: '100vh' }}
/>

/* WebGL2 fragment shader:
   - Simplex noise for organic flow
   - FBM (4 octaves) for detail
   - Colors: orchid (#A366FF), plum (#FF6B9D), void (#07050E)
   - Animated via uniform time variable
   - requestAnimationFrame loop for 60fps */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── StarfieldOverlay ───────── */}
      <ComponentDoc
        id="comp-starfield-overlay"
        name="StarfieldOverlay"
        description="Canvas-based particle system with twinkling stars and drifting dust clouds. z-index 1, above MeshGradient."
        forDesigner="Transparent canvas overlay. Stars: tiny white dots that twinkle (opacity animation). Dust clouds: larger soft circles that drift and breathe. Stars brighten near cursor position."
        forDev="Canvas 2D context. Two particle types: stars (small, twinkle) and dust (larger, soft circles). Mouse position tracked for proximity brightening. Fixed inset-0 z-[1] pointer-events-none."
        preview={
          <div className="w-full rounded-xl border border-surface-border overflow-hidden" style={{ height: 160, background: 'var(--background)' }}>
            <div className="relative w-full h-full">
              {/* Simulated stars */}
              {[
                { x: 20, y: 30, size: 2, opacity: 0.8 },
                { x: 45, y: 15, size: 1.5, opacity: 0.5 },
                { x: 70, y: 45, size: 2.5, opacity: 0.9 },
                { x: 15, y: 70, size: 1, opacity: 0.4 },
                { x: 85, y: 25, size: 2, opacity: 0.7 },
                { x: 55, y: 65, size: 1.5, opacity: 0.6 },
                { x: 30, y: 85, size: 2, opacity: 0.5 },
                { x: 90, y: 60, size: 1, opacity: 0.8 },
                { x: 10, y: 50, size: 2, opacity: 0.3 },
                { x: 60, y: 90, size: 1.5, opacity: 0.7 },
              ].map((star, i) => (
                <div key={i} className="absolute rounded-full animate-pulse-glow"
                  style={{
                    left: `${star.x}%`, top: `${star.y}%`,
                    width: star.size, height: star.size,
                    background: `rgba(255,248,240,${star.opacity})`,
                    boxShadow: `0 0 ${star.size * 2}px rgba(163,102,255,0.3)`,
                  }} />
              ))}
              {/* Simulated dust */}
              <div className="absolute rounded-full animate-float"
                style={{ left: '35%', top: '40%', width: 30, height: 30, background: 'radial-gradient(circle, rgba(163,102,255,0.06), transparent)' }} />
              <div className="absolute rounded-full animate-float"
                style={{ left: '65%', top: '60%', width: 40, height: 40, background: 'radial-gradient(circle, rgba(255,107,157,0.04), transparent)', animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[10px] text-text-muted">Canvas 2D — z-index: 1</p>
              </div>
            </div>
          </div>
        }
        code={`<canvas
  ref={canvasRef}
  className="fixed inset-0 z-[1] pointer-events-none"
  style={{ width: '100vw', height: '100vh' }}
/>

/* Canvas 2D particle system:
   - Stars: white dots, random opacity animation (twinkle)
   - Dust: soft radial gradient circles, drift + breathe
   - Mouse proximity: stars brighten within 150px radius
   - Performance: ~200 stars + ~20 dust clouds
   - requestAnimationFrame loop */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
