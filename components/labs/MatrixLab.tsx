'use client';
import { useState } from 'react';

export default function MatrixLab() {
  const [A, setA] = useState([[1,2],[3,4]]);
  const [B, setB] = useState([[5,6],[7,8]]);

  const C = [
    [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
    [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]],
  ];

  function bump(M: number[][], setM: any, i: number, j: number) {
    const n = M.map(r => [...r]);
    n[i][j] = (n[i][j] + 1) % 10;
    setM(n);
  }

  return (
    <>
      <div className="matrix-lab-wrap">
        <div className="matrix-row">
          <div className="matrix-box matrix-a">
            {A.flat().map((v, k) => (
              <div key={k} className="mx-cell" onClick={() => bump(A, setA, Math.floor(k/2), k%2)}>{v}</div>
            ))}
          </div>
          <span className="matrix-times">×</span>
          <div className="matrix-box matrix-b">
            {B.flat().map((v, k) => (
              <div key={k} className="mx-cell b" onClick={() => bump(B, setB, Math.floor(k/2), k%2)}>{v}</div>
            ))}
          </div>
        </div>
        <div className="matrix-arrow">↓ A × B ↓</div>
        <div className="matrix-result">
          {C.flat().map((v, i) => <div key={i} className="mx-cell">{v}</div>)}
        </div>
      </div>
      <div className="lab-controls">
        <button className="lab-btn" onClick={() => { setA([[1,2],[3,4]]); setB([[5,6],[7,8]]); }}>RESET</button>
      </div>
      <div className="lab-equation">C<sub>ij</sub> = Σ<sub>k</sub> A<sub>ik</sub>·B<sub>kj</sub></div>
    </>
  );
}
