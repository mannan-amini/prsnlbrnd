"use client";

import React, { useEffect, useRef } from "react";

interface WavesProps {
  className?: string;
  lineColor?: string;
}

export const Waves: React.FC<WavesProps> = ({
  className = "",
  lineColor = "rgba(71, 85, 105, 0.05)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      const lines = 8;
      ctx.lineWidth = 1;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yBase = (canvas.height / (lines + 1)) * (i + 1);

        for (let x = 0; x <= canvas.width; x += 20) {
          const y = yBase + Math.sin(x * 0.004 + t + i * 0.4) * 22;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  );
};
