"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchModal } from "@/components/modals/SearchModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { ABOUT } from "@/lib/content";
import { ArrowRight, User, Mail, Send, Linkedin } from "lucide-react";

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-paper text-navy font-sans" dir="rtl">
      <SiteHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <div className="max-w-4xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-accent-vibrant transition-colors mb-8"
        >
          <ArrowRight size={14} />
          <span>بازگشت به صفحه اصلی</span>
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-paper-border shadow-md mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-navy text-accent flex flex-col items-center justify-center shrink-0 border border-slate-200 shadow-md">
              <User size={56} className="stroke-[1.2]" />
              <span className="font-mono text-[10px] text-muted-light mt-2 tracking-wider">
                MANAN
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs font-mono text-accent-vibrant uppercase tracking-widest block mb-1">
                THE PERSON BEHIND THE WORDS
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-2">
                سلام، من منان هستم.
              </h1>
              <p className="text-base sm:text-lg font-semibold text-muted-dark mb-4">
                {ABOUT.tagline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted">
                <span className="px-3 py-1 rounded-full bg-paper border border-paper-border">
                  هم‌بنیان‌گذار پرینترلند
                </span>
                <span className="px-3 py-1 rounded-full bg-paper border border-paper-border">
                  کارشناسی ارشد کارآفرینی، دانشگاه تهران
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-paper-border shadow-md space-y-6 text-base sm:text-lg text-navy/90 leading-prose">
          <h2 className="text-2xl font-bold text-navy mb-4">داستان و مسیر من</h2>
          {ABOUT.fullBio.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}

          <div className="pt-8 border-t border-paper-border flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 rounded-2xl bg-navy hover:bg-navy-dark text-white font-semibold text-sm transition-all shadow-md"
            >
              ارسال پیام و گفتگو
            </button>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-paper hover:bg-paper-border text-navy font-medium text-sm transition-colors border border-paper-border inline-flex items-center gap-2"
            >
              <Linkedin size={16} />
              <span>پروفایل لینکدین</span>
            </a>
          </div>
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
