import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, Article } from "@/lib/content";
import { Clock, Calendar, ArrowRight, Share2, Tag } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-paper text-navy font-sans" dir="rtl">
      {/* Top Header Placeholder */}
      <header className="py-6 px-6 sm:px-12 border-b border-paper-border bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy hover:text-accent-vibrant transition-colors"
          >
            <ArrowRight size={16} />
            <span>بازگشت به آرشیو نوشته‌ها</span>
          </Link>
          <Link href="/" className="font-mono text-xl font-bold tracking-tight text-navy">
            MANAN<span className="text-accent-vibrant">.</span>
          </Link>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-reading mx-auto px-6 py-16">
        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-6">
          <span className="px-3 py-1 rounded-full bg-navy text-white font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Clock size={13} />
            {article.readingMinutes} دقیقه مطالعه
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 font-mono">
            <Calendar size={13} />
            {article.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-navy leading-tight tracking-tight mb-8">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-lg sm:text-xl text-muted-dark leading-relaxed font-medium pb-8 mb-10 border-b border-paper-border">
          {article.excerpt}
        </p>

        {/* Content Paragraphs */}
        <div className="space-y-6 text-navy/90 text-base sm:text-lg leading-prose">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-14 pt-8 border-t border-paper-border flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-muted ml-1" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-paper-card border border-paper-border text-xs text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Box */}
        <div className="mt-10 p-8 rounded-3xl bg-white border border-paper-border shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center font-bold text-xl shrink-0">
            م
          </div>
          <div>
            <div className="text-base font-bold text-navy">منان</div>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              هم‌بنیان‌گذار پرینترلند و دانشجوی کارشناسی ارشد مدیریت کارآفرینی در دانشگاه تهران.
              تمرکز بر طراحی سیستم‌های پایدار، روانشناسی تصمیم‌گیری و رهبری تیم‌ها.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-paper-border">
          <h3 className="text-xl font-bold text-navy mb-6">نوشته‌های پیشنهادی دیگر</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/writing/${rel.slug}`}
                className="p-5 rounded-2xl bg-white border border-paper-border hover:border-accent-vibrant transition-all group"
              >
                <span className="text-[11px] text-accent-vibrant font-medium block mb-1">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-navy group-hover:text-accent-vibrant transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 border-t border-paper-border bg-white text-center text-xs text-muted">
        <div>© 2026 MANAN — تمام حقوق محفوظ است.</div>
      </footer>
    </main>
  );
}
