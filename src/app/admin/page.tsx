"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article, Note } from "@/lib/content";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { NoteEditor } from "@/components/admin/NoteEditor";
import {
  FileText,
  StickyNote,
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  RefreshCw,
  Edit3,
  Trash2,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
  Layers,
  FolderOpen,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "notes" | "guide">("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Editor states
  const [editingArticle, setEditingArticle] = useState<Article | null | undefined>(undefined);
  const [editingNote, setEditingNote] = useState<Note | null | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const notify = (message: string, type: "success" | "error" = "success") => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("خطا در بارگذاری محتوا");
      const data = await res.json();
      setArticles(data.articles || []);
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
      notify("خطا در برقراری ارتباط با سرور محتوا", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await fetchContent();
    setIsSyncing(false);
    notify("فایل‌های سیستم با موفقیت بازخوانی و همگام شدند.");
  };

  const handleSaveArticle = async (articleData: Partial<Article>) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "article", ...articleData }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "خطا در ذخیره مقاله");

      notify(`مقاله «${articleData.title}» با موفقیت ذخیره و در سایت اعمال شد.`);
      setEditingArticle(undefined);
      await fetchContent();
    } catch (err: any) {
      notify(err.message || "خطا در ذخیره سازی", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticle = async (slug: string, title: string) => {
    if (!confirm(`آیا از حذف مقاله «${title}» و فایل Markdown آن اطمینان دارید؟`)) return;

    try {
      const res = await fetch(`/api/content?type=article&id=${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطا در حذف مقاله");

      notify(`مقاله «${title}» با موفقیت حذف شد.`);
      await fetchContent();
    } catch (err: any) {
      notify(err.message || "خطا در حذف", "error");
    }
  };

  const handleSaveNote = async (noteData: Partial<Note>) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "note", ...noteData }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "خطا در ذخیره یادداشت");

      notify(`یادداشت «${noteData.title}» ذخیره شد.`);
      setEditingNote(undefined);
      await fetchContent();
    } catch (err: any) {
      notify(err.message || "خطا در ذخیره یادداشت", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف یادداشت «${title}» اطمینان دارید؟`)) return;

    try {
      const res = await fetch(`/api/content?type=note&id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطا در حذف یادداشت");

      notify(`یادداشت حذف شد.`);
      await fetchContent();
    } catch (err: any) {
      notify(err.message || "خطا در حذف", "error");
    }
  };

  // Filtered articles
  const filteredArticles = articles.filter((a) => {
    const matchesCategory = selectedCategory === "all" || a.categorySlug === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-paper text-navy font-sans selection:bg-accent-soft" dir="rtl">
      {/* Top Studio Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-paper-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-mono text-xl font-bold tracking-tight text-navy">
              MANAN<span className="text-accent-vibrant">.</span>
            </Link>
            <span className="text-muted/40">/</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-navy">استودیو محتوای ادیتوریال</span>
              <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent-vibrant text-[11px] font-mono font-semibold">
                LOCAL MODE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-xl border border-paper-border bg-paper hover:bg-paper-border/60 text-xs font-semibold text-muted-dark hover:text-navy transition-all flex items-center gap-1.5"
              title="همگام‌سازی مجدد داده‌ها با فایل‌های دیسک"
            >
              <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
              <span>{isSyncing ? "در حال همگام‌سازی..." : "همگام‌سازی"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl border border-navy/20 bg-navy text-white hover:bg-navy-light text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>مشاهده سایت</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs sm:text-sm font-bold ${
              notification.type === "success"
                ? "bg-navy text-white border-accent-vibrant/40"
                : "bg-rose-900 text-white border-rose-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <AlertCircle size={16} className="text-rose-300" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* If editing an article */}
        {editingArticle !== undefined ? (
          <ArticleEditor
            initialArticle={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => setEditingArticle(undefined)}
            isSaving={isSaving}
          />
        ) : editingNote !== undefined ? (
          <NoteEditor
            initialNote={editingNote}
            onSave={handleSaveNote}
            onCancel={() => setEditingNote(undefined)}
            isSaving={isSaving}
          />
        ) : (
          /* Studio Dashboard */
          <div className="space-y-8">
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-paper-border pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("articles")}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === "articles"
                      ? "bg-navy text-white shadow-sm"
                      : "bg-white text-muted hover:text-navy border border-paper-border"
                  }`}
                >
                  <FileText size={16} />
                  <span>مقاله‌ها</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[11px] font-mono">
                    {articles.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("notes")}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === "notes"
                      ? "bg-navy text-white shadow-sm"
                      : "bg-white text-muted hover:text-navy border border-paper-border"
                  }`}
                >
                  <StickyNote size={16} />
                  <span>یادداشت‌های میدانی</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[11px] font-mono">
                    {notes.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("guide")}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === "guide"
                      ? "bg-navy text-white shadow-sm"
                      : "bg-white text-muted hover:text-navy border border-paper-border"
                  }`}
                >
                  <BookOpen size={16} />
                  <span>راهنمای ابسیدین و فایل‌ها</span>
                </button>
              </div>

              {/* Action Button */}
              {activeTab === "articles" && (
                <button
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-accent-vibrant text-white hover:bg-accent transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus size={16} />
                  <span>نوشتن مقاله جدید</span>
                </button>
              )}

              {activeTab === "notes" && (
                <button
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-accent-vibrant text-white hover:bg-accent transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus size={16} />
                  <span>افزودن یادداشت</span>
                </button>
              )}
            </div>

            {/* TAB 1: ARTICLES */}
            {activeTab === "articles" && (
              <div className="space-y-6">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-paper-border shadow-2xs">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {[
                      { label: "همه مقالات", value: "all" },
                      { label: "تصمیم‌ها", value: "decisions" },
                      { label: "آدم‌ها", value: "people" },
                      { label: "سیستم‌ها", value: "systems" },
                    ].map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          selectedCategory === cat.value
                            ? "bg-navy text-white"
                            : "bg-paper text-muted hover:text-navy"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative min-w-[260px]">
                    <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جست‌وجو بر اساس عنوان یا اسلاگ..."
                      className="w-full bg-paper border border-paper-border rounded-xl pr-9 pl-4 py-1.5 text-xs text-navy focus:outline-none focus:border-accent-vibrant"
                    />
                  </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-3xl border border-paper-border shadow-sm overflow-hidden">
                  {isLoading ? (
                    <div className="p-12 text-center text-muted text-sm">در حال بارگذاری مقالات...</div>
                  ) : filteredArticles.length > 0 ? (
                    <div className="divide-y divide-paper-border">
                      {filteredArticles.map((article) => (
                        <div
                          key={article.slug}
                          className="p-6 hover:bg-paper/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="px-2.5 py-0.5 rounded-md bg-paper text-navy font-semibold border border-paper-border">
                                {article.category}
                              </span>
                              {article.featured && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold flex items-center gap-1 text-[11px]">
                                  <Star size={11} className="fill-amber-600 text-amber-600" />
                                  برگزیده هوم‌پیج
                                </span>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                  article.status === "published"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {article.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                              </span>
                              <span className="text-muted font-mono flex items-center gap-1 text-[11px]">
                                <Clock size={11} />
                                {article.readingMinutes} دقیقه
                              </span>
                              <span className="text-muted font-mono flex items-center gap-1 text-[11px]">
                                <Calendar size={11} />
                                {article.publishedAt}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-navy group-hover:text-accent-vibrant transition-colors">
                              {article.title}
                            </h3>

                            <p className="text-xs text-muted-dark line-clamp-1">
                              {article.excerpt}
                            </p>

                            <div className="text-[11px] font-mono text-muted/70">
                              فایل: content/articles/{article.slug}.md
                            </div>
                          </div>

                          {/* Row Actions */}
                          <div className="flex items-center gap-2 sm:self-center shrink-0">
                            <Link
                              href={`/writing/${article.slug}`}
                              target="_blank"
                              className="p-2 rounded-xl border border-paper-border bg-white text-muted hover:text-navy hover:border-accent/40 transition-all"
                              title="مشاهده در سایت"
                            >
                              <ExternalLink size={16} />
                            </Link>

                            <button
                              onClick={() => setEditingArticle(article)}
                              className="px-3.5 py-2 rounded-xl bg-navy/5 hover:bg-navy hover:text-white text-navy text-xs font-semibold transition-all flex items-center gap-1.5"
                            >
                              <Edit3 size={14} />
                              <span>ویرایش</span>
                            </button>

                            <button
                              onClick={() => handleDeleteArticle(article.slug, article.title)}
                              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                              title="حذف مقاله"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-16 text-center text-muted">
                      <p className="font-semibold text-navy mb-1">مقاله‌ای یافت نشد.</p>
                      <p className="text-xs">می‌توانید با زدن دکمه «نوشتن مقاله جدید» اولین مقاله را اضافه فرمایید.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: FIELD NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-paper-border shadow-sm overflow-hidden divide-y divide-paper-border">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-6 hover:bg-paper/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-paper text-navy font-semibold text-[11px] border border-paper-border">
                            {note.category}
                          </span>
                          <span className="text-muted font-mono text-[11px]">
                            {note.date}
                          </span>
                          <span className="text-muted/60 font-mono text-[11px]">
                            ID: {note.id}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-navy">
                          {note.title}
                        </h3>
                        <p className="text-xs text-muted-dark line-clamp-2 leading-relaxed">
                          {note.summary || note.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingNote(note)}
                          className="px-3.5 py-2 rounded-xl bg-navy/5 hover:bg-navy hover:text-white text-navy text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <Edit3 size={14} />
                          <span>ویرایش</span>
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id, note.title)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                          title="حذف یادداشت"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: GUIDE */}
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-paper-border shadow-sm space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-paper-border">
                    <div className="w-10 h-10 rounded-2xl bg-accent-soft text-accent-vibrant flex items-center justify-center">
                      <FolderOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-navy">
                        راهنمای کار با فایل‌های متنی Markdown و نرم‌افزار Obsidian
                      </h2>
                      <p className="text-xs text-muted">
                        چگونه بدون نیاز به باز کردن سایت، مستقیماً از ویرایشگرهای متنی دلخواه خود بنویسید
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-navy/90 leading-relaxed">
                    <p>
                      تمام مقالات و یادداشت‌های وب‌سایت «منان» به صورت فایل‌های مستقل در مسیرهای زیر ذخیره شده‌اند:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-paper border border-paper-border font-mono text-xs">
                        <div className="text-accent-vibrant font-bold mb-1">پوشه مقالات اصلی:</div>
                        <div className="text-navy">content/articles/*.md</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-paper border border-paper-border font-mono text-xs">
                        <div className="text-accent-vibrant font-bold mb-1">پوشه یادداشت‌های میدانی:</div>
                        <div className="text-navy">content/notes/*.md</div>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy pt-4">نحوه اتصال به ابسیدین (Obsidian):</h3>
                    <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-muted-dark">
                      <li>نرم‌افزار <strong>Obsidian</strong> را باز کنید.</li>
                      <li>گزینه <strong>Open folder as vault</strong> را انتخاب کنید.</li>
                      <li>پوشه <code>content</code> درون پروژه وب‌سایت خود را انتخاب نمایید.</li>
                      <li>
                        از این لحظه، هر فایلی که در ابسیدین ایجاد، ویرایش یا حذف کنید، به صورت آنی در وب‌سایت لوکال بازتاب داده می‌شود!
                      </li>
                    </ol>

                    <h3 className="text-base font-bold text-navy pt-4">ساختار سربرگ استاندارد (YAML Frontmatter):</h3>
                    <div className="p-5 rounded-2xl bg-navy text-white font-mono text-xs leading-relaxed" dir="ltr">
                      <pre className="overflow-x-auto">{`---
title: "عنوان مقاله شما"
slug: "your-article-slug"
category: "تصمیم‌گیری"
categorySlug: "decisions"
publishedAt: "۱۴۰۳/۰۸/۰۱"
readingMinutes: 5
featured: false
status: "published"
tags:
  - تصمیم‌گیری
  - مدیریت
excerpt: "خلاصه‌ای کوتاه از مقاله..."
---

متن مقاله با فرمت مارک‌داون شروع می‌شود...`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
