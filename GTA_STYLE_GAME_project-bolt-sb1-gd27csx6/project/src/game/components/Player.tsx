import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import { Mesh, Vector3 } from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useCollisionDetection } from '../hooks/useCollisionDetection';

export function Player() {
  const meshRef = useRef<Mesh>(null);
  const {
    playerPosition,
    playerRotation,
    playerVelocity,
    playerSpeed,
    isRunning,
    setPlayerPosition,
    setPlayerVelocity,
    setPlayerRotation,
    setIsRunning,
  } = useGameStore();

  const { moveDirection, isShiftPressed } = useKeyboardControls();
  const { checkCollisions } = useCollisionDetection();

  useEffect(() => {
    setIsRunning(isShiftPressed);
  }, [isShiftPressed, setIsRunning]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Update position based on velocity
      const currentSpeed = isRunning ? playerSpeed * 2 : playerSpeed;
      const velocity = new Vector3(
        moveDirection.x * currentSpeed * delta,
        0,
        moveDirection.z * currentSpeed * delta
      );

      // Calculate new position
      const newPosition = {
        x: playerPosition.x + velocity.x,
        y: playerPosition.y,
        z: playerPosition.z + velocity.z,
      };

      // Store previous position in case of collision
      const previousPosition = { ...playerPosition };

      // Update position
      setPlayerPosition(newPosition);
      setPlayerVelocity(velocity);

      // Check for collisions
      if (checkCollisions()) {
        // Revert to previous position on collision
        setPlayerPosition(previousPosition);
      } else {
        // Update rotation based on movement direction (only if actually moving)
        if (moveDirection.x !== 0 || moveDirection.z !== 0) {
          const targetRotation = Math.atan2(moveDirection.x, moveDirection.z);
          setPlayerRotation(targetRotation);
        }
      }

      // Apply updates to the mesh
      meshRef.current.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
      meshRef.current.rotation.y = playerRotation;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={[playerPosition.x, playerPosition.y, playerPosition.z]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={isRunning ? "red" : "blue"} />
    </mesh>
  );
}
