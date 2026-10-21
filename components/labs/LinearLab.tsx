'use client';
import { useEffect, useRef, useState } from 'react';

export default function LinearLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const dataRef = useRef<any[]>([]);

  useEffect(() => {
    const d = [];
    for (let i = 0; i < 22; i++) {
      const x = i / 21;
      d.push({ x, y: 0.75 - 0.55 * x + (Math.random() - 0.5) * 0.28 });
    }
    dataRef.current = d;
  }, []);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr; c.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = r.width, h = r.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, h/5*i); ctx.lineTo(w, h/5*i); ctx.stroke(); }
    dataRef.current.forEach(d => { ctx.fillStyle = '#6b9eff'; ctx.beginPath(); ctx.arc(d.x*w, h-d.y*h, 3.5, 0, Math.PI*2); ctx.fill(); });
    ctx.strokeStyle = 'rgba(255,122,122,.4)'; ctx.lineWidth = 1;
    dataRef.current.forEach(d => { const px = d.x*w, py = h-d.y*h, ly = h-(slope*d.x+intercept)*h; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, ly); ctx.stroke(); });
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, h - intercept*h); ctx.lineTo(w, h - (slope+intercept)*h); ctx.stroke();
  }, [slope, intercept]);

  const mse = dataRef.current.reduce((s, d) => s + ((slope * d.x + intercept) - d.y) ** 2, 0) / Math.max(1, dataRef.current.length);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Slope (w) <span className="val">{slope.toFixed(2)}</span></label><input type="range" className="lab-range" min="-2" max="3" step="0.05" value={slope} onChange={e => setSlope(+e.target.value)} /></div>
        <div className="lab-slider"><label>Intercept (b) <span className="val">{intercept.toFixed(2)}</span></label><input type="range" className="lab-range" min="-2" max="3" step="0.05" value={intercept} onChange={e => setIntercept(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">ŷ = <span className="num">{slope.toFixed(2)}</span>·x + <span className="num">{intercept.toFixed(2)}</span> | MSE = <span className="var">{mse.toFixed(4)}</span></div>
    </>
  );
}
