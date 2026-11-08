import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, BakeShadows } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import Lights from './Lights';
import Floor from './Floor';
import ShowcaseGroup from './ShowcaseGroup';
import Player from './Player';

const MIN_CAMERA_Y = 2.2;
const MIN_TARGET_Y = 0.8;

function CameraBounds({ cameraMode, controlsRef }) {
  useFrame(({ camera }) => {
    if (camera.position.y < MIN_CAMERA_Y) {
      camera.position.y = MIN_CAMERA_Y;
    }

    if (cameraMode === 'free' && controlsRef.current) {
      const target = controlsRef.current.target;
      if (target.y < MIN_TARGET_Y) target.y = MIN_TARGET_Y;
    }
  }, 1);

  return null;
}

function BoundaryWalls() {
  const height = 8;
  const thickness = 1;
  const half = 20;
  const y = height / 2;

  return (
    <>
      <RigidBody type="fixed" colliders={false} restitution={0.4} friction={0.2}>
        <CuboidCollider args={[half + thickness, y, thickness / 2]} position={[0, y, -half]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.4} friction={0.2}>
        <CuboidCollider args={[half + thickness, y, thickness / 2]} position={[0, y, half]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.4} friction={0.2}>
        <CuboidCollider args={[thickness / 2, y, half]} position={[-half, y, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false} restitution={0.4} friction={0.2}>
        <CuboidCollider args={[thickness / 2, y, half]} position={[half, y, 0]} />
      </RigidBody>
    </>
  );
}

export default function Experience({ cameraMode }) {
  const controlsRef = useRef();

  return (
    <>
      {cameraMode === 'free' && (
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          target={[0, 1.2, 0]}
          minPolarAngle={0.18}
          maxPolarAngle={Math.PI / 2 - 0.18}
          minDistance={3}
          maxDistance={30}
        />
      )}

      <CameraBounds cameraMode={cameraMode} controlsRef={controlsRef} />

      <Sky
        distance={450000}
        sunPosition={[100, 30, 100]}
        turbidity={3}
        rayleigh={2}
        inclination={0.45}
        azimuth={0.25}
      />

      <Lights />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <BoundaryWalls />
        <ShowcaseGroup />
        <Player position={[0, 1.5, 6]} cameraMode={cameraMode} />
      </Physics>

      <BakeShadows />
    </>
  );
}
