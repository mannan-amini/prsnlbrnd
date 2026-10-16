"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, FileText, Calendar } from "lucide-react";
import { NOTES, Note } from "@/lib/content";
import { Reveal } from "@/components/ui/AnimatedContent";

export const FieldNotes: React.FC = () => {
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const toggleNote = (id: string) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  return (
    <section id="notes" className="relative bg-ink text-white py-24 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
                <span className="font-bold">05</span>
                <span>/</span>
                <span className="tracking-widest uppercase">FIELD NOTES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                یادداشت‌های پراکنده
              </h2>
              <p className="text-sm text-muted-light mt-2">
                مشاهدات، پرسش‌ها و ایده‌های کوتاه.
              </p>
            </div>

            <Link
              href="/notes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors group self-start sm:self-auto"
            >
              <span>همه یادداشت‌ها</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Editorial Table / Notes List */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {NOTES.map((note, index) => {
            const isExpanded = expandedNoteId === note.id;
            return (
              <Reveal key={note.id} delay={index * 100}>
                <div className="py-6 sm:py-7 group transition-colors">
                  <div
                    onClick={() => toggleNote(note.id)}
                    className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-accent shrink-0 mt-0.5">
                        <FileText size={15} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
                          {note.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-light mt-1.5 leading-relaxed">
                          {note.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pr-11 md:pr-0">
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-muted-light">
                          {note.category}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] text-muted-light">
                          <Calendar size={12} />
                          {note.date}
                        </span>
                      </div>
                      <div className="p-1 rounded-full text-muted group-hover:text-white transition-colors">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Note Content */}
                  {isExpanded && (
                    <div className="mt-5 pr-11 pl-4 pt-4 border-t border-white/5 text-sm sm:text-base text-muted-light leading-relaxed animate-in fade-in duration-200">
                      <div className="p-4 rounded-2xl bg-navy/60 border border-white/5">
                        {note.content}
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
