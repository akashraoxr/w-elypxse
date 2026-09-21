"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const bgCanvas = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create Digital Landscape (Topography Grid)
    const geo = new THREE.PlaneGeometry(30, 30, 80, 80);
    const mat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.07
    });
    const landscape = new THREE.Mesh(geo, mat);

    // Tilt it backward to act as a floor that trails off into the distance
    landscape.rotation.x = -Math.PI / 2.2;
    landscape.position.y = -3;
    landscape.position.z = -5;

    // Apply initial mountainous displacement to the grid vertices
    const pos = geo.attributes.position;
    for(let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.4) * Math.cos(y * 0.4) * 1.5);
    }
    geo.computeVertexNormals();

    scene.add(landscape);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        landscape.rotation.z = targetX * 0.2;
        landscape.position.y = -3 + (-targetY * 1);
        
        for(let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            pos.setZ(i, Math.sin(x * 0.4 + elapsedTime * 0.4) * Math.cos(y * 0.4 + elapsedTime * 0.4) * 1.5);
        }
        pos.needsUpdate = true;
        
        renderer.render(scene, camera);
    };
    
    animate();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationFrameId);
        
        // Clean up Three.js resources
        geo.dispose();
        mat.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={mountRef} 
      id="bg-canvas" 
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
