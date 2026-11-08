import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export default function ProjectShowcase({
  position = [0, 0, 0],
  title = "Proyecto Web 3D",
  description = "Desarrollo interactivo con React Three Fiber, físicas Rapier y shaders.",
  tag = "R3F + WebGL",
  repoUrl = "https://github.com"
}) {
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bump, setBump] = useState(false);
  const cubeRef = useRef();

  // Animación de rebote suave cuando la pelota choca con el cubo
  useFrame((_, delta) => {
    if (cubeRef.current) {
      const targetScale = bump ? 1.25 : 1;
      cubeRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, delta * 10);
    }
  });

  return (
    <group position={position}>
      {/* CUERPO FÍSICO FIJO: La pelota NO puede atravesar esto */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={0.6} // Hace que la pelota rebote al golpearlo
        friction={0.5}
        onCollisionEnter={() => {
          // Reacción visual al chocar con la pelota
          setBump(true);
          setTimeout(() => setBump(false), 200);
        }}
      >
        {/* Pedestal base */}
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.8, 32]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>

        {/* Cubo principal del proyecto */}
        <mesh
          ref={cubeRef}
          position={[0, 1.8, 0]}
          castShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(!openModal);
          }}
        >
          <boxGeometry args={[1.4, 1.6, 1.4]} />
          <meshStandardMaterial
            color={bump ? "#f59e0b" : hovered ? "#60a5fa" : "#2563eb"}
            roughness={0.2}
            metalness={0.7}
            emissive={bump ? "#d97706" : hovered ? "#1d4ed8" : "#000000"}
            emissiveIntensity={bump ? 1 : hovered ? 0.5 : 0}
          />
        </mesh>
      </RigidBody>

      {/* Tarjeta HTML 3D de alta legibilidad */}
      <Html position={[0, 3.2, 0]} center distanceFactor={14}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: hovered ? '2px solid #2563eb' : '1px solid #cbd5e1',
          padding: '12px 18px',
          borderRadius: '12px',
          color: '#0f172a',
          width: '220px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          pointerEvents: 'auto',
          userSelect: 'none',
          transition: 'all 0.2s ease'
        }}>
          <span style={{
            fontSize: '0.7rem',
            background: '#2563eb',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '999px',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {tag}
          </span>
          <h3 style={{ margin: '8px 0 4px', fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>
            {title}
          </h3>
          {openModal ? (
            <>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, margin: '6px 0 10px' }}>
                {description}
              </p>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#2563eb',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: 600
                }}
              >
                Ver en GitHub
              </a>
            </>
          ) : (
            <p style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, margin: '4px 0 0' }}>
              👆 Clic para más detalles
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}