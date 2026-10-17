"use client";

import React from "react";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="h-full flex items-center justify-center text-muted/60 text-sm">
        متنی برای پیش‌نمایش وارد نشده است...
      </div>
    );
  }

  // Simple, fast Markdown-to-HTML parser for preview
  const parseMarkdownToElements = (text: string) => {
    const lines = text.split(/\r?\n/);
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = (keyPrefix: string) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`${keyPrefix}-ul`} className="list-disc list-inside space-y-1.5 my-3 text-navy/90 text-sm sm:text-base leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} className="pr-1">{formatInline(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const formatInline = (str: string): React.ReactNode => {
      // Bold **text**
      const parts: React.ReactNode[] = [];
      let remaining = str;
      let key = 0;

      // Replace bold and italic
      const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
      let lastIdx = 0;
      let match;

      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIdx) {
          parts.push(str.substring(lastIdx, match.index));
        }
        const token = match[0];
        if (token.startsWith("**") && token.endsWith("**")) {
          parts.push(<strong key={key++} className="font-bold text-navy">{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("*") && token.endsWith("*")) {
          parts.push(<em key={key++} className="italic text-navy/90">{token.slice(1, -1)}</em>);
        } else if (token.startsWith("`") && token.endsWith("`")) {
          parts.push(<code key={key++} className="px-1.5 py-0.5 rounded bg-paper-border text-navy text-xs font-mono">{token.slice(1, -1)}</code>);
        }
        lastIdx = match.index + token.length;
      }

      if (lastIdx < str.length) {
        parts.push(str.substring(lastIdx));
      }

      return parts.length > 0 ? parts : str;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        flushList(`empty-${i}`);
        continue;
      }

      // H2
      if (line.startsWith("## ")) {
        flushList(`h2-${i}`);
        elements.push(
          <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-bold text-navy mt-6 mb-3 pb-1 border-b border-paper-border">
            {formatInline(line.slice(3))}
          </h2>
        );
        continue;
      }

      // H3
      if (line.startsWith("### ")) {
        flushList(`h3-${i}`);
        elements.push(
          <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-navy mt-5 mb-2">
            {formatInline(line.slice(4))}
          </h3>
        );
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        flushList(`quote-${i}`);
        elements.push(
          <blockquote key={`quote-${i}`} className="border-r-4 border-accent-vibrant bg-accent-soft/30 pr-4 py-2 my-4 text-navy/90 italic rounded-l-xl text-sm sm:text-base">
            {formatInline(line.slice(2))}
          </blockquote>
        );
        continue;
      }

      // List item
      if (line.startsWith("- ") || line.startsWith("* ")) {
        inList = true;
        listItems.push(line.slice(2));
        continue;
      }

      // Horizontal divider
      if (line === "---" || line === "***") {
        flushList(`hr-${i}`);
        elements.push(<hr key={`hr-${i}`} className="my-6 border-paper-border" />);
        continue;
      }

      // Normal paragraph
      flushList(`p-${i}`);
      elements.push(
        <p key={`p-${i}`} className="text-sm sm:text-base text-navy/85 leading-prose my-3 text-justify">
          {formatInline(line)}
        </p>
      );
    }

    flushList("end");
    return elements;
  };

  return (
    <div className="space-y-1 font-sans selection:bg-accent-soft" dir="rtl">
      {parseMarkdownToElements(content)}
    </div>
  );
}
