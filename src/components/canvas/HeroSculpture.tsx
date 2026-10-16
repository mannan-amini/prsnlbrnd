"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const HeroSculpture: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      if (!window.WebGLRenderingContext || (!testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl"))) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);

    // Create interconnected geometric glass structures matching wireframe
    // Primary Torus Knot Structure
    const mainGeometry = new THREE.TorusKnotGeometry(1.6, 0.38, 200, 36, 2, 3);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#dbeafe"),
      emissive: new THREE.Color("#0c1c38"),
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.88, // Glass effect
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 1.0,
      specularColor: new THREE.Color("#8AAEFF"),
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
    });

    const mainMesh = new THREE.Mesh(mainGeometry, glassMaterial);
    group.add(mainMesh);

    // Inner wireframe glow accent for high-tech editorial depth
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8AAEFF"),
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireframeMesh = new THREE.Mesh(mainGeometry, wireframeMaterial);
    wireframeMesh.scale.set(1.01, 1.01, 1.01);
    group.add(wireframeMesh);

    // Complementary outer orbital ring
    const ringGeo = new THREE.TorusGeometry(2.6, 0.04, 32, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3B82F6"),
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    group.add(ringMesh);

    // Subtle floating nodes / particles around sculpture
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#8AAEFF"),
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#0c1524"), 2.2);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(new THREE.Color("#8AAEFF"), 6, 25);
    lightCyan.position.set(4, 3, 5);
    scene.add(lightCyan);

    const lightIndigo = new THREE.PointLight(new THREE.Color("#3B82F6"), 5, 25);
    lightIndigo.position.set(-4, -3, 3);
    scene.add(lightIndigo);

    const lightBack = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 1.8);
    lightBack.position.set(0, 5, -5);
    scene.add(lightBack);

    // Interaction State
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.4;
    let targetScale = 1;

    // Mouse Move for subtle parallax
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = normX * 0.4;
      targetRotationX = normY * 0.3;
    };

    // Drag to explore
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      targetRotationY = group.rotation.y;
      targetRotationX = group.rotation.x;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      targetRotationY = group.rotation.y;
      targetRotationX = group.rotation.x;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    // Scroll handling for smooth exit
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollY / heroHeight, 1);
      targetScale = Math.max(1 - progress * 0.4, 0.4);
      group.position.y = -progress * 2.2;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous gentle idle floating
      if (!isDragging) {
        targetRotationY += 0.0025;
        group.rotation.y += (targetRotationY - group.rotation.y) * 0.06;
        group.rotation.x += (targetRotationX - group.rotation.x) * 0.06;
      }

      // Smooth scale interpolation
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      // Ring counter-rotation
      ringMesh.rotation.z -= 0.004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseDrag);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      mainGeometry.dispose();
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-accent/20 to-navy-light/40 blur-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
      style={{ touchAction: "none" }}
    />
  );
};
