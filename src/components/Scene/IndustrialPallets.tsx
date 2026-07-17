'use client';

import { useMemo } from 'react';
import { Edges } from '@react-three/drei';

interface Pallet {
  position: [number, number, number];
  size: [number, number, number];
}

export default function IndustrialPallets() {
  const pallets = useMemo<Pallet[]>(
    () => [
      { position: [0, 0.4, 0], size: [1.8, 0.8, 1.5] },
      { position: [0.2, 1.2, 0.1], size: [1.5, 0.7, 1.3] },
      { position: [-0.1, 1.9, -0.1], size: [1.6, 0.6, 1.4] },
      { position: [2.2, 0.35, 0.5], size: [1.2, 0.7, 1.0] },
      { position: [2.0, 1.0, 0.3], size: [1.0, 0.5, 0.9] },
    ],
    []
  );

  return (
    <group position={[-5, 0, -6]}>
      {pallets.map((pallet, i) => (
        <mesh key={i} position={pallet.position}>
          <boxGeometry args={pallet.size} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.8} />
          <Edges>
            <lineBasicMaterial color="#1d4ed8" transparent opacity={0.15} />
          </Edges>
        </mesh>
      ))}
    </group>
  );
}
