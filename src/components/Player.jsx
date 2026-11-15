import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import {
  KEY_DIRECTIONS,
  isEditableTarget,
  movement,
  resetMovement,
} from '../lib/inputState';

const ARENA_LIMIT = 19.2;
const BALL_RADIUS = 0.55;
const MAX_SPEED = 8;
const ACCEL = 28;
const FOLLOW_OFFSET = new THREE.Vector3(0, 5.2, 10);
const followTarget = new THREE.Vector3();
const lookTarget = new THREE.Vector3();

export default function Player({
  position = [0, 1.5, 4],
  cameraMode = 'free',
  reducedMotion = false,
}) {
  const bodyRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const direction = KEY_DIRECTIONS[key];
      if (!direction) return;

      // Evita que las flechas desplacen la página mientras se juega.
      if (key.startsWith('arrow')) event.preventDefault();
      movement[direction] = true;
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      const direction = KEY_DIRECTIONS[key];
      if (!direction) return;
      movement[direction] = false;
    };

    const handleBlur = () => resetMovement();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      resetMovement();
    };
  }, []);

  useFrame((state, rawDelta) => {
    if (!bodyRef.current) return;

    const delta = Math.min(rawDelta, 0.05);
    const currentVel = bodyRef.current.linvel();

    let ax = 0;
    let az = 0;

    if (movement.forward) az -= 1;
    if (movement.backward) az += 1;
    if (movement.left) ax -= 1;
    if (movement.right) ax += 1;

    let vx = currentVel.x;
    let vz = currentVel.z;

    if (ax !== 0 || az !== 0) {
      const len = Math.hypot(ax, az);
      ax /= len;
      az /= len;
      vx += ax * ACCEL * delta;
      vz += az * ACCEL * delta;

      const hSpeed = Math.hypot(vx, vz);
      if (hSpeed > MAX_SPEED) {
        const scale = MAX_SPEED / hSpeed;
        vx *= scale;
        vz *= scale;
      }

      bodyRef.current.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);
      bodyRef.current.wakeUp();
    }

    const ballPos = bodyRef.current.translation();
    const clampedX = THREE.MathUtils.clamp(ballPos.x, -ARENA_LIMIT, ARENA_LIMIT);
    const clampedZ = THREE.MathUtils.clamp(ballPos.z, -ARENA_LIMIT, ARENA_LIMIT);
    const clampedY = Math.max(ballPos.y, BALL_RADIUS);

    if (clampedX !== ballPos.x || clampedZ !== ballPos.z || clampedY !== ballPos.y) {
      bodyRef.current.setTranslation(
        { x: clampedX, y: clampedY, z: clampedZ },
        true
      );
      bodyRef.current.setLinvel(
        {
          x: clampedX !== ballPos.x ? 0 : vx,
          y: clampedY !== ballPos.y ? Math.max(currentVel.y, 0) : currentVel.y,
          z: clampedZ !== ballPos.z ? 0 : vz,
        },
        true
      );
    }

    if (cameraMode === 'follow') {
      followTarget.set(
        clampedX + FOLLOW_OFFSET.x,
        Math.max(clampedY + FOLLOW_OFFSET.y, 3),
        clampedZ + FOLLOW_OFFSET.z
      );

      if (reducedMotion) {
        state.camera.position.copy(followTarget);
      } else {
        const catchUp = Math.min(1, 12 * delta);
        state.camera.position.lerp(followTarget, catchUp);
      }

      if (state.camera.position.z < clampedZ + 4) {
        state.camera.position.z = clampedZ + 4;
      }
      if (state.camera.position.y < 2.2) {
        state.camera.position.y = 2.2;
      }

      lookTarget.set(clampedX, clampedY + 0.7, clampedZ);
      state.camera.lookAt(lookTarget);
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      position={position}
      restitution={0.35}
      friction={0.4}
      linearDamping={1.2}
      angularDamping={0.4}
      ccd
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[BALL_RADIUS, 32, 16]} />
        <meshStandardMaterial
          color="#facc15"
          roughness={0.2}
          metalness={0.3}
          emissive="#eab308"
          emissiveIntensity={0.3}
        />
      </mesh>
    </RigidBody>
  );
}
