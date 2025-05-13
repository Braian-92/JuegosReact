import * as THREE from 'three';

export default function SpinningCube(scene: THREE.Scene, camera: THREE.Camera) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Luz puntual
  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Fondo
  scene.background = new THREE.Color(0x222222);

  // Animación
  const animateCube = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animateCube);
  };
  animateCube();
}
