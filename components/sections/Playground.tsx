'use client';
import { useState } from 'react';

export default function Playground() {
  const [tenure, setTenure] = useState(12);
  const [charges, setCharges] = useState(65);
  const [calls, setCalls] = useState(2);
  const [contract, setContract] = useState(false);
  const [autopay, setAutopay] = useState(false);

  const prob = Math.max(0.01, Math.min(0.99, 0.3 - tenure / 200 + charges / 500 + calls / 30 - (contract ? 0.3 : 0) - (autopay ? 0.15 : 0)));
  const pct = Math.round(prob * 100);

  return (
    <section id="playground" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">08 / Interactive ML Demo</div>
          <h2>Try the churn model yourself.</h2>
        </div>
        <div className="playground-grid">
          <div className="playground-inputs">
            <h3 className="playground-title">Customer Profile</h3>
            <div className="pg-field">
              <label>Tenure: <span className="pg-val">{tenure}</span></label>
              <input type="range" min="0" max="72" value={tenure} onChange={e => setTenure(+e.target.value)} className="pg-range" />
            </div>
            <div className="pg-field">
              <label>Charges: <span className="pg-val">${charges}</span></label>
              <input type="range" min="20" max="150" value={charges} onChange={e => setCharges(+e.target.value)} className="pg-range" />
            </div>
            <div className="pg-field">
              <label>Support Calls: <span className="pg-val">{calls}</span></label>
              <input type="range" min="0" max="10" value={calls} onChange={e => setCalls(+e.target.value)} className="pg-range" />
            </div>
            <div className="pg-field">
              <label className="pg-switch-label">
                <span>Has Contract</span>
                <input type="checkbox" checked={contract} onChange={e => setContract(e.target.checked)} className="pg-switch" />
                <span className="pg-switch-track" />
              </label>
            </div>
            <div className="pg-field">
              <label className="pg-switch-label">
                <span>Uses Auto-Pay</span>
                <input type="checkbox" checked={autopay} onChange={e => setAutopay(e.target.checked)} className="pg-switch" />
                <span className="pg-switch-track" />
              </label>
            </div>
          </div>
          <div className="playground-output">
            <div className="pg-result-card">
              <div className="pg-result-label">CHURN PROBABILITY</div>
              <div className="pg-result-value">{pct}%</div>
              <div className="pg-result-bar"><div className="pg-result-fill" style={{ width: `${pct}%` }} /></div>
              <div className={`pg-result-verdict ${pct < 33 ? '' : pct < 66 ? 'medium' : 'high'}`}>
                {pct < 33 ? '✓ Low Risk' : pct < 66 ? '⚠️ Medium Risk' : '🔴 High Risk'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
