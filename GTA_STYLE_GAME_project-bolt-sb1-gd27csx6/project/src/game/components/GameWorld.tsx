import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Player } from './Player';
import { Ground } from './Ground';

export function GameWorld() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Player />
        <Ground />
        <OrbitControls />
        <Environment preset="city" />
        <fog attach="fog" args={['#202020', 5, 30]} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p>WASD or Arrow Keys - Move</p>
        <p>Shift - Run</p>
      </div>
    </div>
  );
}