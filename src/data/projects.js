// Fuente única de verdad para los proyectos del portafolio.
// Se usa tanto en la escena 3D como en la lista HTML accesible.
// TODO: reemplaza `repoUrl` por la URL real del repositorio de cada proyecto.
const DEFAULT_REPO = 'https://github.com/Juanpa0108/Dise-oweb3D';

export const projects = [
  {
    id: 'robotica',
    title: 'Simulador de Robótica',
    tag: 'Three.js',
    description:
      'Entorno de visualización de cinemática inversa con control de articulaciones.',
    repoUrl: DEFAULT_REPO,
    position: [-4, 0, -2],
  },
  {
    id: 'videojuego',
    title: 'Videojuego Web 3D',
    tag: 'Rapier + R3F',
    description:
      'Juego de carreras y obstáculos con detección de colisiones e iluminación PBR.',
    repoUrl: DEFAULT_REPO,
    position: [4, 0, -2],
  },
];
