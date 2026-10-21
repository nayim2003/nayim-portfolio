'use client';
import { useEffect, useState } from 'react';

const LIST = [
  { id: 'welcome', icon: '👋', name: 'Welcome Aboard', desc: 'Visited portfolio' },
  { id: 'theme_master', icon: '🎨', name: 'Theme Master', desc: 'Tried 5+ themes' },
  { id: 'lab_explorer', icon: '🧪', name: 'Lab Explorer', desc: 'Explored 5 labs' },
  { id: 'python_runner', icon: '🐍', name: 'Pythonista', desc: 'Ran Python code' },
  { id: 'sql_query', icon: '🗄️', name: 'SQL Sorcerer', desc: 'Executed SQL' },
  { id: 'abtest_run', icon: '🧮', name: 'Statistician', desc: 'Ran A/B test' },
  { id: 'cmd_master', icon: '⌘', name: 'Cmd Master', desc: 'Used palette' },
  { id: 'chat_bot', icon: '💬', name: 'Chatterbox', desc: 'Chatted with AI' },
  { id: 'deep_scroll', icon: '📜', name: 'Deep Diver', desc: 'Read till bottom' },
  { id: 'konami', icon: '🎮', name: 'Konami Code', desc: 'Secret code' },
];

export default function AchievementsPanel() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    try { setUnlocked(JSON.parse(localStorage.getItem('achievements') || '[]')); } catch {}
    setTimeout(() => {
      const cur = JSON.parse(localStorage.getItem('achievements') || '[]');
      if (!cur.includes('welcome')) {
        cur.push('welcome');
        localStorage.setItem('achievements', JSON.stringify(cur));
        setUnlocked([...cur]);
      }
    }, 2000);
  }, []);

  return (
    <div className="achievements-panel">
      <button className="achievements-toggle" onClick={() => setOpen(o => !o)} aria-label="Achievements">
        🏆<span className="achievements-count">{unlocked.length}</span>
      </button>
      {open && (
        <div className="achievements-list open">
          <div className="ach-header">🏆 {unlocked.length}/{LIST.length} Unlocked</div>
          {LIST.map(a => (
            <div key={a.id} className={`ach-item ${unlocked.includes(a.id) ? 'unlocked' : 'locked'}`}>
              <div className="ach-icon">{unlocked.includes(a.id) ? a.icon : '🔒'}</div>
              <div className="ach-body">
                <div className="ach-name">{a.name}</div>
                <div className="ach-desc">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
