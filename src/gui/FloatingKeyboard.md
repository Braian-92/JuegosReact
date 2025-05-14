# FloatingKeyboard

## Descripción
Teclado virtual flotante que proporciona una interfaz de entrada de texto interactiva. Diseñado específicamente para juegos educativos que requieren entrada de texto, con soporte para el alfabeto español.

## Props
```typescript
interface Props {
  onKeyPress: (key: string) => void;  // Función llamada al presionar una tecla
  scale?: number;                      // Factor de escala del teclado (default: 1)
  highlightKey?: string;              // Tecla a resaltar
  showHighlight?: boolean;            // Controla visibilidad del resaltado (default: true)
}
```

## Estructura de Datos
```typescript
const keys: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];
```

## Características
1. **Diseño Adaptable**
   - Layout QWERTY español con Ñ
   - Soporte completo para números (0-9)
   - Distribución en filas optimizada

2. **Sistema de Resaltado**
   - Resaltado visual de teclas específicas
   - Control de visibilidad del resaltado
   - Útil para indicaciones visuales en juegos

3. **Escalabilidad**
   - Ajuste de tamaño mediante prop `scale`
   - Transformación desde el centro inferior
   - Mantiene proporciones en diferentes tamaños

## Ejemplo de Uso
```tsx
// Uso básico
<FloatingKeyboard
  onKeyPress={(key) => console.log(`Tecla presionada: ${key}`)}
/>

// Con resaltado y escala
<FloatingKeyboard
  onKeyPress={handleKeyPress}
  scale={1.2}
  highlightKey="A"
  showHighlight={true}
/>
```

## Estructura del Componente
```tsx
<div className="floating-keyboard">
  {/* Filas de teclas */}
  {keys.map((row, rowIndex) => (
    <div className="keyboard-row">
      {/* Teclas individuales */}
      {row.map((key) => (
        <button className="key">
          {key}
        </button>
      ))}
    </div>
  ))}
</div>
```

## Mejores Prácticas
1. **Manejo de Eventos**
   - Implementar `onKeyPress` de manera eficiente
   - Considerar debouncing para pulsaciones rápidas
   - Manejar eventos de touch en dispositivos móviles

2. **Accesibilidad**
   - Mantener tamaños mínimos para interacción táctil
   - Proporcionar feedback visual al presionar
   - Considerar feedback sonoro (opcional)

3. **Rendimiento**
   - Evitar re-renders innecesarios
   - Usar React.memo si es necesario
   - Optimizar transformaciones CSS

## Casos de Uso
1. **Juegos de Escritura**
   - Práctica de ortografía
   - Ejercicios de vocabulario
   - Juegos de palabras

2. **Aprendizaje Interactivo**
   - Enseñanza de mecanografía
   - Ejercicios de idiomas
   - Actividades educativas

3. **Interfaces Táctiles**
   - Tablets y dispositivos móviles
   - Pantallas interactivas
   - Quioscos educativos 