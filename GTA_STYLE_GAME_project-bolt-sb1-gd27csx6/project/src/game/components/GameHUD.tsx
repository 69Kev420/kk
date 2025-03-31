import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

interface MiniMapProps {
  mapSize: number;
  scale: number;
}

function MiniMap({ mapSize, scale }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playerPosition, playerRotation } = useGameStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, mapSize, mapSize);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, mapSize, mapSize);
    
    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    const gridSize = 10;
    
    for (let i = 0; i <= mapSize; i += gridSize) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, mapSize);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(mapSize, i);
      ctx.stroke();
    }
    
    // Calculate player position on mini-map
    const centerX = mapSize / 2;
    const centerY = mapSize / 2;
    const playerX = centerX + playerPosition.x * scale;
    const playerY = centerY + playerPosition.z * scale;
    
    // Draw buildings (simplified)
    ctx.fillStyle = '#666';
    for (let x = -25; x <= 25; x += 10) {
      for (let z = -25; z <= 25; z += 10) {
        if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
        
        const buildingX = centerX + x * scale;
        const buildingY = centerY + z * scale;
        const buildingSize = 5;
        
        ctx.fillRect(
          buildingX - buildingSize / 2, 
          buildingY - buildingSize / 2, 
          buildingSize, 
          buildingSize
        );
      }
    }
    
    // Draw player
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(playerX, playerY, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw player direction
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(
      playerX + Math.sin(playerRotation) * 8,
      playerY + Math.cos(playerRotation) * 8
    );
    ctx.stroke();
    
  }, [mapSize, scale, playerPosition, playerRotation]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={mapSize} 
      height={mapSize} 
      className="rounded-lg"
    />
  );
}

export function GameHUD() {
  const { playerPosition, playerSpeed, isRunning } = useGameStore();
  
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Top-right: Mini-map */}
      <div className="absolute top-4 right-4 z-10">
        <MiniMap mapSize={150} scale={0.8} />
      </div>
      
      {/* Bottom-left: Controls help (already implemented) */}
      
      {/* Top-left: Player stats */}
      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
        <h3 className="font-bold mb-1">Player Stats</h3>
        <p>Position: X: {playerPosition.x.toFixed(1)} Y: {playerPosition.y.toFixed(1)} Z: {playerPosition.z.toFixed(1)}</p>
        <p>Speed: {isRunning ? playerSpeed * 2 : playerSpeed} {isRunning ? '(Running)' : '(Walking)'}</p>
      </div>
    </div>
  );
}
