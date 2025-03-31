import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial, DoubleSide } from 'three';
import { Box } from '@react-three/drei';

interface BuildingProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}

function Building({ position, size, color = '#808080' }: BuildingProps) {
  return (
    <Box position={position} args={size} castShadow receiveShadow>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

export function Buildings() {
  // Define buildings in a grid layout
  const buildings = useMemo(() => {
    const buildingsArray: { position: [number, number, number]; size: [number, number, number]; color: string }[] = [];
    
    // Create a grid of buildings
    for (let x = -25; x <= 25; x += 10) {
      for (let z = -25; z <= 25; z += 10) {
        // Skip the center area to create a town square
        if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
        
        // Randomize building properties
        const height = 2 + Math.random() * 8;
        const width = 3 + Math.random() * 3;
        const depth = 3 + Math.random() * 3;
        
        // Generate random gray shade for building
        const grayValue = Math.floor(100 + Math.random() * 155).toString(16);
        const color = `#${grayValue}${grayValue}${grayValue}`;
        
        buildingsArray.push({
          position: [x, height / 2, z],
          size: [width, height, depth],
          color
        });
      }
    }
    
    return buildingsArray;
  }, []);

  return (
    <group>
      {buildings.map((building, index) => (
        <Building 
          key={index} 
          position={building.position} 
          size={building.size} 
          color={building.color}
        />
      ))}
    </group>
  );
}
