# audioPlayer.ts - Sistema de Audio

## Propósito
Gestiona la reproducción de audio en toda la aplicación, proporcionando una interfaz unificada para sonidos de feedback y efectos.

## Estructura

### Clase AudioManager
```typescript
export class AudioManager {
  private static getAudioPath(type: 'success' | 'error' | 'letter' | 'word', value?: string): string
  static playSound(type: 'success' | 'error' | 'letter' | 'word', value?: string): void
}
```

## Tipos de Audio

### 1. Efectos del Sistema
- `success`: Sonido de éxito (BONUS.mp3)
- `error`: Sonido de error (ERROR.mp3)

### 2. Contenido Educativo
- `letter`: Pronunciación de letras individuales
- `word`: Pronunciación de palabras completas

## Implementación

### getAudioPath
```typescript
private static getAudioPath(type: string, value?: string): string {
  switch (type) {
    case 'success':
      return `${process.env.PUBLIC_URL}/audio/efects/BONUS.mp3`;
    case 'error':
      return `${process.env.PUBLIC_URL}/audio/efects/ERROR.mp3`;
    case 'letter':
      return `${process.env.PUBLIC_URL}/audio/letters/${value}.mp3`;
    case 'word':
      return `${process.env.PUBLIC_URL}/audio/words/${value}.mp3`;
    default:
      throw new Error(`Tipo de audio no soportado: ${type}`);
  }
}
```

### playSound
```typescript
static playSound(type: 'success' | 'error' | 'letter' | 'word', value?: string) {
  try {
    const audioPath = this.getAudioPath(type, value);
    const audio = new Audio(audioPath);
    audio.play().catch(error => {
      console.error(`Error reproduciendo audio ${type}:`, error);
    });
  } catch (error) {
    console.error('Error en AudioManager:', error);
  }
}
```

## Uso en Componentes

### En TraceLetterGame
```typescript
// Al completar una letra
AudioManager.playSound('success');
```

### En WriteWordGame
```typescript
// Al escribir una letra correcta
AudioManager.playSound('letter', key);

// Al completar una palabra
AudioManager.playSound('word', currentWord);
```

## Estructura de Archivos

### Organización
```
public/
└── audio/
    ├── efects/
    │   ├── BONUS.mp3
    │   └── ERROR.mp3
    ├── letters/
    │   └── [A-Z].mp3
    └── words/
        └── [palabras].mp3
```

## Manejo de Errores

### Tipos de Errores
1. Audio no encontrado
2. Reproducción fallida
3. Tipo de audio no soportado

### Estrategia de Manejo
```typescript
try {
  // Intento de reproducción
} catch (error) {
  console.error('Error en AudioManager:', error);
  // No interrumpe el flujo de la aplicación
}
```

## Integración con React

### Uso con useEffect
```typescript
useEffect(() => {
  const timeout = setTimeout(() => {
    AudioManager.playSound('word', word);
  }, delayMs);
  
  return () => clearTimeout(timeout);
}, [word, delayMs]);
```

### Consideraciones de Performance
- Carga bajo demanda
- No bloquea el hilo principal
- Manejo asíncrono de errores

## Mejores Prácticas

### Patrones de Diseño
- Singleton para gestión centralizada
- Factory para creación de rutas
- Error handling consistente

### Tipado
```typescript
type AudioType = 'success' | 'error' | 'letter' | 'word';
```

### Mantenibilidad
- Rutas centralizadas
- Manejo de errores robusto
- Nombres descriptivos

## Desarrollo Futuro

### Posibles Mejoras
1. Precarga de audio común
2. Pool de Audio objects
3. Controles de volumen
4. Soporte para múltiples idiomas

### Consideraciones
- Compatibilidad de navegadores
- Optimización de recursos
- Accesibilidad 