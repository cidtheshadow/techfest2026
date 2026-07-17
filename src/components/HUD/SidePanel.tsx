'use client';

interface SidePanelProps {
  side: 'left' | 'right';
}

export default function SidePanel({ side }: SidePanelProps) {
  return (
    <>
      <div
        className={`hud-side ${side === 'right' ? 'right' : ''}`}
        style={{ gridArea: side === 'left' ? 'left' : 'right' }}
      >
        <div className="hud-corner" />
        <div className="hud-side-text">SYSTEM // TECHFEST MATRIX // CORE</div>
        <div className="hud-corner" />
      </div>
      {side === 'left' && (
        <div className="hud-info-console">
          <p className="highlight">&gt; SYSTEM INITIALIZED</p>
          <p>&gt; TECHFEST 2026 LOADING...</p>
          <p>&gt; SLIET LONGOWAL ANNUAL TECHNICAL FESTIVAL</p>
          <p>&gt; 50+ EVENTS REGISTERED</p>
          <p>&gt; CODING // ROBOTICS // AI</p>
          <p>&gt; WORKSHOPS // HACKATHONS</p>
          <p className="highlight">&gt; ALL SYSTEMS NOMINAL</p>
          <p>&gt; REGISTRATION: OPEN</p>
          <p>&gt; PORTAL STATUS: ACTIVE</p>
        </div>
      )}
    </>
  );
}
