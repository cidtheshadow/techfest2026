'use client';

import TopBar from './TopBar';
import SidePanel from './SidePanel';
import BottomBar from './BottomBar';

interface HudFrameProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HudFrame({ activeTab, setActiveTab }: HudFrameProps) {
  return (
    <div className="hud-frame">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidePanel side="left" />
      
      {/* Central Viewport HTML Overlays */}
      <div className="hud-center">
        {/* Left Panel */}
        <div className="hud-overlay-left">
          <div className="hud-panel">
            <h2 className="hud-panel-title">WELCOME TO THE MATRIX</h2>
            <p className="hud-panel-desc">
              techFEST&apos;26 is the ultimate technical and innovation festival of SLIET Longowal. Connect, create, and compete across multiple domains of innovation.
            </p>
            <div className="hud-panel-sub">
              <h3 className="hud-panel-subtitle">ACTIVE DOMAINS:</h3>
              <ul className="hud-panel-list">
                <li>ROBOZAR (Robotics Competitions)</li>
                <li>PLEXUS (Computing & Coding)</li>
                <li>GENESIS (Core Engineering Challenges)</li>
                <li>ELECTRONICA & ELECTRICA</li>
                <li>MECHANICA & CHEMICA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hud-overlay-right">
          <div className="hud-status-card">
            <div className="hud-status-title">SYSTEM STATUS</div>
            <div className="hud-status-item">
              <span>CORE TEMP:</span> <span>32°C</span>
            </div>
            <div className="hud-status-item">
              <span>MEMORY:</span> <span>64TB</span>
            </div>
            <div className="hud-status-item">
              <span>USERS:</span> <span>12,450</span>
            </div>
            <div className="hud-status-item">
              <span>LOCATION:</span> <span>SLIET, INDIA</span>
            </div>
          </div>
          <button className="hud-btn-register" onClick={() => setActiveTab('register')}>
            REGISTER NOW
          </button>
        </div>
      </div>

      <SidePanel side="right" />
      <BottomBar />
    </div>
  );
}
