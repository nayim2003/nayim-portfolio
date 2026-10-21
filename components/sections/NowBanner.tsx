export default function NowBanner() {
  return (
    <section id="now" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="now-live-banner">
          <div className="now-pulse" />
          <div className="now-content">
            <div className="now-label">CURRENTLY WORKING ON</div>
            <div className="now-title">Building FinGuard AI · NLP for Financial Documents</div>
            <div className="now-meta"><span>🎯 Project 07</span><span>⚡ Recently updated</span></div>
          </div>
          <a className="now-link" href="#projects">See Details →</a>
        </div>
      </div>
    </section>
  );
}
