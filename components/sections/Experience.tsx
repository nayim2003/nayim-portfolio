import { experience } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">02 / Professional Experience</div>
          <h2>Experience built around data.</h2>
        </div>
        <div className="timeline">
          {experience.map((e, i) => (
            <article key={i} className="timeline-item">
              <div className="experience-head">
                <div><h3>{e.title}</h3><p>{e.company}</p></div>
                <div className="experience-date">{e.date}</div>
              </div>
              <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
