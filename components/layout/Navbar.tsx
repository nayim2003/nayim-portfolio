'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useTheme, Theme } from './ThemeProvider';
import { navLinks } from '@/lib/data';

const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: 'dark', label: '🌙 Dark', swatch: 'linear-gradient(135deg,#0a0f18,#4fd1c5)' },
  { id: 'light', label: '☀️ Light', swatch: 'linear-gradient(135deg,#f0f5fc,#0d9488)' },
  { id: 'nord', label: '❄️ Nord', swatch: 'linear-gradient(135deg,#2e3440,#88c0d0)' },
  { id: 'solar', label: '🌻 Solar', swatch: 'linear-gradient(135deg,#fdf6e3,#2aa198)' },
  { id: 'dracula', label: '🧛 Dracula', swatch: 'linear-gradient(135deg,#282a36,#bd93f9)' },
  { id: 'tokyo', label: '🌃 Tokyo', swatch: 'linear-gradient(135deg,#1a1b26,#7aa2f7)' },
  { id: 'catppuccin', label: '🐱 Catppuccin', swatch: 'linear-gradient(135deg,#1e1e2e,#cba6f7)' },
];

export default function Navbar() {
  const { theme, setTheme, isPickerOpen, togglePicker } = useTheme();
  const [active, setActive] = useState('home');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) togglePicker();
    }
    if (isPickerOpen) document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isPickerOpen]);

  function changeTheme(t: Theme, e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTheme(t, ((rect.left + rect.width/2) / window.innerWidth) * 100, ((rect.top + rect.height/2) / window.innerHeight) * 100);
    togglePicker();
  }

  function downloadCV() {
    const a = document.createElement('a');
    a.href = '/assets/resume.pdf';
    a.download = 'Md_Nayim_Howlader_Resume.pdf';
    a.click();
  }

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <Link className="logo" href="/#home">Md. Nayim Howlader<span>.</span></Link>

          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.href}>
                {l.href.startsWith('/blog') ? (
                  <Link href={l.href}>{l.label}</Link>
                ) : (
                  <a href={l.href} className={active === l.href.split('#')[1] ? 'active' : ''}>{l.label}</a>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="icon-btn" title="Sound">🔇</button>
            <button className="icon-btn" title="Language">🌐</button>
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); togglePicker(); }} title="Theme">🎨</button>
            <button className="icon-btn" onClick={() => document.dispatchEvent(new CustomEvent('open-cmd'))} title="Command">⌘</button>
            <button className="icon-btn" onClick={() => document.dispatchEvent(new CustomEvent('open-shortcuts'))} title="Shortcuts">?</button>
            <button className="button nav-cv" onClick={downloadCV}>Download CV ↗</button>
          </div>
        </div>
      </header>

      <div ref={pickerRef} className={`theme-picker ${isPickerOpen ? 'open' : ''}`}>
        <div className="theme-picker-title">Choose Theme</div>
        {THEMES.map(t => (
          <button key={t.id} className={`theme-option ${theme === t.id ? 'active' : ''}`} onClick={(e) => changeTheme(t.id, e)}>
            <span className="theme-swatch" style={{ background: t.swatch }} />
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
