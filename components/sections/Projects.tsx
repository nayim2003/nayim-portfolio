'use client';
import { useState } from 'react';
import { projects, Project } from '@/lib/data';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    if (filter === 'Completed' && p.note !== 'Completed') return false;
    if (filter === 'In Development' && p.note !== 'In Development') return false;
    if (filter !== 'all' && filter !== 'Completed' && filter !== 'In Development' && !p.tags.includes(filter)) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q) && !p.tags.some(t => t.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const filters = ['all','Completed','In Development','Python','NLP','XGBoost','Computer Vision'];

  return (
    <section id="projects">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">04 / Selected Projects</div>
          <h2>Turning ideas into working projects.</h2>
        </div>

        <div className="project-filters">
          <span className="project-filters-label">Filter:</span>
          {filters.map(f => (
            <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f === 'all' ? 'All' : f}</button>
          ))}
          <input type="search" className="project-search" placeholder="🔍 Search projects..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>

        <div className="projects-grid">
          {filtered.length === 0 ? (
            <div className="filter-empty">🔍 No projects match your filters.</div>
          ) : filtered.map(p => (
            <article key={p.id} className="project-card" onClick={() => setSelected(p)}>
              <div className="project-top"><span className="project-number">{p.num}</span><span className="project-type">{p.type}</span></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <span className="project-note">{p.note}</span>
              <div className="project-updated">Updated {p.updated}</div>
              <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>View Project ↗</a>
              <div className="card-shine" />
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="project-top" style={{ marginBottom: 12 }}><span className="project-number">{selected.num}</span><span className="project-type">{selected.type}</span></div>
            <h2>{selected.title}</h2>
            <div className="modal-meta"><span>● {selected.note}</span><span>Updated {selected.updated}</span></div>
            <div className="modal-body">
              <p>{selected.desc}</p>
              <h4>Project Details</h4>
              <p>{selected.details}</p>
              <h4>Technologies</h4>
              <div className="tags">{selected.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            </div>
            <div style={{ marginTop: 24 }}><a className="button" href={selected.link} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a></div>
          </div>
        </div>
      )}
    </section>
  );
}
