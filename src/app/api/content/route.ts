import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { syncContent } from '../../../../scripts/sync-content.mjs';

export const dynamic = 'force-static';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'content', 'articles');
const notesDir = path.join(rootDir, 'content', 'notes');

export async function GET() {
  try {
    const data = syncContent();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, slug, id, title, category, categorySlug, excerpt, content, markdown, readingMinutes, status, featured, tags, date, summary } = body;

    if (type === 'article') {
      if (!slug || !title) {
        return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
      }

      if (!fs.existsSync(articlesDir)) {
        fs.mkdirSync(articlesDir, { recursive: true });
      }

      const filePath = path.join(articlesDir, `${slug}.md`);

      const tagsList = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      const tagsYaml = tagsList.length > 0 ? '\ntags:\n' + tagsList.map((t: string) => `  - "${t}"`).join('\n') : '\ntags: []';

      const markdownBody = markdown || (Array.isArray(content) ? content.join('\n\n') : content || '');

      const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category || 'تصمیم‌گیری'}"
categorySlug: "${categorySlug || 'decisions'}"
publishedAt: "${body.publishedAt || new Date().toLocaleDateString('fa-IR')}"
readingMinutes: ${readingMinutes || 5}
featured: ${featured ? 'true' : 'false'}
status: "${status || 'published'}"${tagsYaml}
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
---

${markdownBody.trim()}
`;

      fs.writeFileSync(filePath, fileContent, 'utf-8');
      const updated = syncContent();
      return NextResponse.json({ success: true, slug, data: updated });
    }

    if (type === 'note') {
      const noteId = id || slug || `note-${Date.now()}`;
      if (!fs.existsSync(notesDir)) {
        fs.mkdirSync(notesDir, { recursive: true });
      }

      const filePath = path.join(notesDir, `${noteId}.md`);
      const bodyContent = markdown || content || '';

      const fileContent = `---
id: "${noteId}"
title: "${(title || '').replace(/"/g, '\\"')}"
category: "${category || 'یادداشت'}"
date: "${date || new Date().toLocaleDateString('fa-IR')}"
summary: "${(summary || '').replace(/"/g, '\\"')}"
---

${bodyContent.trim()}
`;

      fs.writeFileSync(filePath, fileContent, 'utf-8');
      const updated = syncContent();
      return NextResponse.json({ success: true, id: noteId, data: updated });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and id are required' }, { status: 400 });
    }

    const targetDir = type === 'article' ? articlesDir : notesDir;
    const filePath = path.join(targetDir, `${id}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      const updated = syncContent();
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
