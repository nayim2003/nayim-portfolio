'use client';
import { useEffect, useState } from 'react';

export default function ShortcutsPanel() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onOpen() { setOpen(true); }
    function onKey(e: KeyboardEvent) {
      if (e.key === '?' && !(e.target as HTMLElement).closest('input, textarea')) { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('open-shortcuts', onOpen);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('open-shortcuts', onOpen); document.removeEventListener('keydown', onKey); };
  }, []);

  const rows = [
    ['Command palette', ['⌘', 'K']],
    ['Search', ['⌘', 'F']],
    ['Toggle theme', ['T']],
    ['Close overlays', ['Esc']],
    ['Jump to Home', ['G', 'H']],
    ['Jump to Labs', ['G', 'L']],
    ['Jump to Projects', ['G', 'P']],
    ['Jump to Contact', ['G', 'T']],
    ['Show this panel', ['?']],
  ];

  return (
    <>
      <div className={`shortcuts-overlay-bg ${open ? 'active' : ''}`} onClick={() => setOpen(false)} />
      <div className={`shortcuts-panel ${open ? 'active' : ''}`}>
        <h3>Keyboard Shortcuts</h3>
        {rows.map(([label, keys], i) => (
          <div key={i} className="shortcut-row">
            <span>{label as string}</span>
            <div className="shortcut-keys">{(keys as string[]).map((k, j) => <span key={j} className="shortcut-key">{k}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
