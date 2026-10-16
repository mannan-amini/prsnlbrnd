"use client";

import React, { useEffect } from "react";
import { X, Mail, Send, Linkedin, Copy, Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md">
      <div
        className="relative w-full max-w-md bg-paper-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-paper-border overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
          title="بستن"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono text-accent-vibrant uppercase tracking-widest">
            GET IN TOUCH
          </span>
          <h2 className="text-2xl font-bold text-navy mt-1">ارتباط با منان</h2>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            برای گفتگو پیرامون مدیریت، تصمیم‌گیری، همکاری یا انتقال نظرات ارزشمندتان.
          </p>
        </div>

        <div className="space-y-3">
          {/* Email Item */}
          <div className="p-4 rounded-2xl bg-paper border border-paper-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent-vibrant">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-xs text-muted">ایمیل</div>
                <div className="text-sm font-semibold font-mono text-navy ltr">
                  contact@manan.ir
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard("contact@manan.ir", "email")}
              className="p-2 rounded-lg text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
              title="کپی ایمیل"
            >
              {copied === "email" ? (
                <Check size={16} className="text-emerald-600" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {/* Telegram / Direct */}
          <div className="p-4 rounded-2xl bg-paper border border-paper-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent-vibrant">
                <Send size={18} />
              </div>
              <div>
                <div className="text-xs text-muted">تلگرام</div>
                <div className="text-sm font-semibold font-mono text-navy ltr">
                  @manan_dev
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard("@manan_dev", "tg")}
              className="p-2 rounded-lg text-muted hover:text-navy hover:bg-paper-border/60 transition-colors"
              title="کپی آیدی"
            >
              {copied === "tg" ? (
                <Check size={16} className="text-emerald-600" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-2xl bg-paper border border-paper-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent-vibrant">
                <Linkedin size={18} />
              </div>
              <div>
                <div className="text-xs text-muted">لینکدین</div>
                <div className="text-sm font-semibold text-navy">شبکه حرفه‌ای</div>
              </div>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-accent-vibrant bg-accent/10 hover:bg-accent/20 transition-colors"
            >
              مشاهده پروفایل
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-paper-border text-center text-[11px] text-muted">
          پاسخگویی معمولاً ظرف ۲۴ الی ۴۸ ساعت کاری صورت می‌پذیرد.
        </div>
      </div>
    </div>
  );
};
