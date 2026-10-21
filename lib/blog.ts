import fs from 'fs';
import path from 'path';
import { blogPostsMeta } from './data';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  const content = match ? match[2] : raw;
  const meta = blogPostsMeta.find(p => p.slug === slug);
  if (!meta) throw new Error(`Blog post not found: ${slug}`);
  return { meta, content };
}

export function getAllPosts() {
  return blogPostsMeta;
}
