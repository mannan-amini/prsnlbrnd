"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

const SECTIONS = [
  { id: "hero", number: "01", label: "مقدمه" },
  { id: "topics", number: "02", label: "موضوعات" },
  { id: "featured", number: "03", label: "شاخص" },
  { id: "writing", number: "04", label: "نوشته‌ها" },
  { id: "notes", number: "05", label: "یادداشت‌ها" },
  { id: "questions", number: "06", label: "پرسش‌ها" },
  { id: "reading", number: "07", label: "مطالعه" },
  { id: "thought", number: "08", label: "اندیشه" },
  { id: "about", number: "09", label: "درباره" },
];

export const SectionNavIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3.5 pointer-events-auto"
      aria-label="فهرست بخش‌های صفحه"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="group flex items-center gap-2.5 focus:outline-none"
            title={`${sec.number} — ${sec.label}`}
          >
            <span
              className={clsx(
                "font-mono text-[10px] transition-all duration-200",
                isActive
                  ? "text-accent font-bold opacity-100 scale-110"
                  : "text-muted-light/60 group-hover:text-white group-hover:opacity-100 opacity-60"
              )}
            >
              {sec.number}
            </span>
            <span
              className={clsx(
                "rounded-full transition-all duration-300",
                isActive
                  ? "w-2.5 h-2.5 bg-accent ring-4 ring-accent/20"
                  : "w-1.5 h-1.5 bg-muted/40 group-hover:bg-white group-hover:scale-125"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
