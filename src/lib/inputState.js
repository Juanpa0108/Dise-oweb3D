// Estado de movimiento compartido entre el teclado, los controles táctiles
// y la física de la esfera. Es un objeto mutable a propósito: se lee dentro
// de `useFrame` (60 fps) sin provocar renders de React.
export const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function setMovement(direction, active) {
  if (direction in movement) {
    movement[direction] = active;
  }
}

export function resetMovement() {
  movement.forward = false;
  movement.backward = false;
  movement.left = false;
  movement.right = false;
}

export const KEY_DIRECTIONS = {
  w: 'forward',
  arrowup: 'forward',
  s: 'backward',
  arrowdown: 'backward',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
};

export function isEditableTarget(target) {
  if (!target || typeof target.closest !== 'function') return false;
  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"]'
    )
  );
}
