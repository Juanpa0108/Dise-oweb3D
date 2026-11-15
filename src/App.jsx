import { Suspense, lazy, useCallback, useState } from 'react';
import ProjectList from './components/ProjectList';
import TouchControls from './components/TouchControls';
import {
  useIsCoarsePointer,
  useIsSmallScreen,
  usePrefersReducedMotion,
} from './hooks/useMediaQuery';

const SceneCanvas = lazy(() => import('./components/SceneCanvas'));

const supportsWebGL = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
};

export default function App() {
  const [cameraMode, setCameraMode] = useState('free');
  const [showTextVersion, setShowTextVersion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(supportsWebGL);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const isSmallScreen = useIsSmallScreen();

  const isFollowing = cameraMode === 'follow';
  const isListOpen = showTextVersion || !hasWebGL;

  const toggleCamera = useCallback(() => {
    setCameraMode((mode) => (mode === 'free' ? 'follow' : 'free'));
  }, []);

  const toggleTextVersion = useCallback(() => {
    setShowTextVersion((open) => !open);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <div className="topbar">
        <header className="panel hud-info">
          <h1 className="hud-info__title">Portafolio Web 3D</h1>
          <p className="hud-info__subtitle">
            Mueve la esfera entre los proyectos y abre sus fichas.
          </p>
          <ul id="controles-ayuda" className="hud-info__help">
            <li>
              <strong>WASD o flechas:</strong> mover la esfera.
            </li>
            <li>
              <strong>Clic en una caja:</strong> abrir el proyecto.
            </li>
            <li>
              <strong>Arrastrar:</strong> orbitar la cámara.
            </li>
            {isCoarsePointer && <li>Usa los botones de flechas en la esquina inferior.</li>}
          </ul>
        </header>

        <div className="hud-actions">
          <button
            type="button"
            className="btn"
            onClick={toggleCamera}
            aria-pressed={isFollowing}
          >
            {isFollowing ? 'Cámara: siguiendo la bola' : 'Cámara: órbita libre'}
          </button>

          {hasWebGL && (
            <button
              type="button"
              className="btn"
              onClick={toggleTextVersion}
              aria-expanded={isListOpen}
              aria-controls="proyectos-texto"
            >
              {isListOpen ? 'Ocultar versión en texto' : 'Ver versión en texto'}
            </button>
          )}
        </div>
      </div>

      <main id="contenido" className="stage" tabIndex={-1}>
        {hasWebGL ? (
          <section
            className="stage__scene"
            aria-labelledby="escena-titulo"
            aria-describedby="controles-ayuda"
          >
            <h2 id="escena-titulo" className="sr-only">
              Proyectos en la escena 3D
            </h2>
            <Suspense
              fallback={
                <p className="scene-loading" role="status">
                  Cargando escena 3D…
                </p>
              }
            >
              <SceneCanvas
                cameraMode={cameraMode}
                reducedMotion={prefersReducedMotion}
                shadowMapSize={isSmallScreen ? 1024 : 2048}
                isSmallScreen={isSmallScreen}
                onContextLost={() => setHasWebGL(false)}
              />
            </Suspense>
          </section>
        ) : (
          <p className="scene-fallback" role="status">
            Tu navegador no puede mostrar la escena 3D. Abajo tienes los
            proyectos en formato de texto.
          </p>
        )}

        <ProjectList id="proyectos-texto" isOpen={isListOpen} />

        {hasWebGL && isCoarsePointer && <TouchControls />}
      </main>

      <p className="sr-only" role="status">
        {isFollowing ? 'Cámara siguiendo a la bola' : 'Cámara en órbita libre'}
      </p>
    </div>
  );
}
