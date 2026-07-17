'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture, Html } from '@react-three/drei';
import { DoubleSide } from 'three';
import type { Group, Mesh } from 'three';

interface CentralMonitorProps {
  type: 'home' | 'events' | 'pronites' | 'sponsors';
  position: [number, number, number];
  rotation: [number, number, number];
  selectedDomain?: string;
  setSelectedDomain?: (domain: string) => void;
}

export default function CentralMonitor({ 
  type, 
  position, 
  rotation,
  selectedDomain,
  setSelectedDomain
}: CentralMonitorProps) {
  const groupRef = useRef<Group>(null);
  const ringRef1 = useRef<Mesh>(null);
  const ringRef2 = useRef<Mesh>(null);
  
  // Track hovered state for event items locally for visual feedback
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Load techFEST logo texture
  const logoTex = useTexture('/logo.png');

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle floating oscillation
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + (type === 'events' ? 1.5 : type === 'pronites' ? 3.0 : 0)) * 0.05;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = clock.elapsedTime * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 3D Holographic Display Background / Glass Plate */}
      <mesh>
        <planeGeometry args={[4.5, 2.8]} />
        <meshPhysicalMaterial
          color="#00f2ff"
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          ior={1.2}
          side={DoubleSide}
        />
      </mesh>

      {/* Outer Cyan Wireframe Border */}
      <mesh>
        <planeGeometry args={[4.52, 2.82]} />
        <meshBasicMaterial color="#00f2ff" wireframe side={DoubleSide} transparent opacity={0.3} />
      </mesh>

      {/* Screen Glowing Underlight */}
      <pointLight position={[0, -0.5, 0.2]} intensity={2.5} color="#00f2ff" distance={8} />

      {/* TYPE 1: HOME - Holographic Reticle + Center Logo */}
      {type === 'home' && (
        <group>
          {/* Concentric rotating HUD rings behind/around the logo */}
          <mesh ref={ringRef1} position={[0, 0, 0.02]}>
            <ringGeometry args={[0.9, 0.92, 64]} />
            <meshBasicMaterial color="#00f2ff" transparent opacity={0.35} side={DoubleSide} />
          </mesh>
          <mesh ref={ringRef2} position={[0, 0, 0.02]}>
            <ringGeometry args={[1.05, 1.1, 64, 1, 0, Math.PI * 1.6]} />
            <meshBasicMaterial color="#00f2ff" transparent opacity={0.5} side={DoubleSide} />
          </mesh>

          {/* Additional target ticks */}
          {[0, 90, 180, 270].map((rot, idx) => (
            <mesh key={idx} position={[0, 0, 0.02]} rotation={[0, 0, (rot * Math.PI) / 180]}>
              <planeGeometry args={[0.04, 0.25]} />
              <meshBasicMaterial color="#00f2ff" transparent opacity={0.6} />
            </mesh>
          ))}

          {/* Logo Plane */}
          <mesh position={[0, 0.05, 0.05]}>
            <planeGeometry args={[2.5, 1.0]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} />
          </mesh>
        </group>
      )}

      {/* TYPE 2: EVENTS - Monospace Technical Terminals (Updated with SLIET domains) */}
      {type === 'events' && (
        <group position={[0, 0.8, 0.05]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#00f2ff"
            anchorX="center"
          >
            EVENTS TERMINAL
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.12}
            color="rgba(0, 242, 255, 0.5)"
            anchorX="center"
          >
            /// SELECT DOMAIN TO VIEW DETAILS
          </Text>
          
          {/* Clickable real SLIET domains list */}
          {[
            'ROBOZAR',
            'PLEXUS',
            'ELECTRONICA',
            'MECHANICA',
            'CHEMICA',
            'GENESIS'
          ].map((item, idx) => {
            const itemId = item.toLowerCase();
            const isSelected = selectedDomain === itemId;
            const isHovered = hoveredItem === itemId;
            
            return (
              <Text
                key={idx}
                position={[0, -0.45 - idx * 0.22, 0]}
                fontSize={0.14}
                color={isSelected ? '#00f2ff' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}
                anchorX="center"
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredItem(itemId);
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  setHoveredItem(null);
                  document.body.style.cursor = 'crosshair';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (setSelectedDomain) {
                    setSelectedDomain(itemId);
                  }
                }}
              >
                {isSelected ? `> ${item} <` : `  ${item}  `}
              </Text>
            );
          })}
        </group>
      )}

      {/* TYPE 3: PRONITES - Embedded YouTube Video highlights inside 3D screen */}
      {type === 'pronites' && (
        <group>
          {/* Main monitor screen backing plane */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[4.2, 2.5]} />
            <meshBasicMaterial color="#000000" side={DoubleSide} />
          </mesh>

          {/* Embedded YouTube Player in 3D Space - Removed occlude for guaranteed rendering */}
          <Html
            transform
            distanceFactor={2.4}
            position={[0, 0, 0.03]}
            style={{
              width: '640px',
              height: '360px',
              border: 'none',
              background: '#000',
              boxShadow: '0 0 20px rgba(0, 242, 255, 0.15)'
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/D9nvV2lxZgA?autoplay=1&mute=1&loop=1&playlist=D9nvV2lxZgA&controls=1"
              title="techFEST Highlights"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Html>
        </group>
      )}

      {/* TYPE 4: SPONSORS */}
      {type === 'sponsors' && (
        <group position={[0, 0.6, 0.05]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#00f2ff"
            anchorX="center"
          >
            SPONSORS PORTAL
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.1}
            color="rgba(0, 242, 255, 0.5)"
            anchorX="center"
          >
            /// INITIALIZING SECURE LINK
          </Text>
          
          <Text
            position={[0, -0.6, 0]}
            fontSize={0.13}
            color="#ffffff"
            anchorX="center"
            maxWidth={3.8}
            textAlign="center"
          >
            OFFICIAL CORPORATE SPONSORS LIST RETRIEVING FROM DATABASE...
          </Text>
        </group>
      )}
    </group>
  );
}
