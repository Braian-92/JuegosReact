import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BaseSceneProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => void;
}

export default function BaseScene({ onSceneReady }: BaseSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x222222);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    if (onSceneReady) {
      onSceneReady(scene, camera);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSceneReady]);

  return <div ref={mountRef} style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }} />;
}
