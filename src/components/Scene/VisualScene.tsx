'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Vector3 } from 'three';
import CentralMonitor from './CentralMonitor';
import FloatingParticles from './FloatingParticles';
import PostFX from './PostProcessing';

interface VisualSceneProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
}

// Camera transition controller
function CameraController({ activeTab, controlsRef }: { activeTab: string; controlsRef: any }) {
  const { camera } = useThree();

  // Target positions and lookAt vectors based on active tab
  const posTarget = new Vector3();
  const lookTarget = new Vector3();

  if (activeTab === 'home' || activeTab === 'register' || activeTab === 'faq') {
    posTarget.set(0, 1.6, 1.8);
    lookTarget.set(0, 1.5, -4);
  } else if (activeTab === 'events') {
    posTarget.set(1.8, 1.6, 0);
    lookTarget.set(-4, 1.5, 0);
  } else if (activeTab === 'pronites') {
    posTarget.set(0, 1.6, -1.8);
    lookTarget.set(0, 1.5, 4);
  } else if (activeTab === 'sponsors') {
    posTarget.set(-1.8, 1.6, 0);
    lookTarget.set(4, 1.5, 0);
  }

  useFrame(() => {
    // Smoothly lerp camera position to active viewport spot
    camera.position.lerp(posTarget, 0.06);

    // Smoothly lerp OrbitControls lookAt target
    if (controlsRef.current) {
      controlsRef.current.target.lerp(lookTarget, 0.06);
      controlsRef.current.update();
    }
  });

  return null;
}

export default function VisualScene({ activeTab, setActiveTab, selectedDomain, setSelectedDomain }: VisualSceneProps) {
  const controlsRef = useRef<any>(null);
  const bgTexture = useTexture('/warehouse_bg.jpg');

  return (
    <>
      {/* 360-Degree Warehouse Environment Walls (Faced Inward) */}
      {/* North Wall */}
      <mesh position={[0, 1.5, -9]} rotation={[0, 0, 0]}>
        <planeGeometry args={[24, 13.5]} />
        <meshBasicMaterial map={bgTexture} depthWrite={false} />
      </mesh>
      {/* West Wall */}
      <mesh position={[-9, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[24, 13.5]} />
        <meshBasicMaterial map={bgTexture} depthWrite={false} />
      </mesh>
      {/* South Wall */}
      <mesh position={[0, 1.5, 9]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[24, 13.5]} />
        <meshBasicMaterial map={bgTexture} depthWrite={false} />
      </mesh>
      {/* East Wall */}
      <mesh position={[9, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[24, 13.5]} />
        <meshBasicMaterial map={bgTexture} depthWrite={false} />
      </mesh>

      {/* Volumetric cobalt fog - tighter for immersive room bounds */}
      <fog attach="fog" args={['#020617', 5, 20]} />

      {/* Lighting: near-darkness with dramatic accent lights */}
      <ambientLight intensity={0.05} color="#0891b2" />
      
      {/* Glow lamps around the center coordinate */}
      <pointLight position={[0, 0.5, -4.5]} intensity={3} color="#00f2ff" distance={10} />
      <pointLight position={[-4.5, 0.5, 0]} intensity={3} color="#00f2ff" distance={10} />
      <pointLight position={[0, 0.5, 4.5]} intensity={3} color="#00f2ff" distance={10} />
      <pointLight position={[4.5, 0.5, 0]} intensity={3} color="#00f2ff" distance={10} />

      {/* Overhead warehouse spot */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.8}
        penumbra={0.6}
        intensity={2.0}
        color="#1d4ed8"
      />

      {/* Floor grid covering the full 360 layout */}
      <gridHelper args={[80, 40, '#1d4ed8', '#090d16']} position={[0, -0.2, 0]} />

      {/* 360-degree orbit controls with locked pitch but open yaw rotation */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 1.8}
      />

      {/* Active camera transition coordinator */}
      <CameraController activeTab={activeTab} controlsRef={controlsRef} />

      {/* 4 Holographic Monitors positioned around the camera */}
      <CentralMonitor 
        type="home" 
        position={[0, 1.5, -4]} 
        rotation={[0, 0, 0]} 
        onClick={() => setActiveTab('home')}
      />
      <CentralMonitor 
        type="events" 
        position={[-4, 1.5, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        onClick={() => setActiveTab('events')}
      />
      <CentralMonitor 
        type="pronites" 
        position={[0, 1.5, 4]} 
        rotation={[0, Math.PI, 0]} 
        onClick={() => setActiveTab('pronites')}
      />
      <CentralMonitor 
        type="sponsors" 
        position={[4, 1.5, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        onClick={() => setActiveTab('sponsors')}
      />
      
      {/* Floating particles throughout the room */}
      <FloatingParticles />

      {/* Post-processing effects */}
      <PostFX />
    </>
  );
}
