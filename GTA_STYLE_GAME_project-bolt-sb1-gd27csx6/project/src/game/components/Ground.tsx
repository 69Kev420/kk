export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#303030" />
      <gridHelper args={[100, 100, '#606060', '#404040']} />
    </mesh>
  );
}