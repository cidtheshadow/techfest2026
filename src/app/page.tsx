'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import VisualScene from '../components/Scene/VisualScene';
import HudFrame from '../components/HUD/HudFrame';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loading-text">INITIALIZING PORTAL...</div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000');
          }}
        >
          <Suspense fallback={null}>
            <VisualScene activeTab={activeTab} />
          </Suspense>
        </Canvas>
      </div>
      <div className="scanlines" />
      <HudFrame activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}
