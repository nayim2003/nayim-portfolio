'use client';
import { useEffect, useRef, useState } from 'react';

export default function KNNLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [k, setK] = useState(5);
  const aRef = useRef<any[]>([]);
  const bRef = useRef<any[]>([]);
  const starRef = useRef({ x: 0.5, y: 0.5 });

  function seed() {
    aRef.current = []; bRef.current = [];
    for (let i = 0; i < 12; i++) aRef.current.push({ x: 0.25 + Math.random()*0.15, y: 0.7 + Math.random()*0.2 });
    for (let i = 0; i < 12; i++) bRef.current.push({ x: 0.65 + Math.random()*0.15, y: 0.2 + Math.random()*0.2 });
    starRef.current = { x: 0.5, y: 0.5 };
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
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, h/5*i); ctx.lineTo(w, h/5*i); ctx.stroke(); ctx.beginPath(); ctx.moveTo(w/5*i, 0); ctx.lineTo(w/5*i, h); ctx.stroke(); }
    const all = [
      ...aRef.current.map(p => ({ ...p, cls: 'A' })),
      ...bRef.current.map(p => ({ ...p, cls: 'B' })),
    ];
    all.forEach(p => { p.d = Math.hypot(p.x - starRef.current.x, p.y - starRef.current.y); });
    all.sort((a: any, b: any) => a.d - b.d);
    const kth = all[Math.min(k, all.length) - 1];
    if (kth) {
      ctx.strokeStyle = 'rgba(255,255,255,.5)';
      ctx.setLineDash([4,4]);
      ctx.beginPath(); ctx.arc(starRef.current.x*w, starRef.current.y*h, kth.d*w, 0, Math.PI*2); ctx.stroke();
      ctx.setLineDash([]);
    }
    all.forEach(p => { ctx.fillStyle = p.cls === 'A' ? '#4fd1c5' : '#6b9eff'; ctx.globalAlpha = .8; ctx.beginPath(); ctx.arc(p.x*w, p.y*h, 4, 0, Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fbbf24';
    const sx = starRef.current.x*w, sy = starRef.current.y*h;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? 9 : 4;
      const ang = (i/10) * Math.PI * 2 - Math.PI/2;
      const px = sx + Math.cos(ang)*rad, py = sy + Math.sin(ang)*rad;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
  }

  useEffect(() => { seed(); draw(); }, []);

  function onClick(e: React.MouseEvent) {
    const c = ref.current; if (!c) return;
    const r = c.getBoundingClientRect();
    starRef.current = { x: (e.clientX - r.left)/r.width, y: (e.clientY - r.top)/r.height };
    draw();
  }

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} onClick={onClick} style={{ height: 180, display: 'block', width: '100%', cursor: 'pointer' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>K <span className="val">{k}</span></label><input type="range" className="lab-range" min="1" max="11" step="2" value={k} onChange={e => { setK(+e.target.value); }} /></div>
        <button className="lab-btn" onClick={() => { seed(); draw(); }}>RESET</button>
      </div>
      <div className="lab-equation">Classification by majority vote of K = <span className="var">{k}</span> neighbors</div>
    </>
  );
}
