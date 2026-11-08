import { useState } from 'react';
import { Canvas } from '@react-three/fiber'; 
import Experience from './components/Experience';

export default function App() {
  const [cameraMode, setCameraMode] = useState('free');
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

      {/* HUD 2D superpuesto */}

      <div style={{ 
          position: 'absolute', 
          top: 20, 
          left: 20, 
          zIndex: 10, 
          background: 'rgba(15, 23, 42, 0.75)', 
          backdropFilter: 'blur(8px)', 
          padding: '12px 18px', 
          borderRadius: '10px', 
          color: '#ffffff'
          }}>


        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>Portafolio Web 3D</h1>


        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#cbd5e1' }}> 
           <strong>WASD / Flechas:</strong> Mover esfera <strong>Clic en caja:</strong> Abrir proyecto | <strong>Arrastrar:</strong> Orbitar 
        </p>

      </div>

      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
          <button
          onClick={() => setCameraMode(cameraMode === 'free' ? 'follow' : 'free')}
          style={{ background: cameraMode === 'follow' ? '#2563eb' : 'rgba(15, 23, 42, 0.8)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', transition: 'background 0.2s ease' }}
          >
            Modo Cámara: {cameraMode === 'free' ? 'Órbita Libre' : 'Siguiendo a la Bola'}
          </button>
      </div>

          {/* Lienzo 3D principal */}
          <Canvas 
            shadows
            camera={{
              position: [0,8,14],
              fov: 45,
            }}
          >
            <Experience cameraMode={cameraMode} />
          </Canvas>
    </div>
  );
}