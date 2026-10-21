'use client';
import { useState } from 'react';

const KB = [
  { keys: ['skill', 'skills', 'tools'], ans: 'Skills: Python, SQL, Pandas, NumPy, Scikit-learn, XGBoost, PyTorch, NLP, Power BI.' },
  { keys: ['project', 'projects'], ans: 'Nayim has 8 major projects including TraceVision, Churn, House Price, Segmentation, Fraud, Banking AI, FinGuard, Retail ML.' },
  { keys: ['experience', 'job'], ans: 'Data Analyst at Sarte Fashion Ltd. (Feb 2024 – Dec 2025).' },
  { keys: ['contact', 'email', 'reach'], ans: 'Email: mdnayimhowlader66@gmail.com · WhatsApp: +880 1857 872494' },
  { keys: ['education', 'study'], ans: 'BSc (Honours) in Statistics — Dhaka College.' },
  { keys: ['certification', 'certificate'], ans: '14 certifications from IBM, Ostad, Udemy, UniAthena, Great Learning.' },
  { keys: ['hello', 'hi', 'hey'], ans: 'Hi! Ask me anything about Nayim.' },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ who: string; text: string }[]>([{ who: 'bot', text: "👋 Hi! Ask me anything about Nayim's skills, projects, or contact." }]);
  const [input, setInput] = useState('');

  function send() {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMsgs(m => [...m, { who: 'user', text: input }]);
    setInput('');
    const entry = KB.find(e => e.keys.some(k => q.includes(k)));
    setTimeout(() => setMsgs(m => [...m, { who: 'bot', text: entry?.ans || "I'm not sure. Try asking about skills, projects, or contact." }]), 400);
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(o => !o)} aria-label="Open chat">
        <span className="chat-icon">💬</span>
      </button>
      {open && (
        <div className="chat-window open">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-title">Ask me anything</div>
                <div className="chat-status"><span className="chat-dot" />Online</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.who}`}><div className="chat-bubble">{m.text}</div></div>
            ))}
          </div>
          <div className="chat-input-wrap">
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask a question..." />
            <button className="chat-send" onClick={send}>↗</button>
          </div>
        </div>
      )}
    </>
  );
}
