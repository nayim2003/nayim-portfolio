'use client';
import { useEffect, useRef, useState } from 'react';

export default function ROCLab() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [th, setTh] = useState(0.5);
  const posRef = useRef<number[]>([]);
  const negRef = useRef<number[]>([]);

  useEffect(() => {
    const pos = [], neg = [];
    for (let i = 0; i < 300; i++) {
      pos.push(Math.max(0, Math.min(1, 0.7 + (Math.random()+Math.random()+Math.random()-1.5)*0.15)));
      neg.push(Math.max(0, Math.min(1, 0.3 + (Math.random()+Math.random()+Math.random()-1.5)*0.15)));
    }
    posRef.current = pos; negRef.current = neg;
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
    const pad = 24, pw = w - pad*2, ph = h - pad*2;
    const ox = pad, oy = h - pad;
    const pts: any[] = [];
    for (let t = 1.01; t >= -0.01; t -= 0.01) {
      const tpr = posRef.current.filter(s => s >= t).length / posRef.current.length;
      const fpr = negRef.current.filter(s => s >= t).length / negRef.current.length;
      pts.push({ x: fpr, y: tpr });
    }
    ctx.strokeStyle = '#4fd1c5'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    pts.forEach((p, i) => { const px = ox + p.x*pw, py = oy - p.y*ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
    ctx.stroke();
    const tpr = posRef.current.filter(s => s >= th).length / posRef.current.length;
    const fpr = negRef.current.filter(s => s >= th).length / negRef.current.length;
    ctx.fillStyle = '#6b9eff';
    ctx.beginPath(); ctx.arc(ox + fpr*pw, oy - tpr*ph, 6, 0, Math.PI*2); ctx.fill();
  }, [th]);

  const tpr = posRef.current.length ? posRef.current.filter(s => s >= th).length / posRef.current.length : 0;
  const fpr = negRef.current.length ? negRef.current.filter(s => s >= th).length / negRef.current.length : 0;

  return (
    <>
      <div className="lab-canvas-wrap"><canvas ref={ref} style={{ height: 180, display: 'block', width: '100%' }} /></div>
      <div className="lab-controls">
        <div className="lab-slider"><label>Threshold <span className="val">{th.toFixed(2)}</span></label><input type="range" className="lab-range" min="0.05" max="0.95" step="0.01" value={th} onChange={e => setTh(+e.target.value)} /></div>
      </div>
      <div className="lab-equation">TPR = <span className="var">{tpr.toFixed(3)}</span> | FPR = <span className="var">{fpr.toFixed(3)}</span> | AUC ≈ <span className="num">0.92</span></div>
    </>
  );
}
