"use client";

import React from "react";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { Article, getFeaturedArticle } from "@/lib/content";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ScrollExpand } from "@/components/ui/ScrollExpand";
import { Reveal } from "@/components/ui/AnimatedContent";

interface FeaturedArticleProps {
  onReadArticle: (article: Article) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ onReadArticle }) => {
  const article = getFeaturedArticle();

  return (
    <section id="featured" className="relative bg-paper py-20 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Section Badge */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono text-muted mb-8">
            <span className="font-bold text-navy">03</span>
            <span>/</span>
            <span className="tracking-widest uppercase">EDITOR&apos;S PICK</span>
          </div>
        </Reveal>

        {/* ScrollExpand media frame wrapping 3D card */}
        <ScrollExpand>
          <CardContainer containerClassName="w-full" className="w-full">
            <CardBody className="relative w-full rounded-3xl bg-white border border-paper-border p-8 sm:p-14 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Background Architectural Aesthetic */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-white to-blue-50/50 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left/Main Column: Typography & Content */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Metadata Badges */}
                    <CardItem
                      translateZ={15}
                      className="flex flex-wrap items-center gap-2.5 mb-6 text-xs"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent-vibrant font-medium">
                        <Sparkles size={12} />
                        مقاله منتخب
                      </span>
                      <span className="px-3 py-1 rounded-full bg-paper-border/60 text-navy/80 font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted text-[11px] font-mono mr-2">
                        <Clock size={12} />
                        {article.readingMinutes} دقیقه مطالعه
                      </span>
                    </CardItem>

                    {/* Article Headline */}
                    <CardItem translateZ={30} as="h3" className="text-2xl sm:text-4xl font-bold text-navy tracking-tight leading-snug mb-5">
                      {article.title}
                    </CardItem>

                    {/* Excerpt */}
                    <CardItem translateZ={20} as="p" className="text-sm sm:text-base text-muted-dark leading-relaxed mb-8 max-w-xl">
                      {article.excerpt}
                    </CardItem>
                  </div>

                  {/* CTA Button */}
                  <CardItem translateZ={25} className="pt-4">
                    <button
                      onClick={() => onReadArticle(article)}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-navy hover:bg-navy-dark text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg group"
                    >
                      <span>خواندن مقاله</span>
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-accent" />
                    </button>
                  </CardItem>
                </div>

                {/* Right Column: Architectural Artwork Visual */}
                <div className="lg:col-span-5 flex justify-center">
                  <CardItem translateZ={35} className="w-full">
                    <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-100 via-blue-50 to-indigo-50 border border-slate-200/80 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                      {/* Geometric Architectural Arches & Portal Graphic */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-85">
                        <svg viewBox="0 0 400 300" className="w-full h-full text-blue-900/10 stroke-current fill-none">
                          <circle cx="200" cy="150" r="110" strokeWidth="1.5" />
                          <circle cx="200" cy="150" r="75" strokeWidth="1.2" strokeDasharray="4 4" />
                          <path d="M 120 280 L 120 160 A 80 80 0 0 1 280 160 L 280 280" strokeWidth="2" />
                          <path d="M 150 280 L 150 180 A 50 50 0 0 1 250 180 L 250 280" strokeWidth="1.5" />
                          <line x1="200" y1="40" x2="200" y2="280" strokeWidth="1" strokeDasharray="3 3" />
                        </svg>
                      </div>

                      {/* Small Silhouette Figure / Perspective Landmark */}
                      <div className="relative z-10 flex justify-between items-start text-[10px] font-mono text-muted uppercase tracking-widest">
                        <span>PERSPECTIVE // 01</span>
                        <span>QUALITY VS OUTCOME</span>
                      </div>

                      <div className="relative z-10 flex items-center justify-center py-6">
                        <div className="w-3.5 h-10 rounded-full bg-navy/80 shadow-md" />
                      </div>

                      <div className="relative z-10 text-right font-mono text-[10px] text-muted">
                        DECISION PROCESS DESIGN
                      </div>
                    </div>
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </ScrollExpand>
      </div>
    </section>
  );
};
