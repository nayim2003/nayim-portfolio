'use client';
import { EMAIL, WHATSAPP, ZOOM } from '@/lib/data';
import { useState } from 'react';
import { showToast } from '@/lib/toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { showToast('Fill all fields', 'error'); return; }
    setSending(true);
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_vu7j689',
          template_id: 'template_8pi901i',
          user_id: 'ySJEdDZq_yOlTrPvl',
          template_params: { from_name: form.name, from_email: form.email, message: form.message, reply_to: form.email },
        }),
      });
      if (res.ok) { showToast('✓ Sent!', 'success'); setForm({ name: '', email: '', message: '' }); }
      else throw new Error();
    } catch { showToast('Failed — email directly', 'error'); }
    setSending(false);
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="section-heading">
          <div className="section-label">14 / Get In Touch</div>
          <h2>Let's make data useful.</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-card">
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Direct Contact</h2>
              <p>Reach out — I reply within 24 hours.</p>
              <div className="hero-actions">
                <a className="button" href={`mailto:${EMAIL}`}>Email Me ↗</a>
                <a className="button button-outline" href="https://linkedin.com/in/nayim2023" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-item"><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              <div className="contact-item"><span>GitHub</span><a href="https://github.com/nayim2003" target="_blank" rel="noopener noreferrer">github.com/nayim2003 ↗</a></div>
              <div className="contact-item"><span>Location</span><div>Bangladesh · Remote</div></div>
            </div>
          </div>

          <div>
            <div className="contact-quick">
              <div className="quick-card whatsapp">
                <div className="quick-icon">💬</div>
                <div className="quick-body">
                  <div className="quick-title">Chat on WhatsApp</div>
                  <div className="quick-sub">+880 1857 872494</div>
                </div>
                <a className="quick-btn" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">Chat →</a>
              </div>
              <div className="quick-card zoom">
                <div className="quick-icon">📹</div>
                <div className="quick-body">
                  <div className="quick-title">Start Zoom call</div>
                  <div className="quick-sub">Instant meeting</div>
                </div>
                <a className="quick-btn" href={ZOOM} target="_blank" rel="noopener noreferrer">Join →</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-heading">Send a message</div>
              <div className="form-group"><label>Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="form-group"><label>Message</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required /></div>
              <button type="submit" className="form-submit" disabled={sending}>{sending ? 'Sending…' : 'Send Message ↗'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
