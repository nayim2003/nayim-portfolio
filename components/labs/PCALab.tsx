'use client';
import { useEffect, useRef, useState } from 'react';

export default function PCALab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(30);
  const [auto, setAuto] = useState(true);
  const dataRef = useRef<any[]>([]);

  useEffect(() => {
    const d = [];
    for (let i = 0; i < 60; i++) {
      const t = (i/60) * Math.PI * 2;
      d.push({ x: Math.cos(t)*0.35 + (Math.random()-0.5)*0.15, y: Math.sin(t)*0.2 + (Math.random()-0.5)*0.15 });
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
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, h/5*i); ctx.lineTo(w, h/5*i); ctx.stroke(); ctx.beginPath(); ctx.moveTo(w/5*i, 0); ctx.lineTo(w/5*i, h); ctx.stroke(); }
    const cx = w/2, cy = h/2, sc = Math.min(w, h)*0.9;
    dataRef.current.forEach(d => { ctx.fillStyle = '#6b9eff'; ctx.globalAlpha = .7; ctx.beginPath(); ctx.arc(cx + d.x*sc, cy - d.y*sc, 2.5, 0, Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad), dy = -Math.sin(rad), len = sc*1.2;
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx-dx*len, cy-dy*len); ctx.lineTo(cx+dx*len, cy+dy*len); ctx.stroke();
  }, [angle]);

  useEffect(() => {
    if (!auto) return;
    let raf: number;
    function tick() {
      setAngle(a => (a + 0.5) % 180);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto]);

  let varOn = 0, varTot = 0;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad), dy = -Math.sin(rad);
  dataRef.current.forEach(d => {
    varTot += d.x*d.x + d.y*d.y;
    const proj = d.x*dx + (-d.y)*dy;
    varOn += proj*proj;
  });
  const expl = varTot > 0 ? (varOn/varTot)*100 : 0;

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Angle <span className="val">{angle.toFixed(0)}°</span></label><input type="range" className="lab-range" min="0" max="180" step="1" value={angle} onChange={e => { setAuto(false); setAngle(+e.target.value); }} /></div>
        <button className={`lab-btn ${auto ? 'active' : ''}`} onClick={() => setAuto(a => !a)}>{auto ? 'AUTO' : 'MANUAL'}</button>
      </div>
      <div className="lab-equation">Explained = <span className="var">{expl.toFixed(1)}%</span> | Angle = <span className="num">{angle.toFixed(0)}°</span></div>
    </>
  );
}
