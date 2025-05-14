# Documentación del Proyecto JuegosReact 🎮

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura Completa del Proyecto](#estructura-completa-del-proyecto)
3. [Componentes y Archivos](#componentes-y-archivos)
4. [Documentación de Juegos](#documentación-de-juegos)
5. [Sistema de Audio](#sistema-de-audio)
6. [Sistema de Progresión](#sistema-de-progresión)
7. [Interfaz de Usuario](#interfaz-de-usuario)
8. [Guía de Desarrollo](#guía-de-desarrollo)

## Descripción General

JuegosReact es una plataforma educativa que contiene múltiples juegos interactivos diseñados para ayudar en el aprendizaje. El proyecto está construido utilizando React y TypeScript, con un enfoque en la modularidad y la experiencia del usuario.

## Estructura Completa del Proyecto

```
JuegosReact/
├── src/
│   ├── core/
│   │   └── logic/
│   │       └── audioPlayer.ts       # Gestión de audio
│   │   ├── games/
│   │   │   ├── TraceLetterGame/        # Juego de trazado de letras
│   │   │   │   ├── TraceLetterGame.tsx
│   │   │   │   ├── TraceLetterGame.css
│   │   │   │   └── letterPaths.ts
│   │   │   └── WriteWordGame/          # Juego de escritura de palabras
│   │   │       ├── WriteWordGame.tsx
│   │   │       └── WriteWordGame.css
│   │   ├── gui/
│   │   │   └── TopBar/
│   │   │       ├── TopBar.tsx
│   │   │       └── TopBar.css
│   │   └── menu/
│   │       └── MainMenu.tsx            # Menú principal
│   │           └── MainMenu.css
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── audio/
│   │       ├── efects/
│   │       │   ├── BONUS.mp3
│   │       │   └── ERROR.mp3
│   │       ├── letters/
│   │       │   └── [A-Z].mp3
│   │       └── words/
│   │           └── [palabras].mp3
│   ├── package.json
│   ├── tsconfig.json
│   ├── DOCUMENTATION.md
│   ├── GAMES.md
│   └── README.md
```

## Componentes y Archivos

### Archivos de Configuración

#### package.json
```json
{
  "name": "juegos-react",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "typescript": "^4.x"
  }
}
```

#### tsconfig.json
- Configuración de TypeScript
- Opciones estrictas habilitadas
- Rutas de alias configuradas
- Configuración de módulos ES6

### Core

#### audioPlayer.ts
```typescript
export class AudioManager {
  static playSound(type: 'success' | 'error' | 'letter' | 'word', value?: string)
  static getAudioPath(type: string, value?: string): string
}
```

### GUI

#### TopBar/TopBar.tsx
```typescript
interface TopBarProps {
  overrideXp?: number
  overrideLevel?: number
  extraButton?: {
    label: string
    onClick: () => void
  }
}
```

Características:
- Barra superior persistente
- Muestra XP y nivel actual
- Botón de retorno configurable
- Estilos responsivos

### Menu

#### MainMenu.tsx
```typescript
interface UserProfile {
  xp: number
  level: number
  completedGames: string[]
}
```

Funcionalidades:
- Gestión de estado de juegos
- Sistema de desbloqueo por nivel
- Interfaz de selección de juegos
- Persistencia de progreso

## Sistema de Audio

### Estructura de Archivos de Audio
- **Efectos** (`/public/audio/efects/`):
  - `BONUS.mp3`: Sonido de éxito
  - `ERROR.mp3`: Sonido de error

- **Letras** (`/public/audio/letters/`):
  - Archivos individuales para cada letra (A-Z)
  - Formato consistente de nombrado

- **Palabras** (`/public/audio/words/`):
  - Palabras completas para el juego de escritura
  - Nombradas según el contenido

### Implementación
```typescript
// Ejemplo de uso del AudioManager
AudioManager.playSound('success');
AudioManager.playSound('letter', 'A');
AudioManager.playSound('word', 'CASA');
```

## Sistema de Progresión

### Cálculo de Nivel
```typescript
const level = Math.floor(xp / 100) + 1;
```

### Desbloqueo de Contenido
```typescript
interface GameConfig {
  id: string
  nombre: string
  nivel_requerido: number
  icono: string
}
```

## Interfaz de Usuario

### Estilos Globales
- Paleta de colores:
  ```css
  :root {
    --primary: #4caf50;
    --secondary: #ff9800;
    --background: #1a1a2e;
    --text: #ffffff;
  }
  ```

### Componentes Comunes
- Botones con hover y focus states
- Animaciones suaves (0.3s ease)
- Feedback visual consistente
- Diseño responsivo

## Guía de Desarrollo

### Estructura de Nuevo Juego
```
games/
└── NuevoJuego/
    ├── NuevoJuego.tsx
    ├── NuevoJuego.css
    └── types.ts
```

### Testing
- Jest para pruebas unitarias
- React Testing Library para componentes
- Cobertura mínima requerida: 80%

Para la documentación detallada de los juegos, consulte [GAMES.md](GAMES.md) 