# InventoryPanel

## Descripción
Panel de inventario que muestra una colección de stickers y elementos coleccionables. Diseñado como un overlay que permite a los usuarios ver sus logros y colecciones desbloqueadas en el juego.

## Props
```typescript
interface Props {
  onClose: () => void;    // Función para cerrar el panel
  itemScale?: number;     // Factor de escala para los items (default: 1)
}
```

## Datos del Inventario
```typescript
// Colección completa de stickers disponibles
const ALL_STICKERS = [
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',...
  // Más de 200 stickers en total
];

// Índices de stickers desbloqueados
const UNLOCKED = [0, 1, 5, 12, 25, 50, 77, 123, 150, 199];
```

## Funcionalidad
1. **Sistema de Coleccionables**
   - Más de 200 stickers disponibles
   - Sistema de desbloqueo progresivo
   - Visualización de items bloqueados/desbloqueados

2. **Interfaz Adaptable**
   - Grid responsive de items
   - Escalado flexible de elementos
   - Diseño optimizado para diferentes pantallas

3. **Gestión de Estado**
   - Control de visibilidad del panel
   - Manejo de estado de items
   - Integración con sistema de progreso

## Ejemplo de Uso
```tsx
// Uso básico
<InventoryPanel
  onClose={() => setShowInventory(false)}
/>

// Con escala personalizada
<InventoryPanel
  onClose={handleClose}
  itemScale={1.5}
/>
```

## Estructura del Componente
```tsx
<div className="inventory-overlay">
  <div className="inventory-panel">
    {/* Encabezado */}
    <div className="inventory-header">
      <h2>🎒 Inventario</h2>
      <button className="close-btn">✖️</button>
    </div>

    {/* Grid de items */}
    <div className="inventory-grid">
      {ALL_STICKERS.map((item, index) => (
        <div className="inventory-item">
          {item}
        </div>
      ))}
    </div>
  </div>
</div>
```

## Estilos y Diseño
1. **Layout Principal**
   - Overlay con fondo semi-transparente
   - Panel central con scroll
   - Diseño responsive

2. **Grid de Items**
   - Grid auto-ajustable
   - Tamaño mínimo de items configurable
   - Espaciado consistente

3. **Estados Visuales**
   - Items bloqueados/desbloqueados
   - Efectos hover
   - Animaciones suaves

## Mejores Prácticas
1. **Rendimiento**
   - Virtualización para grandes colecciones
   - Lazy loading de emojis
   - Optimización de re-renders

2. **Usabilidad**
   - Feedback visual claro
   - Navegación intuitiva
   - Indicadores de progreso

3. **Mantenimiento**
   - Datos separados de la lógica
   - Sistema modular de stickers
   - Documentación de estados

## Integración
1. **Con TopBar**
   - Activación desde botón de inventario
   - Consistencia visual
   - Transiciones suaves

2. **Sistema de Progreso**
   - Desbloqueo de items
   - Tracking de colección
   - Notificaciones de nuevos items

## Consideraciones Técnicas
1. **Cálculo de Grid**
   ```typescript
   const minSize = 60 * itemScale;
   ```
   - Tamaño base de 60px
   - Escalado flexible
   - Responsive design

2. **Optimizaciones**
   - Uso de CSS Grid
   - Manejo eficiente de memoria
   - Caching de items frecuentes

3. **Accesibilidad**
   - Navegación por teclado
   - Etiquetas descriptivas
   - Soporte para lectores de pantalla 