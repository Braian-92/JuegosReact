# Documentación del Proyecto JuegosReact 🎮

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes Principales](#componentes-principales)
4. [Juegos Implementados](#juegos-implementados)
5. [Sistema de Audio](#sistema-de-audio)
6. [Sistema de Progresión](#sistema-de-progresión)
7. [Interfaz de Usuario](#interfaz-de-usuario)
8. [Guía de Desarrollo](#guía-de-desarrollo)

## Descripción General

JuegosReact es una plataforma educativa que contiene múltiples juegos interactivos diseñados para ayudar en el aprendizaje. El proyecto está construido utilizando React y TypeScript, con un enfoque en la modularidad y la experiencia del usuario.

## Estructura del Proyecto

```
JuegosReact/
├── src/
│   ├── core/
│   │   └── logic/
│   │       └── audioPlayer.ts       # Gestión de audio
│   ├── games/
│   │   ├── TraceLetterGame/        # Juego de trazado de letras
│   │   └── WriteWordGame/          # Juego de escritura de palabras
│   ├── gui/
│   │   └── TopBar/                 # Barra superior común
│   └── menu/
│       └── MainMenu.tsx            # Menú principal
├── public/
│   └── audio/                      # Recursos de audio
└── package.json
```

## Componentes Principales

### MainMenu (src/menu/MainMenu.tsx)
- **Propósito**: Menú principal de la aplicación
- **Características**:
  - Gestión de estado del juego actual
  - Sistema de niveles y desbloqueo
  - Interfaz de cuadrícula para selección de juegos
- **Estado**:
  - `juegoActual`: Juego seleccionado
  - `user`: Perfil del usuario
  - `showProfile`: Estado de visualización del perfil

### AudioManager (src/core/logic/audioPlayer.ts)
- **Propósito**: Gestión centralizada de audio
- **Métodos**:
  - `getAudioPath`: Obtiene la ruta del archivo de audio
  - `playSound`: Reproduce sonidos del sistema
- **Tipos de Audio**:
  - success: Sonido de éxito
  - error: Sonido de error
  - letter: Sonido de letra
  - word: Sonido de palabra

## Juegos Implementados

### TraceLetterGame
**Ubicación**: `src/games/TraceLetterGame/`

#### Componentes:
1. **TraceLetterGame.tsx**
   - **Estado**:
     - `currentLetter`: Letra actual (0-4 para A,E,I,O,U)
     - `isDrawing`: Estado de dibujo activo
     - `strokes`: Array de trazos completados
     - `currentStroke`: Trazo actual
     - `completedLetters`: Letras completadas
     - `xp`: Puntos de experiencia

   - **Funciones Principales**:
     - `drawScene`: Renderiza la escena del canvas
     - `handleMouseDown`: Inicia un trazo
     - `handleMouseMove`: Continúa el trazo
     - `handleMouseUp`: Finaliza el trazo
     - `handleNextLetter`: Avanza a la siguiente letra
     - `clearCanvas`: Limpia el canvas

2. **TraceLetterGame.css**
   - Estilos modernos con gradientes
   - Animaciones y transiciones
   - Sistema de progreso visual
   - Diseño responsivo

#### Características:
- Canvas de 400x400 pixels
- Sistema de trazado libre
- Letra guía de fondo
- Retroalimentación visual y sonora
- Sistema de progreso de vocales
- 3 XP por letra completada

### WriteWordGame
**Ubicación**: `src/games/WriteWordGame/`

- **Características**:
  - Lista predefinida de palabras
  - Sistema de escritura por teclado
  - Validación de letras en tiempo real
  - Retroalimentación visual y sonora
  - 5 XP por palabra completada

## Sistema de Progresión

### Sistema de XP
- Basado en acciones completadas:
  - Trazado de letra: 3 XP
  - Palabra completada: 5 XP
- Nivel = Math.floor(xp / 100) + 1

### Desbloqueo de Contenido
- Juegos bloqueados por nivel
- Indicador visual de requisitos
- Animación de desbloqueo

## Interfaz de Usuario

### TopBar
- Muestra nivel actual
- Barra de progreso de XP
- Botón de retorno
- Diseño consistente en todos los juegos

### Elementos Comunes
- Paleta de colores coherente
- Animaciones suaves
- Feedback visual y sonoro
- Diseño responsivo

## Guía de Desarrollo

### Agregar Nuevo Juego
1. Crear carpeta en `src/games/`
2. Implementar componente principal
3. Agregar entrada en `MainMenu.tsx`
4. Configurar sistema de XP
5. Implementar retroalimentación de audio

### Convenciones de Código
- TypeScript estricto
- Componentes funcionales con hooks
- CSS modular por componente
- Nombres descriptivos en español

### Mejores Prácticas
- Separación de lógica y presentación
- Reutilización de componentes comunes
- Manejo centralizado de estado
- Documentación inline
- Testing de componentes

## Contribución
Para contribuir al proyecto:
1. Fork del repositorio
2. Crear rama feature/fix
3. Implementar cambios
4. Crear Pull Request

## Recursos
- React Documentation
- TypeScript Handbook
- Canvas API MDN
- Web Audio API 