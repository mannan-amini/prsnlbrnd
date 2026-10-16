"use client";

import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  delay?: number;
  className?: string;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 24,
  direction = "vertical",
  delay = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  const transformStyle =
    direction === "vertical"
      ? isVisible
        ? "translateY(0)"
        : `translateY(${distance}px)`
      : isVisible
      ? "translateX(0)"
      : `translateX(${distance}px)`;

  return (
    <div
      ref={ref}
      className={clsx("transition-all duration-700 ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transformStyle,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export const Reveal = AnimatedContent;
