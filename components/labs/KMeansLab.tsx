'use client';
import { useEffect, useRef, useState } from 'react';

const COLORS = ['#4fd1c5', '#6b9eff', '#a78bfa', '#fbbf24', '#f472b6', '#ff7a7a'];

export default function KMeansLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [k, setK] = useState(3);
  const [running, setRunning] = useState(true);
  const stateRef = useRef<{ pts: any[]; cents: any[] }>({ pts: [], cents: [] });

  function initPts() {
    const pts = [];
    for (let c = 0; c < 3; c++) {
      const cx = 0.2 + Math.random() * 0.6, cy = 0.2 + Math.random() * 0.6;
      for (let i = 0; i < 20; i++) pts.push({ x: cx + (Math.random() - 0.5) * 0.15, y: cy + (Math.random() - 0.5) * 0.15, cluster: 0 });
    }
    stateRef.current.pts = pts;
  }
  function initCents() {
    stateRef.current.cents = Array.from({ length: k }, () => ({ x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.7 }));
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
    stateRef.current.pts.forEach(p => {
      ctx.fillStyle = COLORS[p.cluster % COLORS.length];
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 3.5, 0, Math.PI * 2); ctx.fill();
    });
    stateRef.current.cents.forEach((c, i) => {
      ctx.strokeStyle = COLORS[i % COLORS.length]; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(c.x * w, c.y * h, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.beginPath(); ctx.arc(c.x * w, c.y * h, 5, 0, Math.PI * 2); ctx.fill();
    });
  }

  function step() {
    const { pts, cents } = stateRef.current;
    pts.forEach(p => {
      let best = 0, bd = Infinity;
      cents.forEach((c, i) => { const d = (p.x-c.x)**2 + (p.y-c.y)**2; if (d < bd) { bd = d; best = i; } });
      p.cluster = best;
    });
    const sums = cents.map(() => ({ x: 0, y: 0, n: 0 }));
    pts.forEach(p => { sums[p.cluster].x += p.x; sums[p.cluster].y += p.y; sums[p.cluster].n++; });
    stateRef.current.cents = sums.map((s, i) => s.n === 0 ? cents[i] : { x: s.x / s.n, y: s.y / s.n });
    draw();
  }

  useEffect(() => { initPts(); initCents(); draw(); }, []);
  useEffect(() => { initCents(); draw(); }, [k]);
  useEffect(() => {
    if (!running) return;
    const iv = setInterval(step, 350);
    return () => clearInterval(iv);
  }, [running, k]);

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>K <span className="val">{k}</span></label><input type="range" className="lab-range" min="2" max="6" step="1" value={k} onChange={e => setK(+e.target.value)} /></div>
        <button className={`lab-btn ${running ? 'active' : ''}`} onClick={() => setRunning(r => !r)}>{running ? '▶ RUNNING' : '⏸ PAUSED'}</button>
        <button className="lab-btn" onClick={() => { initPts(); initCents(); draw(); }}>RESET</button>
      </div>
      <div className="lab-equation">J = Σ<sup>K</sup><sub>k=1</sub> Σ ‖x − <span className="var">μ<sub>k</sub></span>‖²</div>
    </>
  );
}
