"use client";

import React from "react";
import Link from "next/link";
import { Plus, BookOpen, ExternalLink } from "lucide-react";
import { BOOKS } from "@/lib/content";
import { Reveal } from "@/components/ui/AnimatedContent";

export const ReadingDesk: React.FC = () => {
  return (
    <section id="reading" className="relative bg-paper py-20 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="mb-14">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
              <span className="font-bold text-navy">07</span>
              <span>/</span>
              <span className="tracking-widest uppercase">READING DESK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              روی میز مطالعه
            </h2>
            <p className="text-sm text-muted mt-2 max-w-lg">
              کتاب‌ها، مقاله‌ها و ایده‌هایی که ارزش دوباره خواندن دارند.
            </p>
          </div>
        </Reveal>

        {/* Books Row Matching Wireframe */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {BOOKS.map((book, index) => (
            <Reveal key={book.id} delay={index * 100}>
              <div className="h-full bg-white rounded-3xl p-5 border border-paper-border hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
                <div>
                  {/* Book Cover Visual with 3D Spine Depth */}
                  <div className={`aspect-[2/3] rounded-2xl bg-gradient-to-br ${book.coverBg} p-5 text-white flex flex-col justify-between shadow-md group-hover:shadow-xl transition-shadow relative overflow-hidden mb-4`}>
                    {/* Spine highlight */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/10 pointer-events-none" />

                    <div>
                      <span className="text-[10px] font-mono tracking-wider opacity-60 uppercase block mb-1">
                        ESSENTIAL
                      </span>
                      <h4 className="font-mono text-sm sm:text-base font-bold leading-tight ltr text-left">
                        {book.titleEn}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-sans text-white/90">
                        {book.titleFa}
                      </div>
                      <div className="text-[11px] font-mono opacity-70 ltr text-left mt-1">
                        {book.author}
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <h4 className="text-sm font-bold text-navy group-hover:text-accent-vibrant transition-colors">
                    {book.titleFa}
                  </h4>
                  <p className="text-xs text-muted mt-1 line-clamp-2">
                    {book.notesSummary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-paper-border/60 flex items-center justify-between text-[11px] text-muted">
                  <span>{book.category}</span>
                  <BookOpen size={13} className="text-navy group-hover:text-accent-vibrant transition-colors" />
                </div>
              </div>
            </Reveal>
          ))}

          {/* "+ More Resources" Card */}
          <Reveal delay={300}>
            <Link
              href="/#reading"
              className="h-full min-h-[300px] rounded-3xl border-2 border-dashed border-paper-border hover:border-accent-vibrant bg-white/50 hover:bg-white p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-paper group-hover:bg-accent/15 border border-paper-border text-navy group-hover:text-accent-vibrant flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                <Plus size={24} />
              </div>
              <h4 className="text-base font-bold text-navy group-hover:text-accent-vibrant transition-colors">
                منابع بیشتر
              </h4>
              <p className="text-xs text-muted mt-1">
                یادداشت‌ها و مقالات تحلیلی
              </p>
              <span className="mt-4 text-[11px] font-mono px-3 py-1 rounded-full bg-paper border border-paper-border text-muted">
                ۲۴ مورد
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
