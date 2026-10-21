import { USERNAME, EMAIL } from '@/lib/data';
import NeuralCanvas from '@/components/ui/NeuralCanvas';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="aurora"><div className="aurora-blob b1" /><div className="aurora-blob b2" /><div className="aurora-blob b3" /></div>
      <div className="grid-overlay" />
      <NeuralCanvas />

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-identity">
            <div className="profile-wrap">
              <img className="profile-photo lazy" src="/assets/profile.jpg" alt="Md. Nayim Howlader" />
              <div className="status-badge" />
            </div>
            <div>
              <p className="hero-name">MD. NAYIM HOWLADER</p>
              <p className="hero-role">Available for opportunities</p>
            </div>
          </div>
          <div className="eyebrow"><span className="dot" />DATA ANALYTICS · MACHINE LEARNING</div>
          <h1>Turning data into <span>decisions.</span></h1>
          <p className="hero-description">I am a Statistics professional and Data Analyst with experience in data analysis, statistical modeling, visualization, and machine learning. I turn complex datasets into meaningful insights that support better decisions.</p>
          <div className="hero-actions">
            <a className="button magnetic" href="#intro">▶ Watch Intro</a>
            <a className="button button-outline magnetic" href="#contact">Let's Connect</a>
          </div>
          <div className="social-links">
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/nayim2023" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${EMAIL}`}>Email ↗</a>
          </div>
        </div>

        <div className="visual">
          <div className="visual-glow" />
          <div className="floating-chip chip-one">◈ Statistical Thinking</div>
          <div className="dashboard">
            <div className="dash-top"><span className="dash-title">Model Training</span><span className="dash-tag">EPOCH 42/100</span></div>
            <div className="live-metric"><span className="value">0.942</span><span className="label">Accuracy</span></div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: '94%' }} /></div>
            <div className="live-metric" style={{ marginTop: 14 }}><span className="value" style={{ fontSize: '1.15rem' }}>0.087</span><span className="label">Loss</span></div>
            <svg className="chart" viewBox="0 0 320 105" preserveAspectRatio="none">
              <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4fd1c5" stopOpacity=".28" /><stop offset="100%" stopColor="#4fd1c5" stopOpacity="0" /></linearGradient></defs>
              <path className="chart-grid" d="M0 20H320 M0 52H320 M0 85H320" />
              <path className="chart-area" d="M0 86 L42 68 L80 74 L120 40 L161 52 L205 26 L246 36 L286 10 L320 16 L320 105 L0 105 Z" />
              <path className="chart-line" d="M0 86 L42 68 L80 74 L120 40 L161 52 L205 26 L246 36 L286 10 L320 16" />
            </svg>
            <div className="dash-bottom">
              <div className="mini-card"><strong>Python & SQL</strong><span>Data Analytics</span></div>
              <div className="mini-card"><strong>Machine Learning</strong><span>Predictive Modeling</span></div>
            </div>
          </div>
          <div className="floating-chip chip-two">✦ Insight-driven</div>
        </div>
      </div>
    </section>
  );
}
