import React, { useRef, useEffect } from 'react';
import { Box3, Vector3, Mesh } from 'three';
import { Box } from '@react-three/drei';
import { registerCollidable } from '../hooks/useCollisionDetection';

interface CollidableBuildingProps {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}

export function CollidableBuilding({ id, position, size, color = '#808080' }: CollidableBuildingProps) {
  const meshRef = useRef<Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      const [width, height, depth] = size;
      const [x, y, z] = position;
      
      // Create bounding box for collision
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const halfDepth = depth / 2;
      
      const bounds = new Box3(
        new Vector3(x - halfWidth, y - halfHeight, z - halfDepth),
        new Vector3(x + halfWidth, y + halfHeight, z + halfDepth)
      );
      
      // Register this building as a collidable object
      const unregister = registerCollidable(id, bounds);
      
      // Clean up registration when component unmounts
      return () => {
        unregister();
      };
    }
  }, [id, position, size]);
  
  return (
    <Box ref={meshRef} position={position} args={size} castShadow receiveShadow>
      <meshStandardMaterial color={color} />
    </Box>
  );
}
