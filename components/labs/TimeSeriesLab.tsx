'use client';
import { useEffect, useRef, useState } from 'react';

export default function TimeSeriesLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [phi, setPhi] = useState(0.7);
  const seriesRef = useRef<number[]>([]);

  function generate() {
    const s: number[] = [];
    let y = 0;
    for (let i = 0; i < 80; i++) { y = phi * y + (Math.random()-0.5)*0.8; s.push(y); }
    seriesRef.current = s;
  }

  useEffect(() => {
    generate();
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
    const s = seriesRef.current;
    if (!s.length) return;
    let mn = Infinity, mx = -Infinity;
    s.forEach(v => { if (v < mn) mn = v; if (v > mx) mx = v; });
    const range = Math.max(0.5, mx - mn);
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 2;
    ctx.beginPath();
    s.forEach((v, i) => { const px = (i/(s.length-1))*w, py = h - ((v-mn)/range)*h*0.9 - h*0.05; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
    ctx.stroke();
  }, [phi]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>φ <span className="val">{phi.toFixed(2)}</span></label><input type="range" className="lab-range" min="-0.9" max="0.95" step="0.05" value={phi} onChange={e => setPhi(+e.target.value)} /></div>
        <button className="lab-btn" onClick={() => { generate(); setPhi(p => p); }}>NEW SERIES</button>
      </div>
      <div className="lab-equation">y<sub>t</sub> = <span className="var">{phi.toFixed(2)}</span>·y<sub>t−1</sub> + ε<sub>t</sub></div>
    </>
  );
}
