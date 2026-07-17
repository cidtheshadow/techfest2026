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
            <h2 className="hud-panel-title">WELCOME TO THE FUTURE OF COMPUTATION</h2>
            <p className="hud-panel-desc">
              Explore the Industrial Cyber-Terminal Portfolio Matrix. Innovation, Engineering, and Technology Converge.
            </p>
            <div className="hud-panel-sub">
              <h3 className="hud-panel-subtitle">UPCOMING EVENTS:</h3>
              <ul className="hud-panel-list">
                <li>AI & ROBOTICS CHALLENGE</li>
                <li>CYBERSECURITY HACKATHON</li>
                <li>SUSTAINABLE ENERGY SYMPOSIUM</li>
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
