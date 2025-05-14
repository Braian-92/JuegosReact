# Conceptos de React en WriteWordGame 🎮

## Índice
1. [Componentes en React](#componentes-en-react)
2. [Props](#props)
3. [Hooks](#hooks)
4. [Efectos y Ciclo de Vida](#efectos-y-ciclo-de-vida)
5. [Manejo de Eventos](#manejo-de-eventos)
6. [Comunicación entre Componentes](#comunicación-entre-componentes)

## Componentes en React

### Definición del Componente
```typescript
export default function WriteWordGame({ word, delayMs = 1000, onExit }: WriteWordGameProps) {
  // ... contenido del componente
}
```

#### Explicación:
- En React, un componente es una función que retorna JSX (HTML + JavaScript)
- Los componentes deben comenzar con mayúscula
- `export default` permite importar el componente desde otros archivos
- Los parámetros de la función son las "props" del componente

## Props

### Definición de Props
```typescript
interface WriteWordGameProps {
  word?: string;         // El '?' indica que es opcional
  delayMs?: number;      // Valor por defecto: 1000
  onExit?: () => void;   // Función callback
}
```

#### Explicación:
- Las props son la forma de pasar datos de un componente padre a un hijo
- Son inmutables (no se pueden modificar dentro del componente)
- Pueden incluir:
  - Datos primitivos (strings, números, etc.)
  - Funciones (callbacks)
  - Objetos
  - Otros componentes

### Uso de Props
```typescript
// En el componente padre
<WriteWordGame 
  word="CASA"
  delayMs={2000}
  onExit={() => setJuegoActual(null)}
/>

// En WriteWordGame
const handleExit = () => {
  onExit?.(); // El '?.' verifica si existe antes de llamar
};
```

## Hooks

### useState
```typescript
const [currentWord, setCurrentWord] = useState<string>(word || WORDS[0]);
const [input, setInput] = useState<string>('');
const [mistakes, setMistakes] = useState<number>(0);
```

#### Explicación:
- `useState` es un hook que permite agregar estado a componentes funcionales
- Retorna un array con dos elementos:
  1. El valor actual del estado
  2. Una función para actualizar ese estado
- La sintaxis `[valor, setValor]` es desestructuración de array
- El tipo genérico `<string>` especifica el tipo de dato del estado

### Actualizando Estado
```typescript
// Actualización directa
setInput('');

// Actualización basada en estado anterior
setMistakes(prev => prev + 1);

// Actualización de múltiples estados
const handleLetterInput = (key: string) => {
  if (key === nextLetter) {
    setInput(prev => prev + key);     // Agrega la letra
    setCorrectLetters(prev => [...prev, true]);  // Marca como correcta
  } else {
    setMistakes(prev => prev + 1);    // Incrementa errores
  }
};
```

## Efectos y Ciclo de Vida

### useEffect
```typescript
// Efecto para reproducir audio de palabra
useEffect(() => {
  const timeout = setTimeout(() => {
    AudioManager.playSound('word', currentWord);
  }, delayMs);
  
  return () => clearTimeout(timeout); // Cleanup function
}, [currentWord, delayMs]);
```

#### Explicación:
- `useEffect` ejecuta efectos secundarios en componentes
- Recibe dos parámetros:
  1. Una función con el código a ejecutar
  2. Un array de dependencias
- Se ejecuta:
  - Al montar el componente
  - Cuando cambian las dependencias
  - Al desmontar (cleanup function)

### Tipos de Efectos
```typescript
// Se ejecuta en cada render
useEffect(() => {
  // código
});

// Se ejecuta solo al montar
useEffect(() => {
  // código
}, []);

// Se ejecuta cuando cambian las dependencias
useEffect(() => {
  // código
}, [dependencia1, dependencia2]);
```

## Manejo de Eventos

### Event Handlers
```typescript
const handleKeyPress = useCallback((event: KeyboardEvent) => {
  const key = event.key.toUpperCase();
  if (key.length === 1 && /[A-ZÑ]/.test(key)) {
    handleLetterInput(key);
  }
}, [handleLetterInput]);
```

#### Explicación:
- Los event handlers son funciones que responden a eventos
- `useCallback` memoriza la función para evitar recreaciones innecesarias
- Se pueden tipar los eventos con TypeScript
- Común usar el prefijo `handle` para nombrarlos

### Event Listeners
```typescript
useEffect(() => {
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [handleKeyPress]);
```

## Comunicación entre Componentes

### De Padre a Hijo (Props)
```typescript
// MainMenu.tsx (Padre)
<WriteWordGame onExit={() => setJuegoActual(null)} />

// WriteWordGame.tsx (Hijo)
export default function WriteWordGame({ onExit }: WriteWordGameProps) {
  // Usar onExit cuando sea necesario
}
```

### De Hijo a Padre (Callbacks)
```typescript
// Padre proporciona callback
<WriteWordGame onComplete={(score) => updateUserScore(score)} />

// Hijo llama al callback
const handleComplete = () => {
  onComplete?.(xp);
};
```

### Compartir Estado
```typescript
// Usando Context (para estado global)
const { user, updateUser } = useContext(UserContext);

// Levantando el estado (state lifting)
const [gameState, setGameState] = useState('playing');
<WriteWordGame 
  gameState={gameState}
  onStateChange={setGameState}
/>
```

## Optimización

### Memorización
```typescript
// Memorizar valores calculados
const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);

// Memorizar callbacks
const handleLetterInput = useCallback((key: string) => {
  // código
}, [dependencias]);
```

### Prevenir Renders Innecesarios
```typescript
// Componente memorizado
const ProgressIndicator = memo(({ progress }: ProgressProps) => {
  return <div>{progress}%</div>;
});
```

## Debugging

### Usando console.log
```typescript
useEffect(() => {
  console.log('Estado actual:', {
    currentWord,
    input,
    mistakes,
    xp
  });
}, [currentWord, input, mistakes, xp]);
```

### React DevTools
- Instalar React DevTools en el navegador
- Inspeccionar:
  - Jerarquía de componentes
  - Props
  - Estado
  - Hooks
  - Renders

## Buenas Prácticas

1. **Componentes Pequeños y Enfocados**
   - Cada componente debe tener una única responsabilidad
   - Extraer lógica compleja a componentes separados

2. **Nombrado Descriptivo**
   ```typescript
   const handleLetterInput = ...  // En lugar de handleInput
   const [isGameComplete, setIsGameComplete] = ...  // Boolean con prefijo 'is'
   ```

3. **Tipado Estricto**
   ```typescript
   interface Props {
     word: string;        // Requerido
     onExit?: () => void; // Opcional
   }
   ```

4. **Manejo de Efectos**
   - Siempre incluir cleanup functions cuando sea necesario
   - Especificar todas las dependencias necesarias
   - Usar ESLint para detectar dependencias faltantes 