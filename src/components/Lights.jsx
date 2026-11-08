export default function Lights(){
    return (
        <>
            {/* Luz difusa ambiental */ }
            <ambientLight intensity={0.4} />

            {/* Luz direccional que proyecta sombras dinámicas */}
            <directionalLight
                castShadow
                position={[29-31]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={30}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-normalBias={0.04}
        />
        {/* Luz puntual secundaria para relleno */}
        <pointLight position={[-6, 4, -4]} intensity={0.6} color="#4fd1c5" />
        </>
    );
}