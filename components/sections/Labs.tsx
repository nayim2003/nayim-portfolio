'use client';
import { LABS } from '@/lib/data';
import LabCard from '@/components/labs/LabCard';

export default function Labs() {
  return (
    <section id="labs">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">07 / Interactive ML Labs</div>
          <h2>Fifteen models.<br />One interactive playground.</h2>
        </div>
        <div className="lab-grid">
          {LABS.map(lab => <LabCard key={lab.num} lab={lab} />)}
        </div>
      </div>
    </section>
  );
}
