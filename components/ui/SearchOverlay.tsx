'use client';
import { useState, useEffect, useRef } from 'react';

const INDEX = [
  { icon: '🏠', title: 'Home', sub: 'Hero', target: '/#home' },
  { icon: '👤', title: 'About', sub: 'Background', target: '/#about' },
  { icon: '📁', title: 'Projects', sub: '8 portfolio projects', target: '/#projects' },
  { icon: '🧪', title: 'ML Labs', sub: '15 interactive demos', target: '/#labs' },
  { icon: '🐍', title: 'Python', sub: 'Interactive', target: '/#python' },
  { icon: '🗄️', title: 'SQL', sub: 'Interactive', target: '/#sql' },
  { icon: '📝', title: 'Blog', sub: '3 articles', target: '/blog' },
  { icon: '✉️', title: 'Contact', sub: 'Get in touch', target: '/#contact' },
];

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  const filtered = q ? INDEX.filter(i => i.title.toLowerCase().includes(q.toLowerCase()) || i.sub.toLowerCase().includes(q.toLowerCase())) : INDEX;

  return (
    <div className={`search-overlay ${open ? 'active' : ''}`} onClick={e => e.target === e.currentTarget && setOpen(false)}>
      <div className="search-box">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input ref={inputRef} className="search-input" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
          <button className="search-close" onClick={() => setOpen(false)}>Esc</button>
        </div>
        <div className="search-results">
          {filtered.map((item, i) => (
            <div key={i} className="search-item" onClick={() => { window.location.href = item.target; setOpen(false); }}>
              <div className="search-item-icon">{item.icon}</div>
              <div className="search-item-body">
                <div className="search-item-title">{item.title}</div>
                <div className="search-item-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
