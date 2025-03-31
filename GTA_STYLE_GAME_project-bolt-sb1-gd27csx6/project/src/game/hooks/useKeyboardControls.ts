import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

interface KeyState {
  [key: string]: boolean;
}

export function useKeyboardControls() {
  const [keys, setKeys] = useState<KeyState>({});
  const [moveDirection, setMoveDirection] = useState(new Vector3());
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.code]: true }));
      if (event.code === 'ShiftLeft') setIsShiftPressed(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.code]: false }));
      if (event.code === 'ShiftLeft') setIsShiftPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const direction = new Vector3();

    // Forward/Backward
    if (keys['KeyW'] || keys['ArrowUp']) direction.z -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) direction.z += 1;

    // Left/Right
    if (keys['KeyA'] || keys['ArrowLeft']) direction.x -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) direction.x += 1;

    // Normalize the direction vector
    if (direction.length() > 0) {
      direction.normalize();
    }

    setMoveDirection(direction);
  }, [keys]);

  return { moveDirection, isShiftPressed };
}