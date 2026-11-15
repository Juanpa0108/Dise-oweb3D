import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

/**
 * Se carga de forma diferida desde `App`: el motor 3D (Three.js + físicas)
 * pesa más de 3 MB, así que el contenido HTML y la lista accesible se pintan
 * antes de que llegue el bundle de la escena.
 */
export default function SceneCanvas({
  cameraMode,
  reducedMotion,
  shadowMapSize,
  isSmallScreen,
  onContextLost,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, isSmallScreen ? 1.25 : 1.75]}
      camera={{ position: [0, 8, 14], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute('aria-hidden', 'true');
        gl.domElement.setAttribute('tabindex', '-1');
        gl.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault();
            onContextLost?.();
          },
          { once: true }
        );
      }}
    >
      <Suspense fallback={null}>
        <Experience
          cameraMode={cameraMode}
          reducedMotion={reducedMotion}
          shadowMapSize={shadowMapSize}
        />
      </Suspense>
    </Canvas>
  );
}
