'use client';
import { useEffect, useRef, useState } from 'react';

export default function MonteCarloLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const ptsRef = useRef<{ x: number; y: number; inside: boolean }[]>([]);
  const rafRef = useRef(0);
  const [stats, setStats] = useState({ pi: 0, n: 0 });

  function loop() {
    if (!running) return;
    for (let k = 0; k < 25; k++) {
      const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
      ptsRef.current.push({ x, y, inside: x*x + y*y <= 1 });
    }
    if (ptsRef.current.length > 4000) ptsRef.current.splice(0, 1000);
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }

  function draw() {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr; c.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = r.width, h = r.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w/2, cy = h/2, rad = Math.min(w, h)/2 * 0.9;
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI*2); ctx.stroke();
    let inside = 0;
    ptsRef.current.forEach(p => {
      if (p.inside) inside++;
      ctx.fillStyle = p.inside ? '#4fd1c5' : 'rgba(255,122,122,.7)';
      ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(cx + p.x*rad, cy + p.y*rad, 1.5, 0, Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    const n = ptsRef.current.length;
    setStats({ pi: n > 0 ? (inside/n)*4 : 0, n });
  }

  useEffect(() => {
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <button className={`lab-btn ${running ? 'active' : ''}`} onClick={() => setRunning(r => !r)}>{running ? '▶ RUNNING' : '⏸ PAUSED'}</button>
        <button className="lab-btn" onClick={() => { ptsRef.current = []; draw(); }}>RESET</button>
      </div>
      <div className="lab-equation">π ≈ 4 · inside/total = <span className="var">{stats.pi.toFixed(4)}</span> | n = <span className="var">{stats.n}</span></div>
    </>
  );
}
