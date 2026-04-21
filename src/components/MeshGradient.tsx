'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  /* --- simplex noise --- */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* --- fractal brownian motion --- */
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  /* --- star field --- */
  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  vec3 starField(vec2 uv) {
    vec3 col = vec3(0.0);
    for (int layer = 0; layer < 3; layer++) {
      float scale = 80.0 + float(layer) * 70.0;
      float baseBright = 0.7 - float(layer) * 0.12;
      vec2 grid = floor(uv * scale);
      vec2 f = fract(uv * scale);
      float r = hash21(grid + float(layer) * 137.0);
      if (r > 0.91) {
        vec2 sPos = vec2(hash21(grid + 1.0), hash21(grid + 2.0));
        float d = length(f - sPos);
        float starSize = 0.008 + hash21(grid + 7.0) * 0.016;
        float twinkle = sin(u_time * (hash21(grid + 3.0) * 1.5 + 0.3) + r * 6.28) * 0.35 + 0.65;
        float star = smoothstep(starSize, 0.0, d) * baseBright * twinkle;
        float warmth = hash21(grid + 5.0);
        vec3 sColor = mix(vec3(0.80, 0.82, 0.95), vec3(1.0, 0.83, 0.5), warmth * 0.35);
        col += sColor * star;
      }
    }
    return col;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    float t = u_time * 0.06;

    /* palette — nebula colors bright enough to actually see */
    vec3 voidBg  = vec3(0.027, 0.020, 0.055);   /* #07050E */
    vec3 nebPlum = vec3(0.35, 0.12, 0.55);       /* visible deep purple */
    vec3 nebTeal = vec3(0.08, 0.28, 0.45);       /* visible deep teal */
    vec3 orchid  = vec3(0.639, 0.400, 1.0);       /* #A366FF */
    vec3 rose    = vec3(1.0, 0.420, 0.616);       /* #FF6B9D */

    /* === mouse: warp the mesh itself === */

    /* gravitational pull — mesh flows toward cursor */
    vec2 toMouse = u_mouse - uv;
    float mouseDist = length(toMouse);
    float pull = smoothstep(0.8, 0.0, mouseDist) * 0.35;
    vec2 meshWarp = toMouse * pull;

    /* global parallax — mouse shifts entire noise field */
    vec2 mouseShift = (u_mouse - 0.5) * 0.5;

    /* === organic warp: autonomous + mouse-driven === */
    vec2 warpUV = uv + meshWarp;
    vec2 warp = vec2(
      fbm(warpUV * 1.5 + vec2(t * 0.5, t * 0.2) + mouseShift * 0.5),
      fbm(warpUV * 1.5 + vec2(t * 0.25, t * 0.45) + 5.0 + mouseShift * 0.4)
    );
    vec2 warped = warpUV + warp * 0.22;

    /* nebula layers */
    float n1 = smoothstep(-0.2, 0.5, fbm(warped * 1.8 + vec2(t * 0.15, -t * 0.1)));
    float n2 = smoothstep(-0.2, 0.5, fbm(warped * 1.5 + vec2(-t * 0.12, t * 0.2) + 10.0));
    float n3 = smoothstep(-0.1, 0.55, fbm(warped * 2.0 + vec2(t * 0.08, t * 0.18) + 20.0));
    float n4 = smoothstep(-0.05, 0.6, fbm(warped * 1.8 + vec2(t * 0.1, -t * 0.08) + 35.0));

    /* compose: void -> nebula clouds -> color accents */
    vec3 color = voidBg;
    color = mix(color, nebPlum, n1 * 0.18);
    color = mix(color, nebTeal, n2 * 0.15);
    color = mix(color, orchid * 0.3, n3 * 0.10);
    color = mix(color, rose * 0.25, n4 * 0.07);

    /* iridescence — plum<->teal color shift */
    float irid = fbm(warped * 3.0 + t * 0.08 + mouseShift * 0.3);
    vec3 iridColor = mix(nebPlum, nebTeal, irid * 0.5 + 0.5);
    color = mix(color, iridColor, 0.06);

    /* stars — drift with the mesh */
    vec2 starUV = uv;
    starUV.x /= aspect;
    starUV = starUV + meshWarp * 0.4 + mouseShift * 0.1;
    color += starField(starUV);

    /* vignette — softer, portal feel */
    float vig = 1.0 - smoothstep(0.25, 0.95, length(uv - 0.5) * 1.3);
    color *= mix(0.45, 1.0, vig);

    /* fine grain */
    float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.01;
    color += grain;

    gl_FragColor = vec4(max(color, 0.0), 1.0);
  }
`;

export default function MeshGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseXRef = useRef(0.5);
  const mouseYRef = useRef(0.5);
  const targetXRef = useRef(0.5);
  const targetYRef = useRef(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type)!;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    /* fullscreen quad */
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const scale = dpr > 1 ? 0.5 : 0.75;
      canvas!.width = canvas!.clientWidth * dpr * scale;
      canvas!.height = canvas!.clientHeight * dpr * scale;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function onMouseMove(e: MouseEvent) {
      targetXRef.current = e.clientX / window.innerWidth;
      targetYRef.current = 1.0 - e.clientY / window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    const startTime = performance.now();

    function render() {
      const elapsed = (performance.now() - startTime) / 1000;

      /* smooth mouse lerp */
      mouseXRef.current += (targetXRef.current - mouseXRef.current) * 0.08;
      mouseYRef.current += (targetYRef.current - mouseYRef.current) * 0.08;

      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uMouse, mouseXRef.current, mouseYRef.current);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
