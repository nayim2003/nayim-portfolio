'use client';
import { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, nodes: any[] = [], raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const p = canvas!.parentElement!;
      w = canvas!.width = p.offsetWidth;
      h = canvas!.height = p.offsetHeight;
      const count = Math.min(75, Math.floor((w * h) / (window.innerWidth < 600 ? 32000 : 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .7, phase: Math.random() * Math.PI * 2,
      }));
    }
    function mv(e: MouseEvent) { const r = canvas!.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
    function lv() { mouse.x = -9999; mouse.y = -9999; }

    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement?.addEventListener('mousemove', mv);
    canvas.parentElement?.addEventListener('mouseleave', lv);

    let t = 0;
    function draw() {
      t += .005;
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000 && d2 > 1) { const d = Math.sqrt(d2); const f = (1 - d / 110) * .6; n.x += (dx / d) * f; n.y += (dy / d) * f; }
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const d = Math.sqrt(d2);
          ctx.strokeStyle = `rgba(79,209,197,${(1 - d / 126) * .32})`;
          ctx.lineWidth = .6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      nodes.forEach(n => {
        const pulse = 1 + Math.sin(t * 3 + n.phase) * .25;
        ctx.fillStyle = 'rgba(79,209,197,.75)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', mv);
      canvas.parentElement?.removeEventListener('mouseleave', lv);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} id="neural-canvas" />;
}
