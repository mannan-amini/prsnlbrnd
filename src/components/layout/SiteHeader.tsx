"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowUpLeft } from "lucide-react";
import clsx from "clsx";

interface SiteHeaderProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenSearch,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "نوشته‌ها", href: "/#writing" },
    { label: "یادداشت‌ها", href: "/#notes" },
    { label: "منابع", href: "/#reading" },
    { label: "درباره من", href: "/#about" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-ink/80 backdrop-blur-xl border-b border-accent/10 py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        )}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Right/Start: Logotype */}
          <Link
            href="/"
            className="flex items-center gap-1 group focus-visible:outline-none"
          >
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
              MANAN<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-light hover:text-white transition-colors relative py-1 focus-visible:outline-none group"
              >
                {link.label}
                <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Left/End: Actions (Search + Contact CTA) */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-muted-light hover:text-white hover:bg-navy/60 border border-white/5 transition-all flex items-center gap-2 focus-visible:outline-none"
              title="جست‌وجو (Ctrl+K)"
            >
              <Search size={16} />
              <span className="hidden sm:inline text-xs font-mono text-muted-light">
                Ctrl+K
              </span>
            </button>

            {/* Contact CTA Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-accent/40 backdrop-blur-md transition-all shadow-sm"
            >
              <span>تماس با من</span>
              <ArrowUpLeft size={13} className="text-accent" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-muted-light hover:text-white hover:bg-navy/60 transition-colors"
              aria-label="منوی سایت"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          dir="rtl"
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-medium text-white/90 hover:text-accent py-3 border-b border-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-2xl bg-accent text-ink font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>تماس با من</span>
              <ArrowUpLeft size={16} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-3 rounded-2xl bg-navy text-muted-light text-sm flex items-center justify-center gap-2 border border-white/10"
            >
              <Search size={16} />
              <span>جست‌وجو در مطالب</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
