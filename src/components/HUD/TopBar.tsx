'use client';

import { useState } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Events' },
  { id: 'pronites', label: 'Pronites' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'register', label: 'Register' },
];

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TopBar({ activeTab, setActiveTab }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="hud-top">
        {/* Top Left: Status Indicators & FAQ click */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a 
            className="hud-top-flank" 
            onClick={() => handleLinkClick('faq')}
            style={{ cursor: 'pointer', marginRight: '16px' }}
          >
            FAQ
          </a>
          <div className="hud-side-mobile-hide" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.55rem', color: 'rgba(0, 242, 255, 0.4)', letterSpacing: '0.1em' }}>SYS // ON_LINE</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    background: i < 6 ? 'var(--cyan)' : 'rgba(0, 242, 255, 0.2)',
                    boxShadow: i < 6 ? '0 0 5px var(--cyan)' : 'none' 
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Center: Logo block using Kubo/Syncopate casing */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontSize: '0.5rem', color: 'rgba(0, 242, 255, 0.5)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            SLIET LONGOWAL // TECHFEST MATRIX
          </span>
          <div className="hud-logotype" style={{ fontSize: '1.5rem', margin: 0, padding: 0 }}>
            TECH<span>FEST</span>&apos;26
          </div>
        </div>

        {/* Top Right: Nav menu & Hamburger for mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Desktop inline nav links */}
          <div className="hud-nav-buttons hud-side-mobile-hide" style={{ display: 'flex', gap: '4px' }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`hud-nav-link ${activeTab === link.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.id)}
                style={{ border: 'none', padding: '6px 12px', fontSize: '0.65rem' }}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <a 
            className="hud-top-flank hud-side-mobile-hide" 
            onClick={() => handleLinkClick('register')}
            style={{ cursor: 'pointer' }}
          >
            REGISTRATION
          </a>

          {/* Hamburger button (visible on mobile only) */}
          <button 
            className="hud-hamburger" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sliding Cyber Hamburger Menu Overlay */}
      <div className={`hud-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="hud-mobile-menu-inner">
          <div className="hud-mobile-menu-header">
            <span style={{ fontSize: '0.6rem', color: 'var(--teal)' }}>NAVIGATIONAL PROTOCOL // MAIN</span>
            <button className="hud-mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <div className="hud-mobile-menu-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`hud-mobile-menu-link ${activeTab === link.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </button>
            ))}
            <div style={{ margin: '20px 0', borderTop: '1px solid rgba(0, 242, 255, 0.2)' }} />
            <button className="hud-mobile-menu-link" onClick={() => handleLinkClick('register')}>
              REGISTRATION
            </button>
            <button className="hud-mobile-menu-link" onClick={() => handleLinkClick('faq')}>
              FAQ
            </button>
          </div>
          <div className="hud-mobile-menu-footer">
            <div>NODE: TF-26-MOBILE</div>
            <div>STATUS: ENCRYPTED LINK</div>
          </div>
        </div>
      </div>
    </>
  );
}
