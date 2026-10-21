'use client';
import { useState, useRef } from 'react';

export default function VideoIntro() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  function play() { setPlaying(true); setTimeout(() => videoRef.current?.play().catch(() => {}), 100); }
  function onEnded() { setPlaying(false); if (videoRef.current) videoRef.current.currentTime = 0; }

  return (
    <section id="intro" className="video-intro-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="video-intro-card">
          <div className="video-intro-content">
            <div className="section-label">1-Minute+ Intro</div>
            <h2>Hi, I'm Nayim.<br />Let me introduce myself.</h2>
            <p className="section-description">A quick look at who I am and how I approach data.</p>
            <div className="video-intro-meta">
              <span className="video-meta-item">⏱️ 1 min+ intro</span>
              <span className="video-meta-item">🎙️ English</span>
            </div>
          </div>
          <div className="video-intro-player">
            {!playing && (
              <div className="video-poster" onClick={play}>
                <img src="/assets/video-poster.jpg" alt="Video poster" />
                <div className="video-overlay" />
                <button className="video-play-btn" aria-label="Play">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <div className="video-poster-label"><span className="video-live-dot" />Watch my intro</div>
              </div>
            )}
            <video ref={videoRef} className="video-element" preload="metadata" playsInline controls onEnded={onEnded}
              style={{ display: playing ? 'block' : 'none', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="/assets/intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
