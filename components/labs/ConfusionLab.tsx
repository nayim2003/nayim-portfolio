'use client';
import { useState } from 'react';

export default function ConfusionLab() {
  const [tp, setTp] = useState(120);
  const [fp, setFp] = useState(25);
  const [fn, setFn] = useState(18);
  const [tn, setTn] = useState(340);
  const precision = tp / Math.max(1, tp + fp);
  const recall = tp / Math.max(1, tp + fn);
  const f1 = (2*precision*recall) / Math.max(0.0001, precision+recall);
  const acc = (tp+tn) / Math.max(1, tp+tn+fp+fn);

  return (
    <>
      <div className="lab-matrix-wrap">
        <div /><div className="lab-matrix-label">Pred +</div><div className="lab-matrix-label">Pred −</div>
        <div className="lab-matrix-label vert">Actual +</div>
        <div className="lab-matrix-cell tp" onClick={() => setTp(t => t + 10)}>{tp}<span>TP</span></div>
        <div className="lab-matrix-cell fn" onClick={() => setFn(f => f + 5)}>{fn}<span>FN</span></div>
        <div className="lab-matrix-label vert">Actual −</div>
        <div className="lab-matrix-cell fp" onClick={() => setFp(f => f + 5)}>{fp}<span>FP</span></div>
        <div className="lab-matrix-cell tn" onClick={() => setTn(t => t + 10)}>{tn}<span>TN</span></div>
      </div>
      <div className="lab-controls">
        <button className="lab-btn" onClick={() => { setTp(120); setFp(25); setFn(18); setTn(340); }}>RESET</button>
      </div>
      <div className="lab-equation">P = <span className="var">{precision.toFixed(3)}</span> | R = <span className="var">{recall.toFixed(3)}</span> | F1 = <span className="num">{f1.toFixed(3)}</span> | A = <span className="num">{acc.toFixed(3)}</span></div>
    </>
  );
}
