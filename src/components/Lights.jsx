export default function Lights({ shadowMapSize = 2048 }) {
  return (
    <>
      {/* Luz ambiente difusa */}
      <ambientLight intensity={0.4} />

      {/* Luz direccional con sombras dinámicas */}
      <directionalLight
        castShadow
        position={[10, 15, 10]}
        intensity={1.5}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-normalBias={0.04}
      />

      {/* Relleno secundario */}
      <pointLight position={[-6, 4, -4]} intensity={0.6} color="#4fd1c5" />
    </>
  );
}
