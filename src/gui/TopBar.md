# TopBar

## Descripción
La barra superior es un componente fundamental que muestra información del usuario y controles principales del juego. Se ubica en la parte superior de la aplicación y proporciona acceso a funcionalidades clave.

## Props
```typescript
interface TopBarProps {
  overrideXp?: number;         // Permite sobrescribir los puntos de experiencia mostrados
  overrideLevel?: number;      // Permite sobrescribir el nivel mostrado
  extraButton?: {              // Botón adicional opcional
    label: string;            // Texto/emoji del botón
    onClick?: () => void;     // Función a ejecutar al hacer clic
  };
}
```

## Estados Internos
- `showSidebar: boolean` - Controla la visibilidad del panel de amigos
- `showInventory: boolean` - Controla la visibilidad del panel de inventario

## Funcionalidad
1. **Información de Usuario**
   - Muestra el botón de usuario (🧑)
   - Visualiza el nivel actual y XP

2. **Sistema de Progreso**
   - Integra el componente `LevelBar`
   - Muestra puntos de experiencia actuales (⭐)

3. **Acceso a Funcionalidades**
   - Toggle del panel de inventario (🧳)
   - Toggle del panel de amigos (👥)
   - Soporte para botón adicional personalizable

## Ejemplo de Uso
```tsx
// Uso básico
<TopBar />

// Con valores personalizados
<TopBar 
  overrideXp={150}
  overrideLevel={2}
  extraButton={{
    label: "🎮 Jugar",
    onClick: () => startGame()
  }}
/>
```

## Estructura del Componente
```tsx
<div className="top-bar">
  {/* Sección izquierda */}
  <button>🧑 Usuario</button>

  {/* Sección central */}
  <div className="top-center">
    <LevelBar />
    <button>⭐ XP</button>
    <button>🧳 Inventario</button>
  </div>

  {/* Sección derecha */}
  <div className="top-right">
    {/* Botón extra opcional */}
    {/* Botón de amigos */}
  </div>
</div>
```

## Dependencias
- `LevelBar` - Para mostrar el progreso del usuario
- `FriendsSidebar` - Panel lateral de amigos
- `InventoryPanel` - Panel de inventario

## Mejores Prácticas
1. **Gestión de Estado**
   - Mantener el estado de los paneles en el componente padre
   - Usar los toggles para controlar la visibilidad

2. **Personalización**
   - Utilizar el prop `extraButton` para añadir funcionalidad específica
   - Mantener consistencia en los iconos y etiquetas

3. **Rendimiento**
   - Los paneles se renderizan condicionalmente
   - Se utilizan callbacks memorizados para los eventos 