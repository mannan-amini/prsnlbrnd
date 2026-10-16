"use client";

import React, { useRef } from "react";
import { LineWaves } from "@/components/ui/LineWaves";
import { Crosshair } from "@/components/ui/Crosshair";
import { StarBorder } from "@/components/ui/StarBorder";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { ArrowDown, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    const el = document.getElementById("topics");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen bg-ink flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 md:px-20 overflow-hidden"
      dir="rtl"
    >
      {/* 1. Official React Bits Line Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LineWaves
          color1="#8AAEFF"
          color2="#3B82F6"
          color3="#93C5FD"
          speed={0.35}
          lineCount={75}
          lineWidth={1.2}
          glow={0.75}
          brightness={1.05}
          highlight={0.95}
          highlightWidth={1.2}
          warpIntensity={1.2}
          warpScale={1.1}
          rotation={-30}
          enableMouseInteraction={true}
          mouseInfluence={2.2}
          clickRipple={true}
          opacity={0.88}
          edgeFade={0.15}
          className="w-full h-full"
        />
        {/* Subtle vignette mask behind typography */}
        <div className="absolute inset-0 bg-gradient-to-l from-ink/90 via-ink/50 to-transparent pointer-events-none" />
      </div>

      {/* 2. Official React Bits Crosshair with Element Locking */}
      <Crosshair
        containerRef={heroRef}
        color="#8AAEFF"
        thickness={1.5}
        opacity={0.9}
        targetEffect="lock"
        targetSelector="[data-crosshair-target], button, a, .crosshair-target"
        showCoordinates={true}
        smoothing={0.25}
        clickPulse={true}
      />

      {/* 4. Top Technical Metadata Tag */}
      <div className="relative z-20 flex items-center justify-between">
        <div
          data-crosshair-target
          className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transition-colors hover:border-accent/40"
        >
          <span className="font-mono text-accent text-xs font-semibold">01</span>
          <span className="w-1 h-1 rounded-full bg-accent/60" />
          <span className="font-mono text-[11px] text-muted-light tracking-widest uppercase">
            THINK · WRITE · BUILD
          </span>
        </div>
      </div>

      {/* 5. Center Hero Typography */}
      <div className="relative z-20 max-w-2xl my-auto py-8">
        <h1
          data-crosshair-target
          className="pointer-events-auto inline-block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.18] mb-6 drop-shadow-sm cursor-pointer"
        >
          هر مسئله،
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent via-accent-soft to-white">
            زاویه دیگری هم دارد.
          </span>
        </h1>

        <p
          data-crosshair-target
          className="pointer-events-auto text-base sm:text-xl text-muted-light leading-relaxed max-w-lg mb-10 font-normal cursor-pointer"
        >
          جایی برای فکرکردن به تصمیم‌ها، آدم‌ها و ساختن کسب‌وکار.
        </p>

        {/* CTA & Interaction Guide */}
        <div className="flex flex-wrap items-center gap-5 pointer-events-auto">
          {/* Main CTA Button with Star Border */}
          <div data-crosshair-target className="inline-block">
            <StarBorder onClick={scrollToContent}>
              <span className="text-sm font-semibold tracking-wide">کشف نوشته‌ها</span>
              <ArrowDown size={15} className="text-accent animate-bounce" />
            </StarBorder>
          </div>

          {/* Wave Interaction Guide */}
          <div
            data-crosshair-target
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-muted-light font-mono cursor-pointer transition-colors hover:border-accent/40"
          >
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span>حرکت ماوس و کلیک برای امواج</span>
            <span className="text-[10px] text-muted hidden sm:inline">/ INTERACTIVE WAVES</span>
          </div>
        </div>
      </div>

      {/* 6. Bottom Status Indicator */}
      <div className="relative z-20 flex items-center justify-between text-xs text-muted font-mono pt-6 border-t border-white/5">
        <div
          data-crosshair-target
          className="pointer-events-auto flex items-center gap-3 px-2 py-1 rounded-lg cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>MANAN JOURNAL</span>
        </div>
        <div
          data-crosshair-target
          className="pointer-events-auto flex items-center gap-4 px-2 py-1 rounded-lg cursor-pointer"
        >
          <span className="hidden sm:inline">PERSPECTIVES ON BUSINESS & LEADERSHIP</span>
          <span className="text-accent">SCROLL TO EXPLORE</span>
        </div>
      </div>

      {/* 7. Gradual Blur Transition to Section 02 */}
      <GradualBlur position="bottom" height="h-28" />
    </section>
  );
};
