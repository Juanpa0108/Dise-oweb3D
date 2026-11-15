import { projects } from '../data/projects';

/**
 * Alternativa 100 % HTML a la escena 3D.
 * Siempre está disponible para lectores de pantalla y navegación por teclado;
 * el botón "Ver versión en texto" la hace visible.
 */
export default function ProjectList({ id, isOpen }) {
  return (
    <section
      id={id}
      className={`project-list${isOpen ? ' project-list--open' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`} className="project-list__title">
        Proyectos
      </h2>

      <p className="project-list__intro">
        Misma información que la escena 3D, en formato de texto.
      </p>

      <ul className="project-list__items">
        {projects.map((project) => (
          <li key={project.id} className="project-card">
            <span className="pill">{project.tag}</span>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__text">{project.description}</p>
            <a
              className="project-card__link"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Ver {project.title} en GitHub
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
