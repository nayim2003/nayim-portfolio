'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (min-width: 901px)').matches) return;
    document.body.classList.add('custom-cursor');

    const spot = document.getElementById('cursorSpotlight');
    const outer = document.getElementById('cursorOuterRing');
    const ring = document.getElementById('cursorRing');
    const dot = document.getElementById('cursorDot');
    if (!spot || !outer || !ring || !dot) return;

    let mx = -100, my = -100, sx = -100, sy = -100, orx = -100, ory = -100, rx = -100, ry = -100, dx = -100, dy = -100;
    let vis = false, cool = 0;

    function mv(e: MouseEvent) {
      mx = e.clientX; my = e.clientY;
      if (!vis) {
        spot!.style.opacity = '1'; outer!.style.opacity = '.5'; ring!.style.opacity = '1'; dot!.style.opacity = '1'; vis = true;
      }
      const now = performance.now();
      if (now - cool > 40) {
        cool = now;
        const p = document.createElement('div');
        p.className = 'cursor-trail-particle';
        p.style.left = mx + 'px'; p.style.top = my + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
      }
    }
    function lv() { spot!.style.opacity = '0'; outer!.style.opacity = '0'; ring!.style.opacity = '0'; dot!.style.opacity = '0'; vis = false; }
    window.addEventListener('mousemove', mv);
    document.addEventListener('mouseleave', lv);

    let raf: number;
    function tick() {
      sx += (mx - sx) * .05; sy += (my - sy) * .05;
      orx += (mx - orx) * .12; ory += (my - ory) * .12;
      rx += (mx - rx) * .22; ry += (my - ry) * .22;
      dx += (mx - dx) * .4; dy += (my - dy) * .4;
      spot!.style.transform = `translate(${sx}px,${sy}px) translate(-50%,-50%)`;
      outer!.style.transform = `translate(${orx}px,${ory}px) translate(-50%,-50%)`;
      ring!.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      dot!.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }
    tick();

    const hoverSelector = 'a, button, .project-card, .certification-card, .skill-card, .stat-card, .lab-card, .blog-card, input, textarea';
    function bindHover() {
      document.querySelectorAll(hoverSelector).forEach(el => {
        if ((el as any)._hBound) return;
        (el as any)._hBound = true;
        el.addEventListener('mouseenter', () => { ring!.classList.add('active'); dot!.classList.add('active'); });
        el.addEventListener('mouseleave', () => { ring!.classList.remove('active'); dot!.classList.remove('active'); });
      });
    }
    bindHover();
    (window as any)._bindCursor = bindHover;

    return () => {
      window.removeEventListener('mousemove', mv);
      document.removeEventListener('mouseleave', lv);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor-spotlight" id="cursorSpotlight" />
      <div className="cursor-outer-ring" id="cursorOuterRing" />
      <div className="cursor-ring" id="cursorRing" />
      <div className="cursor-dot" id="cursorDot" />
    </>
  );
}
