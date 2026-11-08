import ProjectShowcase from './ProjectShowcase';

export default function ShowcaseGroup() {
    return (
    <group position={1}>
    <ProjectShowcase
        position={[-4, 0, -2]}
        title="Simulador de Robótica"
        tag="Three.js"
        description="Entorno de visualización de cinemática inversa con control de articulaciones."
        repoUrl="[suspicious link removed]"
      />

      <ProjectShowcase
        position={[4, 0, -2]}
        title="Videojuego Web 3D"
        tag="Rapier + R3F"
        description="Juego de carreras y obstáculos con detección de colisiones e iluminación PBR."
        repoUrl="[suspicious link removed]"
      />
      </group>
    );

}

