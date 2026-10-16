"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchModal } from "@/components/modals/SearchModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { ArticleReaderModal } from "@/components/modals/ArticleReaderModal";
import { ARTICLES, Article } from "@/lib/content";
import { Clock, Calendar, ArrowLeft, Search, Filter } from "lucide-react";

function WritingArchiveContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { label: "همه موضوعات", value: "all" },
    { label: "تصمیم‌ها", value: "decisions" },
    { label: "آدم‌ها", value: "people" },
    { label: "سیستم‌ها", value: "systems" },
  ];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.categorySlug === selectedCategory;
    const matchesQuery =
      article.title.includes(searchQuery) ||
      article.excerpt.includes(searchQuery) ||
      article.category.includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-32" dir="rtl">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-xs font-mono text-accent-vibrant uppercase tracking-widest block mb-2">
          WRITING ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-navy tracking-tight leading-tight mb-4">
          آرشیو مقالات و نوشته‌ها
        </h1>
        <p className="text-base text-muted-dark leading-relaxed">
          کاوشی عمیق در زمینه تصمیم‌گیری، پویایی تیم‌ها، ساختارهای سازمانی و کارآفرینی.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-paper-border">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? "bg-navy text-white shadow-sm"
                  : "bg-paper-card text-muted hover:text-navy hover:bg-paper-border/60 border border-paper-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجو در عنوان‌ها..."
            className="w-full bg-paper-card border border-paper-border rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-accent-vibrant text-navy"
          />
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.slug}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-paper-border hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-paper text-navy text-xs font-semibold self-start border border-paper-border/80">
                  {article.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted font-mono">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readingMinutes} دقیقه
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.publishedAt}
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-navy group-hover:text-accent-vibrant transition-colors mb-3 leading-snug">
                {article.title}
              </h2>

              <p className="text-sm text-muted-dark leading-relaxed mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-paper-border/60 text-xs text-muted">
                <div className="flex items-center gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-muted/70">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 font-semibold text-navy group-hover:text-accent-vibrant transition-colors">
                  <span>مطالعه متن</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-paper-border p-8">
            <p className="text-navy font-semibold mb-2">مقاله‌ای یافت نشد.</p>
            <p className="text-xs text-muted">
              لطفاً فیلتر دسته‌بندی را تغییر داده یا عبارت جست‌وجو را بازبینی فرمایید.
            </p>
          </div>
        )}
      </div>

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default function WritingArchivePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-paper text-navy font-sans">
      <SiteHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
      <Suspense fallback={<div className="pt-32 text-center text-muted">در حال بارگذاری...</div>}>
        <WritingArchiveContent />
      </Suspense>
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
