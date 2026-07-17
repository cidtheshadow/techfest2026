'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import type { Points as PointsType } from 'three';

export default function FloatingParticles() {
  const pointsRef = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const count = 500;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;       // x: -20 to 20
      arr[i * 3 + 1] = 0.5 + Math.random() * 11.5;   // y: 0.5 to 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;   // z: -20 to 20
    }

    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f2ff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}
