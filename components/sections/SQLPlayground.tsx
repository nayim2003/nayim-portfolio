'use client';
import { useEffect, useState } from 'react';

const DEFAULT_SQL = `SELECT c.name, COUNT(o.id) AS orders, SUM(o.amount) AS total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total DESC
LIMIT 5;`;

export default function SQLPlayground() {
  const [sql, setSql] = useState(DEFAULT_SQL);
  const [result, setResult] = useState<any>(null);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!(window as any).initSqlJs) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/sql-wasm.js';
            s.onload = () => resolve();
            s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        const SQL = await (window as any).initSqlJs({ locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/${f}` });
        const d = new SQL.Database();
        d.run(`CREATE TABLE customers (id INT, name TEXT);`);
        d.run(`INSERT INTO customers VALUES (1,'Ayesha'),(2,'Rafiq'),(3,'Nusrat'),(4,'Karim'),(5,'Fatima');`);
        d.run(`CREATE TABLE orders (id INT, customer_id INT, amount REAL);`);
        d.run(`INSERT INTO orders VALUES (1,1,1250.5),(2,1,890),(3,2,2100),(4,3,550),(5,3,1450),(6,4,3200),(7,5,780);`);
        setDb(d);
        exec(d, DEFAULT_SQL);
      } catch (e) { console.error(e); }
    })();
  }, []);

  function exec(d: any, query: string) {
    if (!d) return;
    try {
      const r = d.exec(query);
      if (!r.length) setResult({ empty: true });
      else setResult(r[0]);
    } catch (e: any) { setResult({ error: e.message }); }
  }

  return (
    <section id="sql" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">11 / SQL Playground</div>
          <h2>Practice SQL right here.</h2>
        </div>
        <div className="sql-playground">
          <div className="sql-main">
            <div className="python-toolbar">
              <span className="python-toolbar-title">query.sql</span>
              <button className="lab-btn" onClick={() => exec(db, sql)}>▶ EXECUTE</button>
            </div>
            <textarea id="sqlCode" value={sql} onChange={e => setSql(e.target.value)} spellCheck={false} />
            <div className="sql-result-wrap">
              {result?.error && <div style={{ padding: 20, color: 'var(--red)' }}>{result.error}</div>}
              {result?.empty && <div style={{ padding: 20, color: 'var(--muted)' }}>No rows</div>}
              {result?.columns && (
                <div className="sql-result">
                  <table>
                    <thead><tr>{result.columns.map((c: string) => <th key={c}>{c}</th>)}</tr></thead>
                    <tbody>{result.values.map((row: any[], i: number) => (
                      <tr key={i}>{row.map((v, j) => <td key={j}>{v === null ? 'NULL' : String(v)}</td>)}</tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
