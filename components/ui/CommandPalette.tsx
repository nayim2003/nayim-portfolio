'use client';
import { useState, useEffect, useRef } from 'react';

const CMDS = [
  { icon: '🏠', label: 'Home', href: '/#home' },
  { icon: '👤', label: 'About', href: '/#about' },
  { icon: '💼', label: 'Experience', href: '/#experience' },
  { icon: '⚡', label: 'Skills', href: '/#skills' },
  { icon: '📁', label: 'Projects', href: '/#projects' },
  { icon: '🏆', label: 'Certifications', href: '/#certifications' },
  { icon: '🧪', label: 'ML Labs', href: '/#labs' },
  { icon: '📊', label: 'Statistics Lab', href: '/#abtest' },
  { icon: '🐍', label: 'Python', href: '/#python' },
  { icon: '🗄️', label: 'SQL', href: '/#sql' },
  { icon: '🎨', label: 'Visualization', href: '/#gallery' },
  { icon: '📝', label: 'Blog', href: '/blog' },
  { icon: '✉️', label: 'Contact', href: '/#contact' },
  { icon: '📄', label: 'Download CV', action: () => { const a = document.createElement('a'); a.href = '/assets/resume.pdf'; a.download = 'Md_Nayim_Howlader_Resume.pdf'; a.click(); } },
  { icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com/nayim2003', '_blank') },
  { icon: '⬆️', label: 'Back to Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = q ? CMDS.filter(c => c.label.toLowerCase().includes(q.toLowerCase())) : CMDS;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  function run(c: any) {
    if (c.href) window.location.href = c.href; else c.action();
    setOpen(false); setQ('');
  }

  return (
    <div className={`cmd-palette-overlay ${open ? 'active' : ''}`} onClick={e => e.target === e.currentTarget && setOpen(false)}>
      <div className="cmd-palette">
        <input
          ref={inputRef}
          className="cmd-input"
          placeholder="Type a command..."
          value={q}
          onChange={e => { setQ(e.target.value); setSel(0); }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
            else if (e.key === 'Enter' && filtered[sel]) run(filtered[sel]);
          }}
        />
        <div className="cmd-list">
          {filtered.map((c, i) => (
            <div key={i} className={`cmd-item ${i === sel ? 'selected' : ''}`} onClick={() => run(c)}>
              <span className="icon">{c.icon}</span><span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
