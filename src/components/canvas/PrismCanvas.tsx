"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const PrismCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Icosahedron Gem geometry
    const geometry = new THREE.IcosahedronGeometry(1.1, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#93c5fd"),
      emissive: new THREE.Color("#1e3a8a"),
      roughness: 0.1,
      metalness: 0.15,
      transmission: 0.85,
      ior: 1.6,
      thickness: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Subtle wireframe edge
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8AAEFF"),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.set(1.01, 1.01, 1.01);
    scene.add(wireMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 1.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(new THREE.Color("#8AAEFF"), 4, 15);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(new THREE.Color("#3B82F6"), 3, 15);
    blueLight.position.set(-3, -3, 2);
    scene.add(blueLight);

    let animId: number;
    let angle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      angle += 0.01;
      mesh.rotation.y = angle * 0.7;
      mesh.rotation.x = Math.sin(angle * 0.5) * 0.3;
      wireMesh.rotation.copy(mesh.rotation);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-24 h-24 sm:w-32 sm:h-32 mx-auto pointer-events-none" />;
};
