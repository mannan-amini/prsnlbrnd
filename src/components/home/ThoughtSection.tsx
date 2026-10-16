"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { THOUGHT } from "@/lib/content";
import { PrismCanvas } from "@/components/canvas/PrismCanvas";
import { Reveal } from "@/components/ui/AnimatedContent";

const THOUGHTS = [
  {
    quote: "فهمیدن یک مسئله، گاهی از حل‌کردن عجولانه‌اش مهم‌تر است.",
    context: "پیرامون تفاوت حل علامت مسئله با کشف ریشه بنیادین آن در سازمان.",
  },
  {
    quote: "بهترین تصمیم‌ها اغلب آن‌هایی هستند که شجاعت «نه گفتن» به فرصت‌های خوب را دارند.",
    context: "تمرکز استراتژیک یعنی انتخاب نکردن، حتی وقتی گزینه‌ها وسوسه‌کننده‌اند.",
  },
  {
    quote: "شفافیت در سازمان هزینه دارد، اما هزینه پنهان‌کاری همیشه تصاعدی است.",
    context: "اعتماد سازمانی بر پایه مواجهه صادقانه با واقعیت شکل می‌گیرد.",
  },
];

export const ThoughtSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? THOUGHTS.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === THOUGHTS.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="thought" className="relative bg-ink text-white py-28 px-6 sm:px-12 md:px-20 overflow-hidden z-10" dir="rtl">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,34,56,0.6)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Section Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="font-bold">08</span>
            <span>/</span>
            <span className="tracking-widest uppercase">A THOUGHT</span>
          </div>
        </Reveal>

        {/* 3D Floating Prism / Gem Element */}
        <div className="my-2">
          <PrismCanvas />
        </div>

        {/* Central Bold Quote */}
        <Reveal>
          <div className="relative max-w-3xl my-6">
            <Quote size={40} className="text-accent/20 mx-auto mb-4" />
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight min-h-[120px] flex items-center justify-center">
              «{THOUGHTS[index].quote}»
            </blockquote>
            <p className="text-xs sm:text-sm text-muted-light mt-4 max-w-lg mx-auto font-normal">
              {THOUGHTS[index].context}
            </p>
          </div>
        </Reveal>

        {/* Carousel / Navigation Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={next}
            className="p-3 rounded-full bg-navy/80 hover:bg-navy border border-white/10 text-muted-light hover:text-white transition-all"
            title="جمله بعدی"
            aria-label="بعدی"
          >
            <ChevronRight size={18} />
          </button>

          <span className="font-mono text-xs text-muted">
            0{index + 1} / 0{THOUGHTS.length}
          </span>

          <button
            onClick={prev}
            className="p-3 rounded-full bg-navy/80 hover:bg-navy border border-white/10 text-muted-light hover:text-white transition-all"
            title="جمله قبلی"
            aria-label="قبلی"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
