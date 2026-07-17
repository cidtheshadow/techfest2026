'use client';

export default function BottomBar() {
  return (
    <div className="hud-bottom">
      <div />
      <div className="hud-portal-status">
        <div className="hud-status-arc" />
        <span className="hud-status-text">PORTAL STATUS: ONLINE</span>
        <div className="hud-status-arc" />
      </div>
      <div className="hud-system-card">
        <div>NODE: <span>TF-26-MAIN</span></div>
        <div>LAT: <span>30.3398°N</span></div>
        <div>LON: <span>75.6624°E</span></div>
      </div>
    </div>
  );
}
