import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Hotspot } from './Hotspot';
import { Location } from '../types/Location';

interface SceneProps {
  location: Location;
}

export function Scene({ location }: SceneProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <Sphere ref={sphereRef} args={[500, 60, 40]} scale={[-1, 1, 1]}>
        <meshBasicMaterial
          side={THREE.BackSide}
          map={new THREE.TextureLoader().load(location.imageUrl)}
        />
      </Sphere>
      
      {location.hotspots.map((hotspot) => (
        <Hotspot key={hotspot.id} hotspot={hotspot} />
      ))}
    </>
  );
}