"use client";

import React from "react";
import clsx from "clsx";

interface GradualBlurProps {
  position?: "top" | "bottom";
  height?: string;
  className?: string;
}

export const GradualBlur: React.FC<GradualBlurProps> = ({
  position = "bottom",
  height = "h-24",
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute left-0 right-0 z-10",
        height,
        position === "bottom"
          ? "bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent backdrop-blur-[2px]"
          : "top-0 bg-gradient-to-b from-ink via-ink/80 to-transparent backdrop-blur-[2px]",
        className
      )}
    />
  );
};
