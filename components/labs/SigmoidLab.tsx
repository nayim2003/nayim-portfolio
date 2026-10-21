'use client';
import { useEffect, useRef, useState } from 'react';

export default function SigmoidLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [gain, setGain] = useState(1);
  const [bias, setBias] = useState(0);

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
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = -5 + (i/100)*10;
      const y = 1 / (1 + Math.exp(-gain*(x-bias)));
      const px = ((x+5)/10)*w, py = h - y*h;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [gain, bias]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Gain (k) <span className="val">{gain.toFixed(1)}</span></label><input type="range" className="lab-range" min="0.2" max="4" step="0.1" value={gain} onChange={e => setGain(+e.target.value)} /></div>
        <div className="lab-slider"><label>Bias (b) <span className="val">{bias.toFixed(1)}</span></label><input type="range" className="lab-range" min="-4" max="4" step="0.2" value={bias} onChange={e => setBias(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">σ(x) = 1 / (1 + e^(−{gain.toFixed(1)}(x − {bias.toFixed(1)})))</div>
    </>
  );
}
