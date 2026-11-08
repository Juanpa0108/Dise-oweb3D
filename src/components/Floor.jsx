import { CuboidCollider, RigidBody } from '@react-three/rapier';

const ARENA_HALF = 20;

export default function Floor() {
  return (
    <RigidBody type="fixed" colliders={false} friction={1} restitution={0.1}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[ARENA_HALF * 2, ARENA_HALF * 2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Collider con grosor real: el planeGeometry no genera un cuboid usable */}
      <CuboidCollider args={[ARENA_HALF, 0.5, ARENA_HALF]} position={[0, -0.5, 0]} />
    </RigidBody>
  );
}
