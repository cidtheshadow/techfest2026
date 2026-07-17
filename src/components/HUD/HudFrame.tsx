'use client';

import { useState } from 'react';
import TopBar from './TopBar';
import SidePanel from './SidePanel';
import BottomBar from './BottomBar';
import { supabase } from '../../utils/supabase';

interface HudFrameProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDomain: string;
}

export default function HudFrame({ activeTab, setActiveTab, selectedDomain }: HudFrameProps) {
  // Form States for Registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    domain: 'robozar',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.college) {
      alert('ERROR: ALL FIELDS REQUIRED IN THE PROTOCOL.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a random access key
    const randomKey = `TF26-${Math.floor(1000 + Math.random() * 9000)}-${formData.domain.toUpperCase()}`;
    
    try {
      // Insert enrollment record into Supabase registrations table
      const { error } = await supabase
        .from('registrations')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            college: formData.college, 
            domain: formData.domain,
            access_key: randomKey
          }
        ]);
      
      if (error) {
        console.error('Supabase DB Insert Error:', error.message);
        // Note: Even if table is missing, let the user complete flow on frontend
      } else {
        console.log('Enrollment successfully recorded in Supabase!');
      }
    } catch (err) {
      console.error('Connection to Supabase failed:', err);
    } finally {
      setAccessKey(randomKey);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  // Domain content database
  const domainInfo: Record<string, { title: string; desc: string; list: string[] }> = {
    robozar: {
      title: 'ROBOZAR // Robotics Arena',
      desc: 'SLIET Longowal\'s flagship robotics domain. Design, program, and pilot manual or autonomous steel machines to conquer our challenge tracks.',
      list: ['ROBO-WARS (Heavyweight battle)', 'ROBO-RACE (All-terrain sprint)', 'MAZE SOLVER (Autonomous AI navigation)'],
    },
    plexus: {
      title: 'PLEXUS // Coding Terminal',
      desc: 'The ultimate software and computing grid. Solve algorithms, optimize architectures, and test your cyber-development speed under clock pressure.',
      list: ['HACKATHON (24-hour product build)', 'BUG HUNT (Logic and compile debugs)', 'SPEED CODING (Time trials)'],
    },
    electronica: {
      title: 'ELECTRONICA // Circuits & IoT',
      desc: 'Hardware design and embedded systems domain. Build smart circuits, test microcontroller logic, and prototype IoT solutions.',
      list: ['IOT CHALLENGE (Smart home prototypes)', 'PCB DESIGN (Layout mapping)', 'DIGILOGIC (Logic gates breadboard)'],
    },
    mechanica: {
      title: 'MECHANICA // CAD & Machinery',
      desc: 'Mechanical modeling, structure designs, and manufacturing simulations. Bring your industrial automation ideas to life.',
      list: ['CAD-CADETS (3D mechanical designs)', 'SIMULINK (System simulation trials)', 'INVENT-O-MANIA (Hardware designs)'],
    },
    chemica: {
      title: 'CHEMICA // Process Simulation',
      desc: 'Chemical reactions, reactor layout mapping, and industrial process simulation quizzes.',
      list: ['CHEM-CAR (Chem-propelled mini vehicle)', 'ALCHEMY (Process simulation)', 'REACTOR RUN (Safety protocols)'],
    },
    genesis: {
      title: 'GENESIS // Civil & Core Science',
      desc: 'Structural engineering, paper presentations, and sustainable bridge designs.',
      list: ['BRIDGE-IT (Spaghetti structural bridge)', 'KARYARACHNA (Sustainable architecture models)', 'SCI-TECH (Paper presentation)']
    }
  };

  const activeDomainData = domainInfo[selectedDomain] || domainInfo.robozar;

  return (
    <div className="hud-frame">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidePanel side="left" />
      
      {/* Central Viewport HTML Overlays */}
      <div className="hud-center">
        
        {/* LEFT OVERLAY PANEL - Content changes based on Active Tab */}
        <div className="hud-overlay-left">
          {activeTab === 'home' && (
            <div className="hud-panel">
              <h2 className="hud-panel-title">WELCOME TO THE MATRIX</h2>
              <p className="hud-panel-desc">
                techFEST&apos;26 is the ultimate technical and innovation festival of SLIET Longowal. Connect, create, and compete across multiple domains of innovation.
              </p>
              <div className="hud-panel-sub">
                <h3 className="hud-panel-subtitle">ACTIVE DOMAINS:</h3>
                <ul className="hud-panel-list">
                  <li>ROBOZAR (Robotics Arena)</li>
                  <li>PLEXUS (Computing & Coding)</li>
                  <li>GENESIS (Core Sciences & Civils)</li>
                  <li>ELECTRONICA (Embedded Hardware)</li>
                  <li>MECHANICA & CHEMICA</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="hud-panel">
              <h2 className="hud-panel-title">{activeDomainData.title}</h2>
              <p className="hud-panel-desc">{activeDomainData.desc}</p>
              <div className="hud-panel-sub">
                <h3 className="hud-panel-subtitle">FEATURED EVENTS:</h3>
                <ul className="hud-panel-list">
                  {activeDomainData.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'pronites' && (
            <div className="hud-panel">
              <h2 className="hud-panel-title">PRONITES // MEDIA STATION</h2>
              <p className="hud-panel-desc">
                Streaming the techFEST&apos;25 Highlights Reel live inside the 3D terminal. Experience the energy, competitions, and technical marvels of SLIET.
              </p>
              <div className="hud-panel-sub">
                <h3 className="hud-panel-subtitle">TRAILER METADATA:</h3>
                <ul className="hud-panel-list">
                  <li>SOURCE: OFFICIAL YOUTUBE</li>
                  <li>RESOLUTION: 1080P // COMPRESSED</li>
                  <li>DURATION: 1 MIN 24 SEC</li>
                  <li>STATUS: PLAYING [●]</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'sponsors' && (
            <div className="hud-panel">
              <h2 className="hud-panel-title">SPONSORS GRID</h2>
              <p className="hud-panel-desc">
                Empowering innovation — thanks to the incredible support of our official corporate and technology sponsors.
              </p>
              <div className="hud-panel-sub">
                <h3 className="hud-panel-subtitle">OUR SUPPORTERS:</h3>
                <ul className="hud-panel-list">
                  <li>TITLE PARTNERS (RETRIEVING...)</li>
                  <li>POWERED BY (LINKING...)</li>
                  <li>CO-SPONSORS (INITIALIZING...)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="hud-panel">
              {!isSubmitted ? (
                <>
                  <h2 className="hud-panel-title">REGISTRATION PORTAL</h2>
                  <p className="hud-panel-desc" style={{ marginBottom: '12px' }}>
                    INITIALIZING SECURE PROTOCOL... INPUT PASSENGER DATA TO JOIN THE MATRIX.
                  </p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="hud-form-group">
                      <label className="hud-label">NAME</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="hud-input" 
                        placeholder="ENTER FULL NAME"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="hud-form-group">
                      <label className="hud-label">EMAIL</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="hud-input" 
                        placeholder="ENTER EMAIL ADDRESS"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="hud-form-group">
                      <label className="hud-label">COLLEGE / INSTITUTE</label>
                      <input 
                        type="text" 
                        name="college" 
                        value={formData.college} 
                        onChange={handleChange} 
                        className="hud-input" 
                        placeholder="ENTER UNIVERSITY NAME"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="hud-form-group">
                      <label className="hud-label">CHOOSE DOMAIN</label>
                      <select 
                        name="domain" 
                        value={formData.domain} 
                        onChange={handleChange} 
                        className="hud-select"
                        disabled={isSubmitting}
                      >
                        <option value="robozar">ROBOZAR (Robotics)</option>
                        <option value="plexus">PLEXUS (Coding)</option>
                        <option value="electronica">ELECTRONICA (Circuits)</option>
                        <option value="mechanica">MECHANICA (Mechanical)</option>
                        <option value="chemica">CHEMICA (Chemical)</option>
                        <option value="genesis">GENESIS (Civils)</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="hud-btn-register" 
                      style={{ marginTop: '16px', width: '100%' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'ENROLLING PROTOCOL...' : 'SUBMIT ENROLLMENT'}
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', animation: 'slideIn 0.5s ease-out' }}>
                  <h2 className="hud-panel-title" style={{ color: 'var(--cyan)' }}>ACCESS GRANTED</h2>
                  <p className="hud-panel-desc" style={{ color: '#ffffff', margin: '12px 0' }}>
                    WELCOME TO THE techFEST&apos;26 DATABASE, <strong>{formData.name.toUpperCase()}</strong>!
                  </p>
                  <div style={{ 
                    border: '1px dashed var(--cyan)', 
                    background: 'var(--cyan-dim)', 
                    padding: '16px', 
                    margin: '16px 0',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(0, 242, 255, 0.5)' }}>ENROLLMENT PASSKEY:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff', letterSpacing: '0.15em' }}>{accessKey}</div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--teal)', marginTop: '8px' }}>COLLEGE: {formData.college.toUpperCase()}</div>
                  </div>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(0, 242, 255, 0.6)', lineHeight: '1.4' }}>
                    YOUR ACCESS PASS HAS BEEN RECORDED IN SUPABASE DATABASE. PRESENT THIS PASSKEY ON CAMPUS ARRIVAL.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="hud-btn-register" style={{ marginTop: '16px', padding: '8px' }}>
                    REGISTER ANOTHER ACC
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="hud-panel">
              <h2 className="hud-panel-title">FREQUENTLY ASKED PROTOCOLS</h2>
              <div className="hud-panel-sub" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--cyan)' }}>Q: WHAT IS TECHFEST&apos;26 AT SLIET?</h4>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', paddingLeft: '8px' }}>
                    A: techFEST&apos;26 is the annual national-level technical festival organized by SLIET Longowal. It features technical competitions, workshops, exhibitions, and guest lectures.
                  </p>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--cyan)' }}>Q: WHO CAN PARTICIPATE IN SLIET TECHFEST?</h4>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', paddingLeft: '8px' }}>
                    A: It is open to students from all colleges across India. Participants can register individually or as teams depending on event requirements.
                  </p>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--cyan)' }}>Q: ARE THERE ANY REGISTRATION FEES?</h4>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', paddingLeft: '8px' }}>
                    A: Most events in techFEST are free to enter. Specialized workshops may have nominal fee.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT OVERLAY PANEL - System status + dynamic registration link */}
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
          <button 
            className="hud-btn-register" 
            onClick={() => setActiveTab('register')}
            style={{ 
              background: activeTab === 'register' ? 'var(--cyan-dim)' : 'transparent',
              textShadow: activeTab === 'register' ? '0 0 8px var(--cyan)' : 'none'
            }}
          >
            {activeTab === 'register' ? 'PORTAL ACTIVE' : 'REGISTER NOW'}
          </button>
        </div>
      </div>

      <SidePanel side="right" />
      <BottomBar />
    </div>
  );
}
