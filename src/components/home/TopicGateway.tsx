"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Users, GitBranch } from "lucide-react";
import { TOPICS } from "@/lib/content";
import { Reveal } from "@/components/ui/AnimatedContent";

interface TopicGatewayProps {
  onSelectCategory?: (cat: string) => void;
}

export const TopicGateway: React.FC<TopicGatewayProps> = ({ onSelectCategory }) => {
  const getTopicIcon = (slug: string) => {
    switch (slug) {
      case "decisions":
        return <Compass className="w-8 h-8 text-accent-vibrant stroke-[1.5]" />;
      case "people":
        return <Users className="w-8 h-8 text-accent-vibrant stroke-[1.5]" />;
      case "systems":
        return <GitBranch className="w-8 h-8 text-accent-vibrant stroke-[1.5]" />;
      default:
        return null;
    }
  };

  return (
    <section id="topics" className="relative bg-paper py-24 px-6 sm:px-12 md:px-20 z-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted mb-3">
                <span className="font-bold text-navy">02</span>
                <span>/</span>
                <span className="tracking-widest uppercase">AN OPEN JOURNAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy tracking-tight leading-snug">
                چند سؤال، چند تجربه،
                <br />
                چند نگاه متفاوت.
              </h2>
              <p className="text-sm sm:text-base text-muted-dark mt-4 max-w-xl leading-relaxed">
                درباره مدیریت و کارآفرینی؛ از دل مطالعه، مشاهده و تجربه.
              </p>
            </div>

            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-accent-vibrant transition-colors group self-start sm:self-auto"
            >
              <span>مسیر نوشته‌ها</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOPICS.map((topic, index) => (
            <Reveal key={topic.id} delay={index * 120}>
              <Link
                href={`/writing?category=${topic.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(topic.slug)}
                className="group relative block bg-white rounded-3xl p-8 border border-paper-border hover:border-accent/50 shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Background Subtle Gradient Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

                <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
                  <div>
                    {/* Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-2xl font-bold text-navy/30 group-hover:text-accent-vibrant transition-colors">
                        {topic.number}
                      </span>
                      <div className="p-3 rounded-2xl bg-paper border border-paper-border/80 group-hover:bg-accent/10 transition-colors">
                        {getTopicIcon(topic.slug)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-accent-vibrant transition-colors">
                      {topic.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Bottom Action Icon */}
                  <div className="pt-6 border-t border-paper-border/60 flex items-center justify-between text-xs text-muted">
                    <span className="font-mono text-[11px] text-muted/70">
                      {topic.count} نوشته
                    </span>
                    <div className="w-8 h-8 rounded-full bg-paper group-hover:bg-accent-vibrant group-hover:text-white flex items-center justify-center text-navy transition-all">
                      <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
