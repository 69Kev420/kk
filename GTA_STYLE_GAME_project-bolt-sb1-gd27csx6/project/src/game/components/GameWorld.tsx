import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import { Player } from './Player';
import { Ground } from './Ground';
import { Buildings } from './Buildings';
import { GameHUD } from './GameHUD';
import { useCollisionDetection } from '../hooks/useCollisionDetection';
import { useGameStore } from '../store/gameStore';

export function GameWorld() {
  // Initialize collision detection
  const { checkCollisions } = useCollisionDetection();
  const { setPlayerSpeed } = useGameStore();
  
  // Set initial player speed
  useEffect(() => {
    setPlayerSpeed(5);
  }, [setPlayerSpeed]);

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Sky and environment */}
        <Sky sunPosition={[100, 10, 100]} />
        <Environment preset="city" />
        <fog attach="fog" args={['#202020', 5, 30]} />
        
        {/* Game entities */}
        <Player />
        <Ground />
        <Buildings />
        
        {/* Camera controls */}
        <OrbitControls />
      </Canvas>
      
      {/* HUD elements */}
      <GameHUD />
    </div>
  );
}
