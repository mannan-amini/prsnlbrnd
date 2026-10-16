"use client";

import React from "react";
import clsx from "clsx";

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = "button",
  className = "",
  color = "#8AAEFF",
  speed = "5s",
  children,
  onClick,
  ...props
}) => {
  return (
    <Component
      onClick={onClick}
      className={clsx(
        "relative inline-block py-[1px] overflow-hidden rounded-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {/* Moving Star / Border Light */}
      <div
        className="absolute w-[250%] h-[50%] opacity-70 bottom-[-15px] right-[-250%] rounded-full animate-star-movement pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[250%] h-[50%] opacity-70 top-[-15px] left-[-250%] rounded-full animate-star-movement-reverse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      {/* Inner Button Content */}
      <div className="relative z-10 bg-navy/90 hover:bg-navy-light text-white px-7 py-3 rounded-full border border-accent/25 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group-hover:border-accent/60 group-hover:shadow-[0_0_20px_rgba(138,174,255,0.2)]">
        {children}
      </div>
    </Component>
  );
};
