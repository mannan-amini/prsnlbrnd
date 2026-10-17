"use client";

import React, { useState } from "react";
import { Note } from "@/lib/content";
import { MarkdownPreview } from "./MarkdownPreview";
import { Save, ArrowRight, Copy, Check } from "lucide-react";

interface NoteEditorProps {
  initialNote?: Note | null;
  onSave: (noteData: Partial<Note>) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function NoteEditor({
  initialNote,
  onSave,
  onCancel,
  isSaving,
}: NoteEditorProps) {
  const isEditing = Boolean(initialNote);

  const [title, setTitle] = useState(initialNote?.title || "");
  const [id, setId] = useState(initialNote?.id || `note-${Date.now().toString().slice(-4)}`);
  const [category, setCategory] = useState(initialNote?.category || "مشاهده · تأمل");
  const [date, setDate] = useState(
    initialNote?.date || new Date().toLocaleDateString("fa-IR")
  );
  const [summary, setSummary] = useState(initialNote?.summary || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [copied, setCopied] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("لطفاً عنوان یادداشت را وارد فرمایید.");
      return;
    }

    await onSave({
      id,
      title,
      category,
      date,
      summary: summary || content.slice(0, 120),
      content,
    });
  };

  const handleCopyMarkdown = () => {
    const md = `---
id: "${id}"
title: "${title.replace(/"/g, '\\"')}"
category: "${category}"
date: "${date}"
summary: "${summary.replace(/"/g, '\\"')}"
---

${content.trim()}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-paper-border">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-paper-border hover:bg-paper-border/50 text-muted hover:text-navy transition-all"
            title="بازگشت"
          >
            <ArrowRight size={18} />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy">
              {isEditing ? `ویرایش یادداشت: ${title || "بدون عنوان"}` : "یادداشت میدانی جدید (Field Note)"}
            </h2>
            <span className="text-xs text-muted font-mono">
              content/notes/{id}.md
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-paper-border bg-white text-muted-dark hover:text-navy transition-all flex items-center gap-1.5"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "کپی شد" : "کپی برای ابسیدین"}</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-navy text-white hover:bg-navy-light transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isSaving ? "در حال ذخیره..." : "ذخیره یادداشت"}</span>
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-border shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold text-muted-dark mb-2">
            عنوان یادداشت <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً: چه زمانی استخدام‌نکردن، تصمیم مدیریتی بهتری است؟"
            className="w-full bg-paper rounded-xl px-4 py-3 text-base text-navy font-bold border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              شناسه فایل (ID)
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="note-4"
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              دسته‌بندی و نوع
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="منابع انسانی · پرسش"
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-dark mb-2">
              تاریخ ثبت
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="۱۴۰۳/۰۸/۱۲"
              className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-dark mb-2">
            خلاصه کوتاه (نمایش در جدول یادداشت‌ها)
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="یک یا دو جمله چکیده یادداشت..."
            className="w-full bg-paper rounded-xl px-4 py-2.5 text-xs sm:text-sm text-navy border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-dark mb-2">
            متن کامل یادداشت
          </label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="متن کامل یا گزاره‌های یادداشت..."
            className="w-full bg-paper rounded-xl p-4 text-sm text-navy leading-prose border border-paper-border focus:outline-none focus:border-accent-vibrant focus:bg-white transition-all resize-none"
          />
        </div>
      </div>
    </form>
  );
}
