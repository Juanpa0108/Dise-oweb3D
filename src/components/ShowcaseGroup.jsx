import ProjectShowcase from './ProjectShowcase';
import { projects } from '../data/projects';

export default function ShowcaseGroup({ reducedMotion = false }) {
  return (
    <group>
      {projects.map((project) => (
        <ProjectShowcase
          key={project.id}
          id={project.id}
          position={project.position}
          title={project.title}
          tag={project.tag}
          description={project.description}
          repoUrl={project.repoUrl}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
