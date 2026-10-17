"use client";

import React, { useState, useEffect } from "react";
import { Article } from "@/lib/content";
import { MarkdownPreview } from "./MarkdownPreview";
import {
  Save,
  Download,
  Copy,
  ArrowRight,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  Minus,
  Check,
  Clock,
  Eye,
  PenSquare,
} from "lucide-react";

interface ArticleEditorProps {
  initialArticle?: Article | null;
  onSave: (articleData: Partial<Article>) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function ArticleEditor({
  initialArticle,
  onSave,
  onCancel,
  isSaving,
}: ArticleEditorProps) {
  const isEditing = Boolean(initialArticle);

  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [category, setCategory] = useState(initialArticle?.category || "تصمیم‌گیری");
  const [categorySlug, setCategorySlug] = useState<'decisions' | 'people' | 'systems'>(
    initialArticle?.categorySlug || "decisions"
  );
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [publishedAt, setPublishedAt] = useState(
    initialArticle?.publishedAt || new Date().toLocaleDateString("fa-IR")
  );
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialArticle?.status || "published"
  );
  const [featured, setFeatured] = useState<boolean>(
    initialArticle?.featured || false
  );
  const [tagsInput, setTagsInput] = useState(
    initialArticle?.tags ? initialArticle.tags.join("، ") : "تصمیم‌گیری، مدیریت"
  );

  // Markdown body
  const initialMarkdown = initialArticle?.markdown || (
    initialArticle?.content ? initialArticle.content.join("\n\n") : ""
  );
  const [markdown, setMarkdown] = useState(initialMarkdown);

  // Auto reading time calculation
  const [readingMinutes, setReadingMinutes] = useState(
    initialArticle?.readingMinutes || 5
  );
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split");

  // Auto calculate reading minutes on markdown change
  useEffect(() => {
    const wordCount = (markdown + " " + excerpt).split(/\s+/).filter(Boolean).length;
    const est = Math.max(1, Math.ceil(wordCount / 180));
    setReadingMinutes(est);
  }, [markdown, excerpt]);

  // Auto-generate slug from English keywords or transliteration if empty
  const handleAutoSlug = () => {
    if (!title) return;
    const clean = title
      .toLowerCase()
      .trim()
      .replace(/[\?\؟\!\,،\:\؛]/g, "")
      .replace(/\s+/g, "-");
    setSlug(clean);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as 'decisions' | 'people' | 'systems';
    setCategorySlug(val);
    if (val === "decisions") setCategory("تصمیم‌گیری");
    else if (val === "people") setCategory("مدیریت تیم");
    else if (val === "systems") setCategory("توسعه کسب‌وکار");
  };

  const insertMarkdownTag = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("md-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);
    const replacement = `${prefix}${selected || "متن"}${suffix}`;

    const newText = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("لطفاً عنوان و شناسه یکتای مقاله (Slug) را مشخص فرمایید.");
      return;
    }

    const tags = tagsInput
      .split(/[,،]/)
      .map((t) => t.trim())
      .filter(Boolean);

    await onSave({
      title,
      slug,
      category,
      categorySlug,
      excerpt,
      publishedAt,
      status,
      featured,
      readingMinutes,
      tags,
      markdown,
      content: markdown.split(/\r?\n\r?\n+/).map((p) => p.trim()).filter(Boolean),
    });
  };

  const getFullMarkdownFileContent = () => {
    const tags = tagsInput.split(/[,،]/).map((t) => t.trim()).filter(Boolean);
    const tagsYaml = tags.length > 0 ? tags.map((t) => `  - "${t}"`).join("\n") : "  - عمومی";
    return `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
categorySlug: "${categorySlug}"
publishedAt: "${publishedAt}"
readingMinutes: ${readingMinutes}
featured: ${featured}
status: "${status}"
tags:
${tagsYaml}
excerpt: "${excerpt.replace(/"/g, '\\"')}"
---

${markdown.trim()}
`;
  };

  const handleCopyMarkdown = () => {
    const fileContent = getFullMarkdownFileContent();
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const fileContent = getFullMarkdownFileContent();
    const blob = new Blob([fileContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "article"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8" dir="rtl">
      {/* Top Bar with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-border">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-paper-border hover:bg-paper-border/50 text-muted hover:text-navy transition-all"
            title="بازگشت به فهرست"
          >
            <ArrowRight size={18} />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy">
              {isEditing ? `ویرایش مقاله: ${title || "بدون عنوان"}` : "نگارش مقاله جدید"}
            </h2>
            <span className="text-xs text-muted font-mono">
              {slug ? `content/articles/${slug}.md` : "فایل در پوشه content/articles/ ذخیره خواهد شد"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-paper-border bg-white text-muted-dark hover:text-navy hover:border-accent/60 transition-all flex items-center gap-1.5"
            title="کپی متن کامل با هدر Frontmatter برای قرار دادن در ابسیدین"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "کپی شد!" : "کپی برای ابسیدین"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-paper-border bg-white text-muted-dark hover:text-navy hover:border-accent/60 transition-all flex items-center gap-1.5"
            title="دانلود فایل .md مستقیم"
          >
            <Download size={14} />
            <span>دانلود .md</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-navy text-white hover:bg-navy-light transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isSaving ? "در حال ذخیره..." : "ذخیره در سیستم"}</span>
          </button>
        </div>
      </div>

      {/* Metadata Fields Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-navy pb-3 border-b border-paper-border/60">
          مشخصات و متادیتای مقاله (YAML Frontmatter)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              عنوان اصلی مقاله <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: آیا تصمیم درست همیشه نتیجه درستی دارد؟"
              className="w-full bg-paper rounded-xl px-4 py-3 text-base text-navy font-bold border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-muted-dark">
                شناسه یکتا در آدرس (Slug) <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAutoSlug}
                className="text-[11px] text-accent-vibrant hover:underline flex items-center gap-1 font-mono"
              >
                <Sparkles size={11} />
                تولید از عنوان
              </button>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="decision-quality-vs-outcome"
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
              dir="ltr"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              دسته‌بندی موضوعی
            </label>
            <select
              value={categorySlug}
              onChange={handleCategoryChange}
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
            >
              <option value="decisions">تصمیم‌ها (تصمیم‌گیری)</option>
              <option value="people">آدم‌ها (مدیریت تیم و رهبری)</option>
              <option value="systems">سیستم‌ها (توسعه کسب‌وکار و مقیاس‌پذیری)</option>
            </select>
          </div>

          {/* Reading Time & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-dark mb-2">
                زمان مطالعه (دقیقه)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={readingMinutes}
                  onChange={(e) => setReadingMinutes(Number(e.target.value))}
                  className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all font-mono"
                />
                <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-dark mb-2">
                تاریخ انتشار
              </label>
              <input
                type="text"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                placeholder="۱۴۰۳/۰۸/۰۱"
                className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all font-mono"
              />
            </div>
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-dark mb-2">
                وضعیت انتشار
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
              >
                <option value="published">منتشر شده (عمومی)</option>
                <option value="draft">پیش‌نویس (مخفی)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-dark mb-2">
                مقاله شاخص صفحه اصلی
              </label>
              <label className="flex items-center gap-3 bg-paper rounded-xl px-4 py-2.5 border border-paper-border cursor-pointer hover:bg-paper-border/40 transition-colors">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-navy focus:ring-accent-vibrant w-4 h-4"
                />
                <span className="text-xs text-navy font-semibold">بخش ۰۳ هوم‌پیج</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              برچسب‌ها (با ویرگول جدا کنید)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="تصمیم‌گیری، مدیریت ریسک، تفکر منطقی"
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
            />
          </div>

          {/* Excerpt */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              چکیده و مقدمه کوتاه (نمایش در کارت‌ها و آرشیو)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="خلاصه‌ای یک یا دو جمله‌ای از مفهوم اصلی مقاله..."
              className="w-full bg-paper rounded-xl p-4 text-xs sm:text-sm text-navy leading-relaxed border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Main Markdown Editor + Preview */}
      <div className="bg-white rounded-3xl border border-paper-border shadow-sm overflow-hidden">
        {/* Editor Toolbar & Tab Switcher */}
        <div className="px-6 py-4 bg-paper/50 border-b border-paper-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertMarkdownTag("## ")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="تیتر سطح ۲ (##)"
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdownTag("### ")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="تیتر سطح ۳ (###)"
            >
              <Heading3 size={16} />
            </button>
            <div className="h-4 w-px bg-paper-border mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdownTag("**", "**")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="متن ضخیم (**)"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdownTag("*", "*")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="متن مورب (*)"
            >
              <Italic size={16} />
            </button>
            <div className="h-4 w-px bg-paper-border mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdownTag("> ")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="نقل‌قول (>)"
            >
              <Quote size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdownTag("- ")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="لیست بالت‌دار (-)"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdownTag("\n---\n")}
              className="p-2 rounded-lg hover:bg-paper-border/60 text-muted-dark hover:text-navy transition-all"
              title="خط جداکننده (---)"
            >
              <Minus size={16} />
            </button>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-1 bg-paper p-1 rounded-xl border border-paper-border text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === "edit"
                  ? "bg-navy text-white shadow-xs"
                  : "text-muted hover:text-navy"
              }`}
            >
              <PenSquare size={13} className="inline ml-1" />
              ویرایشگر
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("split")}
              className={`hidden lg:inline-flex px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === "split"
                  ? "bg-navy text-white shadow-xs"
                  : "text-muted hover:text-navy"
              }`}
            >
              دو ستونه (Split)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-navy text-white shadow-xs"
                  : "text-muted hover:text-navy"
              }`}
            >
              <Eye size={13} className="inline ml-1" />
              پیش‌نمایش زنده
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className={`grid ${activeTab === "split" ? "lg:grid-cols-2" : "grid-cols-1"} min-h-[480px]`}>
          {/* Write Textarea */}
          {(activeTab === "edit" || activeTab === "split") && (
            <div className={`p-6 ${activeTab === "split" ? "border-l border-paper-border" : ""}`}>
              <textarea
                id="md-textarea"
                rows={18}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="متن مقاله را اینجا بنویسید (با پشتیبانی کامل از قواعد نگارش مارک‌داون)..."
                className="w-full h-full min-h-[420px] bg-transparent text-navy font-sans text-base leading-prose focus:outline-none resize-none placeholder:text-muted/50"
                dir="rtl"
              />
            </div>
          )}

          {/* Live Preview */}
          {(activeTab === "preview" || activeTab === "split") && (
            <div className="p-6 bg-paper/25 overflow-y-auto max-h-[600px]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-accent-vibrant mb-3 pb-2 border-b border-paper-border flex items-center justify-between">
                <span>پیش‌نمایش خروجی زنده ادیتوریال</span>
                <span>{readingMinutes} دقیقه خوانش</span>
              </div>
              <MarkdownPreview content={markdown} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
