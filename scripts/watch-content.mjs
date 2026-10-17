import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncContent } from './sync-content.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.resolve(__dirname, '..', 'content');

console.log(`👀 Watching for Markdown changes in: ${contentDir}`);

// Initial sync
syncContent();

let debounceTimer = null;

function onFileChange(eventType, filename) {
  if (!filename || !filename.endsWith('.md')) return;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`\n📝 Detected change in ${filename} (${eventType}). Resyncing content...`);
    try {
      syncContent();
    } catch (err) {
      console.error('❌ Sync error:', err);
    }
  }, 100);
}

try {
  fs.watch(contentDir, { recursive: true }, onFileChange);
} catch (e) {
  console.error('Watch error:', e);
}
