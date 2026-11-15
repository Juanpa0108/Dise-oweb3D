import { useCallback, useSyncExternalStore } from 'react';

const canMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

/**
 * Suscripción a una media query sin estado duplicado:
 * `matchMedia` es la fuente externa y React se sincroniza con ella.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (!canMatchMedia()) return () => {};
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => (canMatchMedia() ? window.matchMedia(query).matches : false),
    [query]
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsCoarsePointer() {
  return useMediaQuery('(pointer: coarse)');
}

export function useIsSmallScreen() {
  return useMediaQuery('(max-width: 768px)');
}
