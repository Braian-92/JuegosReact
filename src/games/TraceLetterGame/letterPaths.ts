interface ControlPoint {
  x: number;
  y: number;
  order: number;
}

interface LetterPath {
  points: ControlPoint[];
  segments: number[][];  // Pares de índices que conectan los puntos
}

// Las coordenadas están normalizadas de 0 a 1 para ser escalables
export const LETTER_PATHS: Record<string, LetterPath> = {
  'A': {
    points: [
      { x: 0.2, y: 0.8, order: 1 },  // Base izquierda
      { x: 0.5, y: 0.2, order: 2 },  // Punta superior
      { x: 0.8, y: 0.8, order: 3 },  // Base derecha
      { x: 0.35, y: 0.5, order: 4 }, // Línea horizontal izquierda
      { x: 0.65, y: 0.5, order: 5 }  // Línea horizontal derecha
    ],
    segments: [[0, 1], [1, 2], [3, 4]]  // Conexiones entre puntos
  },
  'E': {
    points: [
      { x: 0.3, y: 0.2, order: 1 },  // Superior izquierdo
      { x: 0.7, y: 0.2, order: 2 },  // Superior derecho
      { x: 0.3, y: 0.5, order: 3 },  // Medio izquierdo
      { x: 0.6, y: 0.5, order: 4 },  // Medio derecho
      { x: 0.3, y: 0.8, order: 5 },  // Inferior izquierdo
      { x: 0.7, y: 0.8, order: 6 }   // Inferior derecho
    ],
    segments: [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5]]
  },
  'I': {
    points: [
      { x: 0.4, y: 0.2, order: 1 },  // Superior izquierdo
      { x: 0.6, y: 0.2, order: 2 },  // Superior derecho
      { x: 0.5, y: 0.2, order: 3 },  // Superior centro
      { x: 0.5, y: 0.8, order: 4 },  // Inferior centro
      { x: 0.4, y: 0.8, order: 5 },  // Inferior izquierdo
      { x: 0.6, y: 0.8, order: 6 }   // Inferior derecho
    ],
    segments: [[0, 1], [2, 3], [4, 5]]
  },
  'O': {
    points: [
      { x: 0.5, y: 0.2, order: 1 },  // Superior
      { x: 0.7, y: 0.3, order: 2 },  // Superior derecho
      { x: 0.7, y: 0.7, order: 3 },  // Inferior derecho
      { x: 0.5, y: 0.8, order: 4 },  // Inferior
      { x: 0.3, y: 0.7, order: 5 },  // Inferior izquierdo
      { x: 0.3, y: 0.3, order: 6 }   // Superior izquierdo
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]
  },
  'U': {
    points: [
      { x: 0.3, y: 0.2, order: 1 },  // Superior izquierdo
      { x: 0.3, y: 0.6, order: 2 },  // Medio izquierdo
      { x: 0.5, y: 0.8, order: 3 },  // Inferior centro
      { x: 0.7, y: 0.6, order: 4 },  // Medio derecho
      { x: 0.7, y: 0.2, order: 5 }   // Superior derecho
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4]]
  }
};

export const POINT_RADIUS = 10;
export const LINE_WIDTH = 4;
export const POINT_COLOR = '#ff9800';
export const LINE_COLOR = '#4caf50';
export const GUIDE_COLOR = '#666666';
export const ACTIVE_POINT_COLOR = '#f57c00';
export const COMPLETED_POINT_COLOR = '#388e3c'; 