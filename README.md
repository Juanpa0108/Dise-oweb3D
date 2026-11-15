# Portafolio Web 3D

**Sitio en producción:** <https://portafolio-web3d.vercel.app>

Portafolio personal en 3D: una escena con físicas donde una esfera recorre los
proyectos y abre su ficha. Construido con React 19, Vite, React Three Fiber,
drei y Rapier.

## Características

- Escena 3D con física real (Rapier): la esfera rueda, choca y rebota.
- Dos modos de cámara: órbita libre y seguimiento de la esfera.
- Proyectos clicables con tarjeta HTML sobre el cubo.
- **Versión en texto** de los proyectos, accesible por teclado y lectores de
  pantalla, disponible aunque falle WebGL.
- Controles táctiles direccionales, respeto por `prefers-reduced-motion` y
  textos alternativos en español.

## Requisitos

- Node.js 22.12 o superior (probado con 26).
- npm 10 o superior.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Estructura

```
src/
  App.jsx                  Layout, HUD, detección de WebGL y estado de cámara
  data/projects.js         Datos de los proyectos (escena 3D + lista HTML)
  hooks/useMediaQuery.js   prefers-reduced-motion, puntero táctil, tamaño
  lib/inputState.js        Estado de movimiento compartido (teclado/táctil)
  components/
    Experience.jsx         Escena: cámara, luces, físicas
    Player.jsx             Esfera jugable y seguimiento de cámara
    ShowcaseGroup.jsx      Distribuye los proyectos en la escena
    ProjectShowcase.jsx    Pedestal, cubo y tarjeta accesible
    ProjectList.jsx        Alternativa 100 % HTML a la escena
    TouchControls.jsx      Flechas para pantallas táctiles
    Floor.jsx / Lights.jsx Suelo y luces
```

## Accesibilidad

- El canvas está oculto a tecnologías de asistencia (`aria-hidden`) para evitar
  información duplicada; el contenido real vive en `ProjectList`, que siempre
  está en el DOM.
- Navegación completa por teclado con foco visible y enlace "Saltar al
  contenido".
- Objetivos con `aria-expanded`, paneles que se cierran con `Escape` y foco
  devuelto al control de origen.
- Movimiento reducido: sin animación de cámara ni rebotes cuando el sistema
  operativo lo solicita.

Nota: `eslint-plugin-jsx-a11y` aún no admite ESLint 10, así que las reglas de
accesibilidad se validan con Lighthouse y revisión manual. Cuando el plugin
publique compatibilidad con ESLint 10, conviene añadirlo a `eslint.config.js`.

## Despliegue en Vercel

1. Instala Git si aún no lo tienes: `winget install --id Git.Git -e`.
2. Sube el proyecto al repositorio `Juanpa0108/Dise-oweb3D`.
3. En <https://vercel.com/new> importa el repositorio y configura:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `portafolio-web3d` (solo si el repo tiene el proyecto
     dentro de esa carpeta; si `package.json` está en la raíz, déjalo vacío)
   - **Node.js Version:** 22.x
4. Cada push a la rama conectada publica automáticamente; las demás ramas
   generan *preview deployments*.

No se necesitan variables de entorno ni reglas de reescritura (es una sola ruta).

### Alternativa sin Git

```bash
npm run build
```

y arrastra la carpeta `dist` a <https://app.netlify.com/drop>.
