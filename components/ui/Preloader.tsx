'use client';
import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const statuses = ['initializing environment','loading dependencies','compiling model graph','warming up tensor cores','ready'];
    let i = 0;
    const el = document.getElementById('preloaderStatus');
    const iv = setInterval(() => {
      if (el && i < statuses.length - 1) { i++; el.innerHTML = statuses[i] + '<span class="cursor"></span>'; }
      else clearInterval(iv);
    }, 260);
    const t = setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 1800);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  return (
    <div className="preloader" id="preloader">
      <div className="preloader-inner">
        <div className="dna-loader">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="dna-pair" />)}</div>
        <div className="preloader-logo">NEURAL INIT</div>
        <div className="preloader-bar"><div className="preloader-fill" /></div>
        <div className="preloader-status" id="preloaderStatus">initializing<span className="cursor" /></div>
      </div>
    </div>
  );
}
