"use client";

import React from "react";
import Link from "next/link";
import { Plus, User, ArrowLeft } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { Reveal } from "@/components/ui/AnimatedContent";

interface AboutPreviewProps {
  onOpenContact: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onOpenContact }) => {
  return (
    <section id="about" className="relative bg-paper py-24 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-paper-border shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Right/Top Column: Editorial Portrait Frame */}
            <div className="md:col-span-5 flex justify-center">
              <Reveal>
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl bg-gradient-to-tr from-slate-800 via-navy to-slate-900 overflow-hidden shadow-xl border border-slate-200">
                  {/* Stylized Artistic Silhouette / Monochrome Aesthetic */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-accent">
                      <span>MANAN</span>
                      <span>EST. 2026</span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto">
                      <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-accent backdrop-blur-sm mb-4">
                        <User size={44} className="stroke-[1.2]" />
                      </div>
                      <span className="text-xs font-mono tracking-wider text-muted-light">
                        PORTRAIT PLACEHOLDER
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-muted-light/70 text-center">
                      ENTREPRENEUR & RESEARCHER
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Left Column: Biography & Words */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <Reveal delay={150}>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted mb-4">
                    <span className="font-bold text-navy">09</span>
                    <span>/</span>
                    <span className="tracking-widest uppercase">THE PERSON BEHIND THE WORDS</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-2">
                    {ABOUT.name}
                  </h2>

                  <h3 className="text-lg sm:text-xl font-semibold text-accent-vibrant mb-6">
                    {ABOUT.tagline}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-dark leading-relaxed mb-8">
                    {ABOUT.intro}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 mb-8 border-t border-b border-paper-border/80 text-xs">
                    <div>
                      <span className="text-muted block mb-0.5">هم‌بنیان‌گذار</span>
                      <span className="font-bold text-navy">پرینترلند (PrinterLand)</span>
                    </div>
                    <div>
                      <span className="text-muted block mb-0.5">دانشجوی کارشناسی ارشد</span>
                      <span className="font-bold text-navy">مدیریت کارآفرینی، دانشگاه تهران</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy hover:bg-navy-dark text-white text-xs sm:text-sm font-semibold transition-all shadow-md group"
                  >
                    <span>بیشتر درباره من</span>
                    <Plus size={15} className="group-hover:rotate-90 transition-transform" />
                  </Link>

                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-paper hover:bg-paper-border text-navy text-xs sm:text-sm font-medium transition-colors border border-paper-border"
                  >
                    <span>ارتباط مستقیم</span>
                    <ArrowLeft size={14} />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
