# SpinningCube

## Descripción
Componente de ambiente 3D que crea un cubo giratorio con iluminación dinámica. Sirve como ejemplo de implementación de una escena 3D interactiva y como fondo visual para la aplicación.

## Parámetros
```typescript
function SpinningCube(scene: THREE.Scene, camera: THREE.Camera)
```

## Elementos 3D
1. **Geometría**
   ```typescript
   const geometry = new THREE.BoxGeometry();
   const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
   const cube = new THREE.Mesh(geometry, material);
   ```

2. **Iluminación**
   ```typescript
   // Luz ambiental
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
   
   // Luz puntual
   const pointLight = new THREE.PointLight(0xffffff, 1.2);
   pointLight.position.set(5, 5, 5);
   ```

## Funcionalidad
1. **Configuración de Escena**
   - Creación del cubo
   - Configuración de luces
   - Establecimiento del fondo

2. **Sistema de Iluminación**
   - Luz ambiental para iluminación base
   - Luz puntual para sombras y profundidad
   - Intensidades calibradas

3. **Animación**
   - Rotación continua en X e Y
   - Velocidad constante
   - Loop de animación automático

## Ejemplo de Uso
```tsx
import BaseScene from '../BaseScene';
import SpinningCube from './SpinningCube';

function Environment() {
  return (
    <BaseScene 
      onSceneReady={(scene, camera) => {
        SpinningCube(scene, camera);
      }}
    />
  );
}
```

## Configuración Visual
1. **Materiales**
   - Color del cubo: #00FFCC
   - Material estándar con sombreado
   - Responde a la iluminación

2. **Luces**
   - Ambiental: Blanca (60% intensidad)
   - Puntual: Blanca (120% intensidad)
   - Posición de luz: (5, 5, 5)

3. **Fondo**
   - Color: #222222 (gris oscuro)
   - Consistente con el tema

## Animación
```typescript
const animateCube = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  requestAnimationFrame(animateCube);
};
```

## Mejores Prácticas
1. **Rendimiento**
   - Geometría simple
   - Animación eficiente
   - Uso mínimo de recursos

2. **Mantenimiento**
   - Código modular
   - Parámetros configurables
   - Fácil de extender

3. **Integración**
   - Compatible con BaseScene
   - Independiente de la cámara
   - Adaptable a diferentes contextos

## Casos de Uso
1. **Fondos Interactivos**
   - Menús principales
   - Pantallas de carga
   - Ambientación visual

2. **Demostración**
   - Ejemplo de Three.js
   - Tutorial de animación
   - Base para escenas complejas 