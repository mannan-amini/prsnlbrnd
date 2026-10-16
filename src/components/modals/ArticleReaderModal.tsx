"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Clock, Calendar, Bookmark, Share2, Check } from "lucide-react";
import { Article } from "@/lib/content";

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress =
      target.scrollTop / (target.scrollHeight - target.clientHeight);
    setScrollProgress(Math.min(Math.max(progress * 100, 0), 100));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + `/writing/${article?.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-ink/80 backdrop-blur-md">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-vibrant z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div
        className="relative w-full max-w-3xl h-full sm:h-[90vh] bg-paper-card sm:rounded-3xl shadow-2xl border border-paper-border flex flex-col overflow-hidden animate-in fade-in duration-200"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-paper-border bg-paper/60 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="px-2.5 py-1 rounded-full bg-paper-border/70 text-navy font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {article.readingMinutes} دقیقه مطالعه
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Calendar size={13} />
              {article.publishedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
              title="کپی لینک مقاله"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
              title="بستن (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-14 py-10"
        >
          <div className="max-w-reading mx-auto">
            {/* Editorial Title */}
            <h1 className="text-2xl sm:text-4xl font-bold text-navy leading-snug tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-lg text-muted-dark leading-relaxed font-medium pb-8 mb-8 border-b border-paper-border">
              {article.excerpt}
            </p>

            {/* Body Paragraphs */}
            <div className="space-y-6 text-navy/90 text-base sm:text-lg leading-prose font-normal">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author Byline */}
            <div className="mt-16 pt-8 border-t border-paper-border flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-navy">نوشته شده توسط منان</div>
                <div className="text-xs text-muted mt-0.5">
                  هم‌بنیان‌گذار پرینترلند و دانشجوی کارشناسی ارشد کارآفرینی
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-paper-border/40 text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
