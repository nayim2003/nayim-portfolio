'use client';
import { useState, useRef } from 'react';

const DEFAULT_CODE = `import numpy as np
import pandas as pd

np.random.seed(42)
df = pd.DataFrame({
    'month': pd.date_range('2024-01-01', periods=12, freq='M'),
    'sales': np.random.randint(1000, 5000, 12),
})

print("Sample DataFrame:")
print(df.head())
print(f"Total sales: \${df['sales'].sum():,}")
`;

export default function PythonPlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('Click RUN to execute...');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const pyRef = useRef<any>(null);

  async function init() {
    if (ready || loading) return;
    setLoading(true);
    try {
      if (!(window as any).loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const py = await (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
      await py.loadPackage(['numpy', 'pandas']);
      pyRef.current = py;
      setReady(true);
    } catch (e: any) { setOutput('Load error: ' + e.message); }
    finally { setLoading(false); }
  }

  async function run() {
    if (!ready) { init(); return; }
    setOutput('Running…');
    try {
      const py = pyRef.current;
      py.runPython(`import sys\nfrom io import StringIO\n_cap = StringIO()\nsys.stdout = _cap\n`);
      await py.runPythonAsync(code);
      py.runPython('sys.stdout = sys.__stdout__');
      setOutput(py.runPython('_cap.getvalue()') || '✓ Done');
    } catch (e: any) { setOutput('✗ ' + e.message); }
  }

  return (
    <section id="python" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">10 / Interactive Python</div>
          <h2>Try Python snippets — right here.</h2>
        </div>
        <div className="python-playground">
          <div className="python-editor-wrap">
            <div className="python-toolbar">
              <span className="python-toolbar-title">main.py</span>
              <div className="python-toolbar-actions">
                <button className="lab-btn" onClick={run}>▶ RUN</button>
                <button className="lab-btn" onClick={() => setCode('')}>CLEAR</button>
              </div>
            </div>
            <textarea id="pythonCode" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} />
            <div className="python-status">
              <span className={`python-dot ${loading ? 'loading' : ready ? '' : 'loading'}`} />
              <span>{ready ? '✓ Ready' : loading ? 'Loading Python...' : 'Click RUN to load'}</span>
            </div>
          </div>
          <div className="python-output-wrap">
            <div className="python-toolbar"><span className="python-toolbar-title">Output</span></div>
            <pre className="python-output">{output}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
