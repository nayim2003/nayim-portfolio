'use client';
import { useEffect, useRef, useState } from 'react';

export default function BiasVarianceLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [c, setC] = useState(3);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = r.width, h = r.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, h/5*i); ctx.lineTo(w, h/5*i); ctx.stroke(); }
    const xToPx = (x: number) => (x/10)*w;
    const yToPy = (y: number) => h - Math.min(1, y/20)*h;
    ctx.strokeStyle = '#6b9eff'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 50; i++) { const cx = 1 + (i/50)*9, b = 8/(cx+1); const px = xToPx(cx), py = yToPy(b*b); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = '#f472b6';
    ctx.beginPath();
    for (let i = 0; i <= 50; i++) { const cx = 1 + (i/50)*9, v = 0.6*cx; const px = xToPx(cx), py = yToPy(v); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.stroke();
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 50; i++) { const cx = 1 + (i/50)*9, b = 8/(cx+1), v = 0.6*cx; const px = xToPx(cx), py = yToPy(b*b+v); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.stroke();
  }, [c]);

  const bias2 = (8/(c+1))**2, vr = 0.6*c;

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Complexity <span className="val">{c}</span></label><input type="range" className="lab-range" min="1" max="10" step="1" value={c} onChange={e => setC(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">Bias² = <span className="var">{bias2.toFixed(3)}</span> | Var = <span className="var">{vr.toFixed(3)}</span> | MSE = <span className="num">{(bias2+vr).toFixed(3)}</span></div>
    </>
  );
}
