"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ArrowLeft, BookOpen, FileText, HelpCircle } from "lucide-react";
import { ARTICLES, NOTES, QUESTIONS, Article, Note } from "@/lib/content";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState("");

  // Keyboard shortcut Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = ARTICLES.filter(
    (a) =>
      a.title.includes(query) ||
      a.excerpt.includes(query) ||
      a.category.includes(query)
  );

  const filteredNotes = NOTES.filter(
    (n) =>
      n.title.includes(query) ||
      n.summary.includes(query) ||
      n.category.includes(query)
  );

  const filteredQuestions = QUESTIONS.filter(
    (q) =>
      q.question.includes(query) ||
      q.preview.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink/70 backdrop-blur-md transition-all">
      <div
        className="w-full max-w-2xl bg-paper-card rounded-2xl shadow-2xl border border-paper-border overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-paper-border bg-paper/50">
          <Search size={20} className="text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجو در نوشته‌ها، یادداشت‌ها و پرسش‌ها..."
            className="flex-1 bg-transparent text-navy text-base focus:outline-none placeholder:text-muted/60"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
            title="بستن (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Articles Section */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider mb-2.5 px-2">
                <BookOpen size={14} className="text-accent-vibrant" />
                <span>نوشته‌ها و مقالات ({filteredArticles.length})</span>
              </div>
              <div className="space-y-1">
                {filteredArticles.map((article) => (
                  <button
                    key={article.slug}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="w-full text-right p-3 rounded-xl hover:bg-paper-subtle transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-navy group-hover:text-accent-vibrant transition-colors">
                        {article.title}
                      </div>
                      <div className="text-xs text-muted mt-0.5 line-clamp-1">
                        {article.excerpt}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted/80 mr-4 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-paper-border/60 text-[11px]">
                        {article.category}
                      </span>
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {filteredNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider mb-2.5 px-2">
                <FileText size={14} className="text-accent-vibrant" />
                <span>یادداشت‌های پراکنده ({filteredNotes.length})</span>
              </div>
              <div className="space-y-1">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl hover:bg-paper-subtle transition-all text-right"
                  >
                    <div className="text-sm font-semibold text-navy">
                      {note.title}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      {note.summary}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted/70 mt-2">
                      <span>{note.category}</span>
                      <span>·</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Open Questions */}
          {filteredQuestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider mb-2.5 px-2">
                <HelpCircle size={14} className="text-accent-vibrant" />
                <span>پرسش‌های باز ({filteredQuestions.length})</span>
              </div>
              <div className="space-y-1">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl hover:bg-paper-subtle transition-all text-right"
                  >
                    <div className="text-sm font-semibold text-navy">
                      {q.question}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      {q.preview}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length === 0 &&
            filteredNotes.length === 0 &&
            filteredQuestions.length === 0 && (
              <div className="py-12 text-center text-muted">
                <p className="text-sm">موردی برای عبارت «{query}» یافت نشد.</p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-paper border-t border-paper-border flex items-center justify-between text-[11px] text-muted">
          <span>برای جست‌وجوی سریع <kbd className="px-1.5 py-0.5 rounded bg-paper-border font-mono">Esc</kbd> برای بستن</span>
          <span>MANAN. SEARCH</span>
        </div>
      </div>
    </div>
  );
};
