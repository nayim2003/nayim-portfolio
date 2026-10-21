'use client';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [visits, setVisits] = useState(0);
  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem('visits') || '0', 10) + 1;
      localStorage.setItem('visits', String(v));
      setVisits(v);
    } catch { setVisits(1); }
  }, []);
  return (
    <footer>
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Md. Nayim Howlader. All rights reserved.</p>
        <p className="footer-visitors">
          <span className="dot-live" />
          <span>{visits.toLocaleString()}</span> visits · 14 certificates
        </p>
      </div>
    </footer>
  );
}
