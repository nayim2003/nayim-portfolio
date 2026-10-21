'use client';
import { useState, useMemo } from 'react';

function normalCDF(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export default function ABTest() {
  const [vA, setVA] = useState(1000);
  const [cA, setCA] = useState(100);
  const [vB, setVB] = useState(1000);
  const [cB, setCB] = useState(130);

  const res = useMemo(() => {
    const pA = cA / vA, pB = cB / vB;
    const lift = ((pB - pA) / pA) * 100;
    const pooled = (cA + cB) / (vA + vB);
    const se = Math.sqrt(pooled * (1 - pooled) * (1 / vA + 1 / vB));
    const z = se > 0 ? (pB - pA) / se : 0;
    const p = 2 * (1 - normalCDF(Math.abs(z)));
    return { pA, pB, lift, z, p, sig: p < 0.05 };
  }, [vA, cA, vB, cB]);

  return (
    <section id="abtest" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">09 / Statistics Lab</div>
          <h2>A/B Test Significance Calculator</h2>
        </div>
        <div className="abtest-grid">
          <div className="abtest-inputs">
            <div className="abtest-group">
              <h4>🅰️ Control</h4>
              <div className="pg-field"><label>Visitors: <span className="pg-val">{vA}</span></label><input type="range" min="100" max="10000" step="100" value={vA} onChange={e => setVA(+e.target.value)} className="pg-range" /></div>
              <div className="pg-field"><label>Conversions: <span className="pg-val">{cA}</span></label><input type="range" min="1" max="1000" value={cA} onChange={e => setCA(+e.target.value)} className="pg-range" /></div>
            </div>
            <div className="abtest-group">
              <h4>🅱️ Variant</h4>
              <div className="pg-field"><label>Visitors: <span className="pg-val">{vB}</span></label><input type="range" min="100" max="10000" step="100" value={vB} onChange={e => setVB(+e.target.value)} className="pg-range" /></div>
              <div className="pg-field"><label>Conversions: <span className="pg-val">{cB}</span></label><input type="range" min="1" max="1000" value={cB} onChange={e => setCB(+e.target.value)} className="pg-range" /></div>
            </div>
          </div>
          <div className="abtest-results">
            <div className={`abtest-verdict ${res.sig ? 'winner' : ''}`}>
              <h3>{res.sig ? '✅ Statistically Significant' : '⏸️ Not Significant'}</h3>
              <div className="sub">p-value = {res.p.toFixed(5)}</div>
            </div>
            <div className="abtest-metric-row"><span className="abtest-metric-label">Control CVR</span><span className="abtest-metric-value">{(res.pA * 100).toFixed(2)}%</span></div>
            <div className="abtest-metric-row"><span className="abtest-metric-label">Variant CVR</span><span className="abtest-metric-value">{(res.pB * 100).toFixed(2)}%</span></div>
            <div className="abtest-metric-row"><span className="abtest-metric-label">Lift</span><span className="abtest-metric-value">{res.lift > 0 ? '+' : ''}{res.lift.toFixed(2)}%</span></div>
            <div className="abtest-metric-row"><span className="abtest-metric-label">Z-score</span><span className="abtest-metric-value">{res.z.toFixed(4)}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
