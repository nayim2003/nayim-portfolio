import { education } from '@/lib/data';

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">05 / Education</div>
          <h2>A strong foundation in Statistics.</h2>
        </div>
        <div className="education-grid">
          {education.map((e, i) => (
            <article key={i} className="education-card">
              <h3>{e.title}</h3>
              {e.lines.map((l, j) => <p key={j}>{l}</p>)}
              {e.status && <span className="education-status">{e.status}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
