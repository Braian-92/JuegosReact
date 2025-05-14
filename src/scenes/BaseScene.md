# BaseScene

## Descripción
Componente fundamental para la creación de escenas 3D utilizando Three.js en React. Proporciona la configuración básica necesaria para renderizar gráficos 3D.

## Props
```typescript
interface BaseSceneProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => void;
}
```

## Funcionalidad
1. **Inicialización 3D**
   - Configura el renderer de Three.js
   - Crea la escena y la cámara
   - Maneja el ciclo de renderizado

2. **Gestión de Recursos**
   - Limpieza automática al desmontar
   - Manejo eficiente de memoria
   - Disposición correcta del renderer

3. **Configuración por Defecto**
   - Campo de visión: 75 grados
   - Color de fondo: #222222
   - Antialiasing activado

## Ejemplo de Uso
```tsx
// Uso básico
<BaseScene />

// Con callback de inicialización
<BaseScene 
  onSceneReady={(scene, camera) => {
    // Añadir objetos 3D, luces, etc.
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }}
/>
```

## Estructura del Componente
```tsx
<div
  ref={mountRef}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }}
/>
```

## Ciclo de Vida
1. **Montaje**
   - Creación del renderer
   - Configuración de la escena
   - Inicio del loop de animación

2. **Actualización**
   - Renderizado continuo
   - Ejecución de animaciones
   - Manejo de eventos

3. **Desmontaje**
   - Limpieza del renderer
   - Liberación de memoria
   - Eliminación de event listeners

## Mejores Prácticas
1. **Rendimiento**
   - Usar `useCallback` para `onSceneReady`
   - Minimizar cambios en la escena
   - Optimizar geometrías y materiales

2. **Memoria**
   - Disponer correctamente de objetos 3D
   - Limpiar texturas y materiales
   - Cancelar animaciones al desmontar

3. **Responsividad**
   - Manejar cambios de tamaño de ventana
   - Actualizar aspect ratio
   - Mantener proporciones correctas

## Integración
1. **Con Otros Componentes**
   - Base para escenas complejas
   - Soporte para múltiples cámaras
   - Integración con controles de usuario

2. **Sistema de Eventos**
   - Soporte para interacción
   - Manejo de input del usuario
   - Eventos del canvas 