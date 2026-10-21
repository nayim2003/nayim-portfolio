'use client';
import { useEffect, useRef, useState } from 'react';

export default function GradientDescentLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [lr, setLr] = useState(0.05);
  const [w, setW] = useState(-1.5);
  const wRef = useRef(-1.5);
  const rafRef = useRef(0);
  const [loss, setLoss] = useState(6);

  const L = (x: number) => (x - 1) ** 2 + 0.5;
  const gL = (x: number) => 2 * (x - 1);

  function draw() {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr; c.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = r.width, H = r.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, H/5*i); ctx.lineTo(W, H/5*i); ctx.stroke(); }
    const xToPx = (x: number) => ((x + 2.5) / 5) * W;
    const yToPy = (y: number) => H - Math.min(1, y / 12) * H;
    ctx.strokeStyle = '#6b9eff'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const x = -2.5 + (i/120)*5;
      const px = xToPx(x), py = yToPy(L(x));
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    const bx = xToPx(wRef.current), by = yToPy(L(wRef.current));
    ctx.fillStyle = '#4fd1c5';
    ctx.shadowColor = '#4fd1c5'; ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }

  function step() {
    wRef.current -= lr * gL(wRef.current);
    if (Math.abs(gL(wRef.current)) < 0.01) wRef.current = 1;
    setW(wRef.current);
    setLoss(L(wRef.current));
    draw();
    if (Math.abs(wRef.current - 1) > 0.005) rafRef.current = requestAnimationFrame(step);
    else setTimeout(() => { if (Math.abs(wRef.current - 1) <= 0.005) { wRef.current = -1.5; setW(-1.5); setLoss(L(-1.5)); draw(); rafRef.current = requestAnimationFrame(step); } }, 800);
  }

  useEffect(() => {
    draw();
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [lr]);

  function reset() { wRef.current = -1.5; setW(-1.5); setLoss(L(-1.5)); draw(); cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(step); }

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Learning rate <span className="val">{lr.toFixed(2)}</span></label><input type="range" className="lab-range" min="0.01" max="0.3" step="0.01" value={lr} onChange={e => setLr(+e.target.value)} /></div>
        <button className="lab-btn" onClick={reset}>RESET</button>
      </div>
      <div className="lab-equation">w<sub>t+1</sub> = w<sub>t</sub> − <span className="var">{lr.toFixed(2)}</span>∇L | L = <span className="var">{loss.toFixed(3)}</span></div>
    </>
  );
}
