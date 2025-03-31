import { create } from 'zustand';

interface GameState {
  playerPosition: { x: number; y: number; z: number };
  playerRotation: number;
  playerVelocity: { x: number; y: number; z: number };
  playerSpeed: number;
  isRunning: boolean;
  setPlayerPosition: (position: { x: number; y: number; z: number }) => void;
  setPlayerRotation: (rotation: number) => void;
  setPlayerVelocity: (velocity: { x: number; y: number; z: number }) => void;
  setPlayerSpeed: (speed: number) => void;
  setIsRunning: (isRunning: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerPosition: { x: 0, y: 1, z: 0 },
  playerRotation: 0,
  playerVelocity: { x: 0, y: 0, z: 0 },
  playerSpeed: 5,
  isRunning: false,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  setPlayerRotation: (rotation) => set({ playerRotation: rotation }),
  setPlayerVelocity: (velocity) => set({ playerVelocity: velocity }),
  setPlayerSpeed: (speed) => set({ playerSpeed: speed }),
  setIsRunning: (isRunning) => set({ isRunning: isRunning }),
}));