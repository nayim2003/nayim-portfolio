'use client';
import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    const bar = document.getElementById('scrollProgress');
    const btn = document.getElementById('backToTop');
    function onScroll() {
      const t = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (t / h) * 100 + '%';
      btn?.classList.toggle('visible', t > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    function onRipple(e: MouseEvent) {
      if ((e.target as HTMLElement).closest('input, textarea, .modal-content, .chat-window')) return;
      const r = document.createElement('div');
      r.className = 'ripple';
      r.style.width = r.style.height = '100px';
      r.style.left = e.clientX + 'px';
      r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 800);
    }
    document.addEventListener('click', onRipple);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onRipple);
    };
  }, []);

  // Shortcuts via global events
  useEffect(() => {
    function onCmd() { document.getElementById('cmdPalette')?.classList.add('active'); }
    function onShortcuts() { document.getElementById('shortcutsPanel')?.classList.add('active'); document.getElementById('shortcutsBg')?.classList.add('active'); }
    document.addEventListener('open-cmd', onCmd as any);
    document.addEventListener('open-shortcuts', onShortcuts as any);
    return () => {
      document.removeEventListener('open-cmd', onCmd as any);
      document.removeEventListener('open-shortcuts', onShortcuts as any);
    };
  }, []);

  return null;
}
