# Documentación de Juegos 🎮

## Índice
1. [TraceLetterGame](#tracelettergame)
2. [WriteWordGame](#writewordgame)

## TraceLetterGame

### Descripción
Juego educativo para practicar el trazado de letras, enfocado inicialmente en las vocales (A, E, I, O, U).

### Archivos del Componente

#### 1. TraceLetterGame.tsx
```typescript
interface TraceLetterGameProps {
  onExit?: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}
```

##### Estados
- `currentLetter`: Índice de la vocal actual (0-4)
- `isDrawing`: Boolean para control del estado de dibujo
- `strokes`: Array de trazos completados
- `currentStroke`: Puntos del trazo actual
- `completedLetters`: Array de letras completadas
- `xp`: Puntos de experiencia acumulados

##### Funciones Principales
1. `drawScene(ctx: CanvasRenderingContext2D)`
   ```typescript
   // Renderiza la escena completa
   - Limpia el canvas
   - Dibuja la letra guía
   - Configura estilos de trazo
   - Dibuja trazos completados
   - Dibuja trazo actual
   ```

2. `handleMouseDown/Move/Up`
   ```typescript
   // Gestión de eventos del mouse
   handleMouseDown: Inicia nuevo trazo
   handleMouseMove: Agrega puntos al trazo actual
   handleMouseUp: Finaliza y guarda el trazo
   ```

3. `handleNextLetter()`
   ```typescript
   // Gestión de progresión
   - Valida completitud
   - Actualiza XP
   - Reproduce sonido
   - Avanza a siguiente letra
   ```

#### 2. TraceLetterGame.css
```css
.trace-game {
  /* Contenedor principal */
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.canvas-container {
  /* Contenedor del canvas */
  background: #2a2a40;
  border-radius: 1rem;
}

.progress-letter {
  /* Indicadores de progreso */
  transition: all 0.3s ease;
}

@keyframes pulse {
  /* Animación de letra actual */
}
```

##### Características de Estilo
- Gradientes modernos
- Animaciones suaves
- Feedback visual
- Diseño responsivo
- Sistema de progreso visual

#### 3. letterPaths.ts
```typescript
interface ControlPoint {
  x: number;
  y: number;
  order: number;
}

interface LetterPath {
  points: ControlPoint[];
  segments: number[][];
}

export const LETTER_PATHS: Record<string, LetterPath>
```

### Constantes y Configuración
```typescript
const VOCALES = ['A', 'E', 'I', 'O', 'U'];
const XP_POR_LETRA = 3;
const CANVAS_SIZE = 400;
const LINE_WIDTH = 4;
```

### Integración con Sistemas

#### Sistema de Audio
```typescript
// Reproducción de sonidos
AudioManager.playSound('success');  // Al completar letra
AudioManager.playSound('error');    // En errores
```

#### Sistema de XP
- 3 XP por letra completada
- Nivel calculado: Math.floor(xp / 100) + 1

## WriteWordGame

### Descripción
Juego educativo para practicar la escritura de palabras, con enfoque en vocabulario específico.

### Archivos del Componente

#### 1. WriteWordGame.tsx
```typescript
interface WriteWordGameProps {
  word?: string;
  delayMs?: number;
  onExit?: () => void;
}
```

##### Estados
- `currentWord`: Palabra actual
- `input`: Texto ingresado
- `correctLetters`: Array de booleanos
- `completedWords`: Contador
- `mistakes`: Contador de errores
- `xp`: Puntos acumulados

##### Funciones Principales
1. `handleLetterInput(key: string)`
   ```typescript
   // Validación de entrada
   - Verifica letra correcta
   - Actualiza estado
   - Reproduce sonido
   ```

2. `handleKeyPress(event: KeyboardEvent)`
   ```typescript
   // Gestión de teclado
   - Filtra teclas válidas
   - Procesa entrada
   ```

### Lista de Palabras
```typescript
const WORDS = [
  'ARDILLA', 'BALLENA', 'CABALLO',
  // ... más palabras
];
```

### Sistema de Puntuación
- 5 XP por palabra completada
- Tracking de errores
- Retroalimentación inmediata

### Características Adicionales
- Reproducción de audio por letra
- Reproducción de palabra completa
- Animaciones de texto
- Indicadores de progreso
- Sistema de niveles integrado

## Integración con MainMenu

### Registro de Juegos
```typescript
const juegos = [
  {
    id: 'trazo',
    nombre: 'Trazado de Letras',
    nivel_requerido: 1,
    icono: '✏️'
  },
  {
    id: 'write-word',
    nombre: 'Escribir Palabras',
    nivel_requerido: 2,
    icono: '📝'
  }
];
```

### Sistema de Desbloqueo
- Basado en nivel del usuario
- Indicadores visuales de requisitos
- Animaciones de desbloqueo

## Guía de Implementación de Nuevos Juegos

### Estructura Base
```typescript
export default function NewGame({ onExit }: GameProps) {
  // Estados
  const [xp, setXp] = useState(0);
  const level = Math.floor(xp / 100) + 1;

  // Lógica del juego

  return (
    <div className="game-container">
      <TopBar 
        overrideXp={xp} 
        overrideLevel={level}
        extraButton={{ label: '↩ Volver', onClick: onExit }}
      />
      {/* Contenido del juego */}
    </div>
  );
}
```

### Checklist de Implementación
1. Crear estructura de archivos
2. Implementar lógica principal
3. Integrar sistema de XP
4. Agregar retroalimentación de audio
5. Implementar estilos consistentes
6. Agregar al menú principal
7. Configurar nivel requerido
8. Implementar tests 