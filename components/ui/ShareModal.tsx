'use client';
import { useState } from 'react';
import { showToast } from '@/lib/toast';

export default function ShareModal() {
  const [open, setOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  async function openShare() {
    setOpen(true);
    if (typeof window !== 'undefined' && navigator.share) {
      try { await navigator.share({ title: 'Md. Nayim Howlader', url: window.location.href }); setOpen(false); return; } catch {}
    }
    if (typeof window !== 'undefined') {
      const QRCode = (await import('qrcode')).default;
      QRCode.toDataURL(window.location.href, { width: 200, margin: 1 }, (err, url) => { if (!err) setQrUrl(url); });
    }
  }

  return (
    <>
      <button className="share-fab" onClick={openShare} aria-label="Share">🔗</button>
      {open && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            <h2>Share this portfolio</h2>
            <div className="share-modal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="share-qr" style={{ background: '#fff', padding: 16, borderRadius: 12 }}>
                {qrUrl && <img src={qrUrl} alt="QR" style={{ width: '100%' }} />}
              </div>
              <div className="share-options" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="share-option" onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied', 'success'); }}>📋 Copy Link</button>
                <a className="share-option" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener">🐦 Share on X</a>
                <a className="share-option" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener">💼 LinkedIn</a>
                <a className="share-option" href={`https://wa.me/?text=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener">💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
