"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Article, getSelectedArticles } from "@/lib/content";
import { Reveal } from "@/components/ui/AnimatedContent";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface SelectedWritingsProps {
  onReadArticle: (article: Article) => void;
}

export const SelectedWritings: React.FC<SelectedWritingsProps> = ({ onReadArticle }) => {
  const articles = getSelectedArticles();
  const primaryArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <section id="writing" className="relative bg-paper py-20 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
                <span className="font-bold text-navy">04</span>
                <span>/</span>
                <span className="tracking-widest uppercase">SELECTED WRITINGS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                از میان نوشته‌ها
              </h2>
              <p className="text-sm text-muted mt-2">
                چند نوشته منتخب از موضوعات مختلف.
              </p>
            </div>

            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-accent-vibrant transition-colors group self-start sm:self-auto"
            >
              <span>همه نوشته‌ها</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Asymmetric Grid matching wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Primary Big Card (Span 7) with 3D Tilt */}
          {primaryArticle && (
            <div className="lg:col-span-7">
              <Reveal>
                <CardContainer containerClassName="w-full h-full" className="w-full h-full">
                  <CardBody className="h-full">
                    <div
                      onClick={() => onReadArticle(primaryArticle)}
                      className="cursor-pointer h-full bg-white rounded-3xl p-8 border border-paper-border hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                    >
                      {/* Graphic Header / Abstract Wave Illustration */}
                      <CardItem translateZ={25} className="w-full">
                        <div className="w-full h-48 rounded-2xl bg-gradient-to-tr from-blue-900/10 via-indigo-500/10 to-slate-200/50 p-4 mb-6 relative overflow-hidden flex items-center justify-center">
                          <svg viewBox="0 0 400 180" className="w-full h-full text-accent-vibrant/40 stroke-current fill-none">
                            <path d="M 0 90 Q 100 20 200 90 T 400 90" strokeWidth="2.5" />
                            <path d="M 0 110 Q 100 40 200 110 T 400 110" strokeWidth="1.8" strokeDasharray="6 4" />
                            <path d="M 0 130 Q 100 60 200 130 T 400 130" strokeWidth="1.2" opacity="0.6" />
                          </svg>
                          <span className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-sm text-[11px] font-medium text-navy">
                            {primaryArticle.category}
                          </span>
                        </div>
                      </CardItem>

                      <div>
                        <CardItem translateZ={30} as="h3" className="text-xl sm:text-2xl font-bold text-navy group-hover:text-accent-vibrant transition-colors mb-3 leading-snug">
                          {primaryArticle.title}
                        </CardItem>

                        <CardItem translateZ={15} as="p" className="text-xs sm:text-sm text-muted-dark leading-relaxed mb-6 line-clamp-2">
                          {primaryArticle.excerpt}
                        </CardItem>
                      </div>

                      <CardItem translateZ={20} className="pt-4 border-t border-paper-border/60 flex items-center justify-between text-xs text-muted">
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock size={12} />
                          {primaryArticle.readingMinutes} دقیقه مطالعه
                        </span>
                        <div className="flex items-center gap-1 font-semibold text-navy group-hover:text-accent-vibrant transition-colors">
                          <span>خواندن مقاله</span>
                          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </Reveal>
            </div>
          )}

          {/* Secondary 2 Stacked Cards (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {secondaryArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 150} className="flex-1">
                <div
                  onClick={() => onReadArticle(article)}
                  className="cursor-pointer h-full bg-white rounded-3xl p-6 sm:p-7 border border-paper-border hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-4">
                    {/* Small Abstract Visual Box */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-slate-100 to-blue-50 border border-slate-200/60 p-2 shrink-0 flex items-center justify-center">
                      {index === 0 ? (
                        <svg viewBox="0 0 100 100" className="w-12 h-12 text-navy/30 stroke-current fill-none">
                          <rect x="20" y="20" width="60" height="60" rx="8" strokeWidth="2" />
                          <line x1="20" y1="50" x2="80" y2="50" strokeWidth="1.5" />
                          <line x1="50" y1="20" x2="50" y2="80" strokeWidth="1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 100 100" className="w-12 h-12 text-navy/30 stroke-current fill-none">
                          <circle cx="50" cy="50" r="30" strokeWidth="2" />
                          <ellipse cx="50" cy="50" rx="36" ry="16" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <span className="text-[11px] font-medium text-accent-vibrant mb-1 inline-block">
                        {article.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-navy group-hover:text-accent-vibrant transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-paper-border/60 flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock size={12} />
                      {article.readingMinutes} دقیقه مطالعه
                    </span>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-navy group-hover:text-accent-vibrant" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
