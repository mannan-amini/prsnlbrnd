"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

interface SiteFooterProps {
  onOpenContact: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink text-white border-t border-accent/10 py-16 px-6 sm:px-12 z-20" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-12 border-b border-white/10">
          {/* Logo & Philosophy */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block font-mono text-2xl font-bold tracking-tight text-white mb-3">
              MANAN<span className="text-accent">.</span>
            </Link>
            <p className="text-xs text-muted-light leading-relaxed">
              تأملاتی پیرامون تصمیم‌گیری، مدیریت، رهبری آدم‌ها و ساختن سیستم‌های پایدار کسب‌وکار.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
            <Link href="/#writing" className="text-muted-light hover:text-white transition-colors">
              نوشته‌ها
            </Link>
            <Link href="/#notes" className="text-muted-light hover:text-white transition-colors">
              یادداشت‌ها
            </Link>
            <Link href="/#reading" className="text-muted-light hover:text-white transition-colors">
              منابع مطالعه
            </Link>
            <Link href="/#about" className="text-muted-light hover:text-white transition-colors">
              درباره من
            </Link>
            <button
              onClick={onOpenContact}
              className="text-muted-light hover:text-accent transition-colors"
            >
              ارتباط مستقیم
            </button>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-navy/80 border border-white/5 text-muted-light hover:text-accent hover:border-accent/40 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-navy/80 border border-white/5 text-muted-light hover:text-accent hover:border-accent/40 transition-all"
              aria-label="X (Twitter)"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-navy/80 border border-white/5 text-muted-light hover:text-accent hover:border-accent/40 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent hover:bg-accent hover:text-ink transition-all"
              title="بازگشت به ابتدای صفحه"
              aria-label="بازگشت به بالا"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-light">
          <div>
            © 2026 MANAN — تمامی حقوق محفوظ است.
          </div>
          <div className="font-mono text-[11px] text-muted">
            DESIGNED & CRAFTED WITH CARE
          </div>
        </div>
      </div>
    </footer>
  );
};
