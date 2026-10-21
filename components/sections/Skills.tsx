'use client';
import { useEffect, useRef } from 'react';
import { skills } from '@/lib/data';

export default function Skills() {
  const radarRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let r: any, b: any;
    (async () => {
      const mod = await import('chart.js');
      const { Chart, registerables } = mod;
      Chart.register(...registerables);
      if (radarRef.current) r = new Chart(radarRef.current, {
        type: 'radar',
        data: {
          labels: ['Python','SQL','Statistics','ML','DL/NLP','Viz','MLOps'],
          datasets: [{ label: 'Proficiency', data: [92,85,90,88,78,82,72], backgroundColor: 'rgba(79,209,197,.15)', borderColor: '#4fd1c5', borderWidth: 2, pointBackgroundColor: '#4fd1c5', pointRadius: 4 }],
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,.08)' }, angleLines: { color: 'rgba(255,255,255,.08)' }, pointLabels: { color: '#e8eef9', font: { size: 11 } } } } },
      });
      if (barRef.current) b = new Chart(barRef.current, {
        type: 'bar',
        data: { labels: ['Python','SQL','Scikit-learn','XGBoost','Power BI','Streamlit','Plotly'], datasets: [{ label: 'Projects', data: [8,6,6,5,3,4,2], backgroundColor: '#4fd1c5', borderRadius: 8 }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,.08)' } } } },
      });
    })();
    return () => { r?.destroy(); b?.destroy(); };
  }, []);

  return (
    <section id="skills">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">03 / Technical Skills</div>
          <h2>Tools I use to solve problems.</h2>
        </div>
        <div className="skills-layout">
          <div className="chart-card"><h3>Skill Proficiency Radar</h3><div className="chart-sub">scale 0-100</div><canvas ref={radarRef} /></div>
          <div className="chart-card"><h3>Tools Used Across Projects</h3><div className="chart-sub">frequency</div><canvas ref={barRef} /></div>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <article key={i} className="skill-card">
              <div className="skill-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="card-shine" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
