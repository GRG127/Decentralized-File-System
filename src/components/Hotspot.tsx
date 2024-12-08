import { Html } from '@react-three/drei';
import { useState } from 'react';
import { Hotspot as HotspotType } from '../types/Location';

interface HotspotProps {
  hotspot: HotspotType;
}

export function Hotspot({ hotspot }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <group position={hotspot.position as [number, number, number]}>
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setIsInfoVisible(!isInfoVisible)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={isHovered ? '#00ff00' : '#ffffff'} />
      </mesh>
      
      {isInfoVisible && (
        <Html position={[1, 1, 0]}>
          <div className="bg-black/80 text-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-lg font-bold mb-2">{hotspot.title}</h3>
            <p className="text-sm">{hotspot.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}