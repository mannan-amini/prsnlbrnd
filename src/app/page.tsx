"use client";

import React, { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionNavIndicator } from "@/components/layout/SectionNavIndicator";
import { HeroSection } from "@/components/home/HeroSection";
import { TopicGateway } from "@/components/home/TopicGateway";
import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { SelectedWritings } from "@/components/home/SelectedWritings";
import { FieldNotes } from "@/components/home/FieldNotes";
import { OpenQuestions } from "@/components/home/OpenQuestions";
import { ReadingDesk } from "@/components/home/ReadingDesk";
import { ThoughtSection } from "@/components/home/ThoughtSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SearchModal } from "@/components/modals/SearchModal";
import { ArticleReaderModal } from "@/components/modals/ArticleReaderModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { Article } from "@/lib/content";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <main className="relative min-h-screen bg-paper text-navy font-sans">
      {/* 1. Header Navigation */}
      <SiteHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 2. Side Section Indicator (01 - 09) */}
      <SectionNavIndicator />

      {/* 3. Section 01: Hero / The Introduction */}
      <HeroSection />

      {/* 4. Section 02: An Open Journal / Core Topics */}
      <TopicGateway />

      {/* 5. Section 03: Editor's Pick / Featured Article */}
      <FeaturedArticle onReadArticle={handleReadArticle} />

      {/* 6. Section 04: Selected Writings */}
      <SelectedWritings onReadArticle={handleReadArticle} />

      {/* 7. Section 05: Field Notes / Short Observations */}
      <FieldNotes />

      {/* 8. Section 06: Open Questions / Accordion */}
      <OpenQuestions />

      {/* 9. Section 07: Reading Desk */}
      <ReadingDesk />

      {/* 10. Section 08: A Thought */}
      <ThoughtSection />

      {/* 11. Section 09: About Manan */}
      <AboutPreview onOpenContact={() => setIsContactOpen(true)} />

      {/* 12. Site Footer */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleReadArticle}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
