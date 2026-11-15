import { useEffect } from 'react';
import { resetMovement, setMovement } from '../lib/inputState';

const DIRECTIONS = [
  { key: 'forward', label: 'Mover hacia adelante', area: 'up', glyph: '↑' },
  { key: 'left', label: 'Mover a la izquierda', area: 'left', glyph: '←' },
  { key: 'backward', label: 'Mover hacia atrás', area: 'down', glyph: '↓' },
  { key: 'right', label: 'Mover a la derecha', area: 'right', glyph: '→' },
];

/**
 * Controles direccionales para pantallas táctiles (y para cualquiera sin
 * teclado físico). Escriben en el mismo estado que el teclado.
 */
export default function TouchControls() {
  useEffect(() => resetMovement, []);

  const start = (direction) => (event) => {
    event.preventDefault();
    setMovement(direction, true);
  };

  const stop = (direction) => () => {
    setMovement(direction, false);
  };

  return (
    <div className="touch-pad" role="group" aria-label="Controles de movimiento de la esfera">
      {DIRECTIONS.map((direction) => (
        <button
          key={direction.key}
          type="button"
          className={`touch-pad__btn touch-pad__btn--${direction.area}`}
          aria-label={direction.label}
          onPointerDown={start(direction.key)}
          onPointerUp={stop(direction.key)}
          onPointerLeave={stop(direction.key)}
          onPointerCancel={stop(direction.key)}
          onBlur={stop(direction.key)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setMovement(direction.key, true);
            }
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              setMovement(direction.key, false);
            }
          }}
        >
          <span aria-hidden="true">{direction.glyph}</span>
        </button>
      ))}
    </div>
  );
}
