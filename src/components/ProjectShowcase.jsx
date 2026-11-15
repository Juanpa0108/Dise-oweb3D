import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProjectShowcase({
  id,
  position = [0, 0, 0],
  title = 'Proyecto Web 3D',
  description = 'Desarrollo interactivo con React Three Fiber, físicas Rapier y shaders.',
  tag = 'R3F + WebGL',
  repoUrl = 'https://github.com',
  reducedMotion = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bump, setBump] = useState(false);

  const cubeRef = useRef();
  const toggleRef = useRef();
  const bumpTimer = useRef();
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  const panelId = `proyecto-panel-${id}`;

  // Rebote suave de la caja cuando la pelota choca con ella.
  useFrame((_, delta) => {
    if (!cubeRef.current) return;

    if (reducedMotion) {
      cubeRef.current.scale.set(1, 1, 1);
      return;
    }

    const target = bump ? 1.25 : 1;
    scaleTarget.set(target, target, target);
    cubeRef.current.scale.lerp(scaleTarget, Math.min(1, delta * 10));
  });

  useEffect(() => {
    return () => {
      window.clearTimeout(bumpTimer.current);
      document.body.style.cursor = '';
    };
  }, []);

  const triggerBump = () => {
    if (reducedMotion) return;
    setBump(true);
    window.clearTimeout(bumpTimer.current);
    bumpTimer.current = window.setTimeout(() => setBump(false), 200);
  };

  const togglePanel = () => setOpenModal((open) => !open);

  const closePanel = () => {
    setOpenModal(false);
    toggleRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && openModal) {
      event.stopPropagation();
      closePanel();
    }
  };

  return (
    <group position={position}>
      {/* Cuerpo físico fijo: la pelota no puede atravesarlo */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={0.6}
        friction={0.5}
        onCollisionEnter={triggerBump}
      >
        {/* Pedestal */}
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.8, 32]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>

        {/* Cubo principal del proyecto */}
        <mesh
          ref={cubeRef}
          position={[0, 1.8, 0]}
          castShadow
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = '';
          }}
          onClick={(event) => {
            event.stopPropagation();
            togglePanel();
          }}
        >
          <boxGeometry args={[1.4, 1.6, 1.4]} />
          <meshStandardMaterial
            color={bump ? '#f59e0b' : hovered ? '#3b82f6' : '#1d4ed8'}
            roughness={0.2}
            metalness={0.6}
            emissive={bump ? '#d97706' : hovered ? '#1e40af' : '#000000'}
            emissiveIntensity={bump ? 1 : hovered ? 0.6 : 0}
          />
        </mesh>
      </RigidBody>

      {/* Tarjeta HTML: única vía con teclado y lector de pantalla dentro del 3D */}
      <Html position={[0, 3.2, 0]} center distanceFactor={14}>
        <div
          className="card"
          data-hovered={hovered}
          onKeyDown={handleKeyDown}
        >
          <span className="pill">{tag}</span>
          <h3 className="card__title">{title}</h3>
          <button
            type="button"
            ref={toggleRef}
            className="card__toggle"
            aria-expanded={openModal}
            aria-controls={panelId}
            onClick={togglePanel}
          >
            {openModal ? 'Ocultar detalles' : 'Ver detalles'}
          </button>

          <div id={panelId} className="card__panel" hidden={!openModal}>
            <p className="card__text">{description}</p>
            <a
              className="card__link"
              href={repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Ver repositorio
              <span className="sr-only"> de {title} (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}
