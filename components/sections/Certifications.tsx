import { certifications } from '@/lib/data';

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">06 / Certifications</div>
          <h2>Certifications & Professional Learning</h2>
        </div>
        <div className="certifications-grid">
          {certifications.map((c, i) => (
            <article key={c.id} className="certification-card">
              <div className="project-top">
                <span className="project-number">CERTIFICATE {String(i + 1).padStart(2, '0')}</span>
                <span className="project-type">{c.type}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.issuer}</p>
              <a className="project-link" href={c.link} target="_blank" rel="noopener noreferrer">View Certificate ↗</a>
              <div className="card-shine" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
