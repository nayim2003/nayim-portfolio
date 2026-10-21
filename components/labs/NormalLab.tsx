'use client';
import { useEffect, useRef, useState } from 'react';

export default function NormalLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mu, setMu] = useState(0);
  const [sig, setSig] = useState(1);

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
    for (let i = 0; i <= 200; i++) {
      const x = -6 + (i/200)*12;
      const y = (1 / (sig * Math.sqrt(2*Math.PI))) * Math.exp(-((x-mu)**2) / (2*sig*sig));
      const px = ((x+6)/12)*w, py = h - Math.min(1, y/1.4)*h;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [mu, sig]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Mean (μ) <span className="val">{mu.toFixed(1)}</span></label><input type="range" className="lab-range" min="-3" max="3" step="0.1" value={mu} onChange={e => setMu(+e.target.value)} /></div>
        <div className="lab-slider"><label>Std (σ) <span className="val">{sig.toFixed(1)}</span></label><input type="range" className="lab-range" min="0.3" max="2.5" step="0.1" value={sig} onChange={e => setSig(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">f(x) = 1/(<span className="var">{sig.toFixed(1)}</span>√(2π)) · e^(−(x−<span className="var">{mu.toFixed(1)}</span>)²/2<span className="var">{sig.toFixed(1)}</span>²)</div>
    </>
  );
}
