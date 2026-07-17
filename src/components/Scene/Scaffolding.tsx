'use client';

import { useMemo } from 'react';

interface Pole {
  position: [number, number, number];
}

interface Bar {
  position: [number, number, number];
  args: [number, number, number];
}

export default function Scaffolding() {
  // Vertical poles at the four corners
  const poles = useMemo<Pole[]>(
    () => [
      { position: [-0.8, 3, -0.8] },
      { position: [0.8, 3, -0.8] },
      { position: [0.8, 3, 0.8] },
      { position: [-0.8, 3, 0.8] },
    ],
    []
  );

  // Horizontal bars at each level
  const levels = useMemo(() => [2, 4, 6], []);

  const horizontalBars = useMemo<Bar[]>(() => {
    const bars: Bar[] = [];

    for (const y of levels) {
      // X-axis bars (front and back)
      bars.push({ position: [0, y, -0.8], args: [1.6, 0.03, 0.03] });
      bars.push({ position: [0, y, 0.8], args: [1.6, 0.03, 0.03] });

      // Z-axis bars (left and right)
      bars.push({ position: [-0.8, y, 0], args: [0.03, 0.03, 1.6] });
      bars.push({ position: [0.8, y, 0], args: [0.03, 0.03, 1.6] });
    }

    return bars;
  }, [levels]);

  return (
    <group position={[5, 0, -6]}>
      {/* Vertical poles */}
      {poles.map((pole, i) => (
        <mesh key={`pole-${i}`} position={pole.position}>
          <cylinderGeometry args={[0.03, 0.03, 6, 8]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Horizontal cross-bars */}
      {horizontalBars.map((bar, i) => (
        <mesh key={`bar-${i}`} position={bar.position}>
          <boxGeometry args={bar.args} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Cyan beacon light at the top */}
      <pointLight position={[0, 6.5, 0]} intensity={0.5} color="#00f2ff" distance={5} />
    </group>
  );
}
