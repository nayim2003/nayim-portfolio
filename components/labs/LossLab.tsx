'use client';
import { useEffect, useRef, useState } from 'react';

export default function LossLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);

  const L = (x: number, y: number) => x*x + y*y + 0.5 * Math.sin(3*x) * Math.cos(3*y);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr; c.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = r.width, h = r.height;
    ctx.clearRect(0, 0, w, h);
    const step = 6;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const x = (px/w)*4 - 2, y = (py/h)*4 - 2;
        const loss = L(x, y);
        const t = Math.min(1, loss/8);
        const rr = Math.round(79 + (255-79)*t*0.5);
        const gg = Math.round(209 - 209*t*0.7);
        const bb = Math.round(197 - 197*t*0.5);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${0.15 + t*0.5})`;
        ctx.fillRect(px, py, step, step);
      }
    }
    const mx = ((w1+2)/4)*w, my = ((w2+2)/4)*h;
    ctx.fillStyle = '#4fd1c5';
    ctx.shadowColor = '#4fd1c5'; ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.arc(mx, my, 8, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
  }, [w1, w2]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>w₁ <span className="val">{w1.toFixed(1)}</span></label><input type="range" className="lab-range" min="-2" max="2" step="0.1" value={w1} onChange={e => setW1(+e.target.value)} /></div>
        <div className="lab-slider"><label>w₂ <span className="val">{w2.toFixed(1)}</span></label><input type="range" className="lab-range" min="-2" max="2" step="0.1" value={w2} onChange={e => setW2(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">L = w₁² + w₂² + 0.5·sin(3w₁)·cos(3w₂)</div>
    </>
  );
}
