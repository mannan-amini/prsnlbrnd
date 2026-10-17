import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const articlesDir = path.join(rootDir, 'content', 'articles');
const notesDir = path.join(rootDir, 'content', 'notes');
const outputFile = path.join(rootDir, 'src', 'lib', 'content-data.json');
const publicOutputFile = path.join(rootDir, 'public', 'content-data.json');

/**
 * Lightweight, robust YAML Frontmatter parser for Markdown files.
 * Zero external dependencies.
 */
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: fileContent.trim() };
  }

  const rawYaml = match[1];
  const body = match[2].trim();
  const data = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey = null;
  let isList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // List item under currentKey
    if (line.startsWith('  - ') || line.startsWith('    - ') || trimmed.startsWith('- ')) {
      if (currentKey && Array.isArray(data[currentKey])) {
        const itemVal = trimmed.replace(/^-\s*/, '').replace(/^['"](.*)['"]$/, '$1').trim();
        data[currentKey].push(itemVal);
        continue;
      }
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();

      // Check if it's start of a list
      if (val === '') {
        currentKey = key;
        data[key] = [];
        isList = true;
        continue;
      }

      isList = false;
      currentKey = key;

      // Clean quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }

      // Type conversions
      if (val === 'true') {
        data[key] = true;
      } else if (val === 'false') {
        data[key] = false;
      } else if (!isNaN(Number(val)) && val !== '') {
        data[key] = Number(val);
      } else {
        data[key] = val;
      }
    }
  }

  return { data, body };
}

export function syncContent() {
  // Ensure directories exist
  if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true });
  if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir, { recursive: true });

  // 1. Process Articles
  const articleFiles = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));
  const articles = [];

  for (const file of articleFiles) {
    const filePath = path.join(articlesDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(raw);

    const slug = data.slug || file.replace(/\.md$/, '');
    const paragraphs = body
      .split(/\r?\n\r?\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    // Estimate reading minutes if not provided (Persian ~ 200 words/min)
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    const readingMinutes = data.readingMinutes || Math.max(1, Math.ceil(wordCount / 200));

    articles.push({
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || paragraphs[0] || '',
      category: data.category || 'عمومی',
      categorySlug: data.categorySlug || 'decisions',
      publishedAt: data.publishedAt || '۱۴۰۳/۰۱/۰۱',
      readingMinutes,
      featured: Boolean(data.featured),
      status: data.status || 'published',
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: paragraphs,
      markdown: body,
    });
  }

  // 2. Process Notes
  const noteFiles = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));
  const notes = [];

  for (const file of noteFiles) {
    const filePath = path.join(notesDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(raw);

    const id = data.id || file.replace(/\.md$/, '');

    notes.push({
      id,
      title: data.title || id,
      category: data.category || 'مشاهده',
      date: data.date || '۱۴۰۳/۰۱/۰۱',
      summary: data.summary || body.slice(0, 120),
      content: body,
    });
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    articles,
    notes,
  };

  fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), 'utf-8');
  try {
    fs.writeFileSync(publicOutputFile, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (err) {
    // If public directory doesn't exist yet, create and write
    fs.mkdirSync(path.dirname(publicOutputFile), { recursive: true });
    fs.writeFileSync(publicOutputFile, JSON.stringify(payload, null, 2), 'utf-8');
  }
  console.log(`✓ [sync-content] Synced ${articles.length} articles and ${notes.length} notes -> ${outputFile}`);
  return payload;
}

// Run directly if invoked via node
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncContent();
}
