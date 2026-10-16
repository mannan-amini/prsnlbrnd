"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowLeft, HelpCircle } from "lucide-react";
import { QUESTIONS } from "@/lib/content";
import { Waves } from "@/components/ui/Waves";
import { Reveal } from "@/components/ui/AnimatedContent";

export const OpenQuestions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="questions" className="relative bg-paper py-24 px-6 sm:px-12 md:px-20 overflow-hidden z-10" dir="rtl">
      {/* Light interactive background waves */}
      <Waves className="opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted mb-3 px-3 py-1 rounded-full bg-paper-border/60">
              <span className="font-bold text-navy">06</span>
              <span>/</span>
              <span className="tracking-widest uppercase">OPEN QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-snug">
              سؤال‌هایی که هنوز به آن‌ها فکر می‌کنم.
            </h2>
            <p className="text-sm text-muted-dark mt-3 leading-relaxed">
              همه مسائل مدیریتی پاسخ روشن و یکسانی ندارند. بعضی پرسش‌ها ارزش دنبال‌کردن دارند.
            </p>
          </div>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {QUESTIONS.map((q, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={q.id} delay={index * 100}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-accent/40 shadow-lg shadow-accent/5"
                      : "bg-white/70 hover:bg-white border-paper-border"
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 text-right flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${isOpen ? "bg-accent/15 text-accent-vibrant" : "bg-paper text-muted"}`}>
                        <HelpCircle size={16} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-navy leading-snug">
                        {q.question}
                      </h3>
                    </div>
                    <div className="p-1 rounded-full text-muted shrink-0">
                      {isOpen ? (
                        <Minus size={18} className="text-accent-vibrant" />
                      ) : (
                        <Plus size={18} />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-paper-border/60 text-sm sm:text-base text-muted-dark leading-relaxed animate-in fade-in duration-200">
                      <p className="font-medium text-navy/90 mb-2">
                        {q.preview}
                      </p>
                      <p className="text-muted leading-relaxed">
                        {q.elaboration}
                      </p>
                      <div className="mt-4 pt-3 flex justify-end">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-vibrant hover:underline cursor-pointer">
                          <span>ادامه این فکر</span>
                          <ArrowLeft size={13} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
