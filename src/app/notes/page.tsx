"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchModal } from "@/components/modals/SearchModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { NOTES } from "@/lib/content";
import { Calendar, Tag, ArrowRight, FileText } from "lucide-react";

export default function NotesPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-ink text-white font-sans" dir="rtl">
      <SiteHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors mb-6"
          >
            <ArrowRight size={14} />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
          <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
            FIELD NOTES ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            یادداشت‌های پراکنده
          </h1>
          <p className="text-base text-muted-light leading-relaxed">
            مشاهدات میدانی، پرسش‌های روزمره و جرقه‌های فکری حاصل از کار با تیم‌ها و سیستم‌ها.
          </p>
        </div>

        <div className="space-y-6">
          {NOTES.map((note) => (
            <div
              key={note.id}
              className="p-8 rounded-3xl bg-navy/60 border border-white/10 hover:border-accent/40 transition-all shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium">
                  {note.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-light font-mono">
                  <Calendar size={13} />
                  {note.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {note.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-light leading-relaxed">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={() => {}}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
