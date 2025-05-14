# LevelBar

## Descripción
Componente de barra de progreso que visualiza el nivel actual del usuario y su progreso hacia el siguiente nivel. Diseñado para proporcionar feedback visual del avance en el sistema de gamificación.

## Props
```typescript
interface Props {
  xp: number;      // Puntos de experiencia actuales
  level: number;   // Nivel actual del usuario
}
```

## Funcionalidad
1. **Cálculo de Progreso**
   - Calcula el progreso dentro del nivel actual (0-100)
   - Utiliza el módulo de XP para determinar el progreso
   - Limita el progreso máximo al 100%

2. **Visualización**
   - Muestra el nivel actual en un indicador circular
   - Presenta una barra de progreso visual
   - Indica valores numéricos de progreso actual y máximo

3. **Actualización Dinámica**
   - Se actualiza automáticamente con cambios en XP
   - Transiciones suaves entre estados
   - Mantiene consistencia visual

## Ejemplo de Uso
```tsx
// Uso básico
<LevelBar
  xp={75}
  level={1}
/>

// Nivel avanzado con más XP
<LevelBar
  xp={250}
  level={3}
/>
```

## Estructura del Componente
```tsx
<div className="level-bar-container">
  {/* Indicador de nivel */}
  <div className="level-indicator">
    {level}
  </div>

  {/* Barra de progreso */}
  <div className="level-bar-track">
    <div className="level-bar-fill" />
    
    {/* Etiquetas de progreso */}
    <div className="level-bar-labels">
      <span>{progress}</span>
      <span>100</span>
    </div>
  </div>
</div>
```

## Estilos y Diseño
1. **Contenedor Principal**
   - Disposición horizontal
   - Alineación centrada de elementos
   - Espaciado consistente

2. **Indicador de Nivel**
   - Diseño circular distintivo
   - Tipografía clara y legible
   - Contraste adecuado

3. **Barra de Progreso**
   - Relleno animado suave
   - Colores que indican progreso
   - Etiquetas de valores claras

## Mejores Prácticas
1. **Rendimiento**
   - Minimizar cálculos innecesarios
   - Usar CSS para animaciones
   - Evitar re-renders excesivos

2. **Accesibilidad**
   - Proporcionar información via ARIA
   - Asegurar contraste suficiente
   - Incluir textos descriptivos

3. **Mantenimiento**
   - Código modular y reutilizable
   - Documentación clara de props
   - Separación de lógica y presentación

## Integración
1. **Con TopBar**
   - Componente hijo de TopBar
   - Recibe props de sistema de XP
   - Mantiene consistencia visual

2. **Sistema de Gamificación**
   - Refleja progreso del usuario
   - Integración con sistema de recompensas
   - Feedback visual de logros

## Consideraciones Técnicas
1. **Cálculos**
   ```typescript
   const progress = Math.min((xp % 100), 100);
   ```
   - Módulo para obtener progreso dentro del nivel
   - Límite máximo de 100
   - Manejo de casos extremos

2. **Optimizaciones**
   - Memoización de cálculos costosos
   - Uso eficiente de memoria
   - Manejo de actualizaciones frecuentes 