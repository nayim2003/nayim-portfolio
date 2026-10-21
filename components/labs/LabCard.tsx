'use client';
import dynamic from 'next/dynamic';

const labComponents: Record<string, any> = {
  linear: dynamic(() => import('./LinearLab'), { ssr: false }),
  sigmoid: dynamic(() => import('./SigmoidLab'), { ssr: false }),
  gd: dynamic(() => import('./GradientDescentLab'), { ssr: false }),
  kmeans: dynamic(() => import('./KMeansLab'), { ssr: false }),
  normal: dynamic(() => import('./NormalLab'), { ssr: false }),
  monte: dynamic(() => import('./MonteCarloLab'), { ssr: false }),
  roc: dynamic(() => import('./ROCLab'), { ssr: false }),
  loss: dynamic(() => import('./LossLab'), { ssr: false }),
  confusion: dynamic(() => import('./ConfusionLab'), { ssr: false }),
  pr: dynamic(() => import('./PRLab'), { ssr: false }),
  biasvar: dynamic(() => import('./BiasVarianceLab'), { ssr: false }),
  pca: dynamic(() => import('./PCALab'), { ssr: false }),
  matrix: dynamic(() => import('./MatrixLab'), { ssr: false }),
  timeseries: dynamic(() => import('./TimeSeriesLab'), { ssr: false }),
  knn: dynamic(() => import('./KNNLab'), { ssr: false }),
};

export default function LabCard({ lab }: { lab: any }) {
  const C = labComponents[lab.type];
  return (
    <div className="lab-card enhanced" data-lab={lab.num}>
      <div className="lab-glow" />
      <div className="lab-header">
        <div className="lab-title"><span className="lab-num">{lab.num}</span>{lab.title}</div>
        <div className={`lab-badge ${lab.badgeClass}`}>{lab.badge}</div>
      </div>
      <p className="lab-desc">{lab.desc}</p>
      {C ? <C /> : <div style={{ padding: 20, color: 'var(--muted)' }}>Loading…</div>}
    </div>
  );
}
