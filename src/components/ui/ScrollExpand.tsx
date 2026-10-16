"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ScrollExpandProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.92);
  const [borderRadius, setBorderRadius] = useState(32);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = () => setIsReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isReduced) {
      setScale(1);
      setBorderRadius(24);
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the top enters at bottom of screen (1.0) down to center of screen (0.4)
      const visibleRatio = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight * 0.75), 0),
        1
      );

      // Smooth expand from 0.90 to 1.0
      const currentScale = 0.90 + visibleRatio * 0.10;
      const currentRadius = 32 - visibleRatio * 12;

      setScale(currentScale);
      setBorderRadius(currentRadius);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReduced]);

  return (
    <div
      ref={containerRef}
      className={clsx("transition-transform duration-200 ease-out will-change-transform", className)}
      style={{
        transform: `scale(${scale})`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {children}
    </div>
  );
};
