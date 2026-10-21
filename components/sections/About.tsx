'use client';
import { useEffect, useRef, useState } from 'react';
import { USERNAME } from '@/lib/data';
import GithubHeatmap from '@/components/ui/GithubHeatmap';

export default function About() {
  const termRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ repos: '--', followers: '--', stars: '--', commits: '--' });

  useEffect(() => {
    const term = termRef.current; if (!term) return;
    const lines = [
      { type: 'cmd', prompt: '$', text: 'python train_pipeline.py --task churn' },
      { type: 'out', text: '▸ Loading data .............. 12,480 rows' },
      { type: 'out', text: '▸ Cleaning & preprocessing ... ✓' },
      { type: 'out', text: '▸ Feature engineering ....... ✓' },
      { type: 'out', text: '▸ Class imbalance (SMOTENC) .. ✓' },
      { type: 'out', text: '▸ Training XGBoost .......... ✓' },
      { type: 'out', text: '▸ Evaluating on test set .... ✓' },
      { type: 'success', text: '✓ ROC-AUC: 0.94 | F1: 0.91 | Accuracy: 0.95' },
    ];
    let li = 0, ci = 0, cancelled = false;
    function type() {
      if (cancelled || li >= lines.length) return;
      const line = lines[li];
      if (ci === 0) {
        const el = document.createElement('div');
        el.className = 'term-line';
        if (line.type === 'cmd') el.innerHTML = `<span class="term-prompt">${line.prompt}</span><span class="term-cmd"></span>`;
        else if (line.type === 'success') el.innerHTML = '<span class="term-success"></span>';
        else el.innerHTML = '<span class="term-out"></span>';
        term!.appendChild(el);
      }
      const target = term!.lastElementChild!.querySelector('span:last-child')!;
      if (ci < line.text.length) { target.textContent += line.text[ci]; ci++; setTimeout(type, line.type === 'cmd' ? 42 : 18); }
      else { li++; ci = 0; setTimeout(type, line.type === 'cmd' ? 420 : 170); }
    }
    type();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json())
      .then(d => setStats(s => ({ ...s, repos: String(d.public_repos), followers: String(d.followers) })))
      .catch(() => setStats(s => ({ ...s, repos: '10', followers: '5' })));
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then(r => r.json())
      .then((repos: any[]) => {
        const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
        setStats(s => ({ ...s, stars: String(stars), commits: repos.length * 25 + '+' }));
      }).catch(() => setStats(s => ({ ...s, stars: '3', commits: '500+' })));
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">01 / About Me</div>
          <h2>Analytical by nature.<br />Data-driven by practice.</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy reveal-left">
            <p>My academic background in Statistics shapes how I approach data: understand the problem, investigate the evidence, select appropriate methods, and communicate results clearly.</p>
            <p>My practical experience includes working with Python, SQL, data preparation, EDA, visualization, statistical techniques, and machine learning workflows.</p>
            <p>I am developing end-to-end portfolio projects in financial document intelligence, fraud detection, forecasting, and customer analytics.</p>
            <div className="terminal-card">
              <div className="terminal-bar"><span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" /><span className="term-title">~/nayim/ml-pipeline.py</span></div>
              <div className="terminal-body" ref={termRef} />
            </div>
          </div>
          <div className="info-card reveal-right">
            <div className="info-row"><span>Professional Focus</span><strong>Data Science & Machine Learning</strong></div>
            <div className="info-row"><span>Academic Background</span><strong>Statistics</strong></div>
            <div className="info-row"><span>Core Languages</span><strong>Python, SQL</strong></div>
            <div className="info-row"><span>Experience</span><strong>2+ Years</strong></div>
            <div className="info-row"><span>Work Preference</span><strong>Remote / Hybrid</strong></div>
            <div className="info-row"><span>Location</span><strong>Bangladesh</strong></div>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><strong>2+</strong><span>Years of Experience</span></div>
          <div className="stat-card"><strong>10+</strong><span>Projects & Analytical Work</span></div>
          <div className="stat-card"><strong>∞</strong><span>Curiosity for learning</span></div>
        </div>
        <div className="github-stats-grid">
          <div className="github-stat-card"><div className="icon">📦</div><div className="value">{stats.repos}</div><div className="label">Public Repos</div></div>
          <div className="github-stat-card"><div className="icon">👥</div><div className="value">{stats.followers}</div><div className="label">Followers</div></div>
          <div className="github-stat-card"><div className="icon">⭐</div><div className="value">{stats.stars}</div><div className="label">Total Stars</div></div>
          <div className="github-stat-card"><div className="icon">📊</div><div className="value">{stats.commits}</div><div className="label">Activity</div></div>
        </div>
        <div style={{ marginTop: 32 }}><GithubHeatmap /></div>
      </div>
    </section>
  );
}
