import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost, PostMetadata, PostSummary } from '../types';
import { getExcerpt } from './posts';

const postsDirectory = path.resolve(process.cwd(), 'public/posts/content');

function requiredString(
  value: unknown,
  field: keyof PostMetadata,
  filename: string,
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${filename}: frontmatter field "${field}" must be a non-empty string`);
  }

  return value.trim();
}

function parseDate(value: unknown, filename: string): string {
  const date = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : requiredString(value, 'date', filename);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${filename}: frontmatter field "date" must use YYYY-MM-DD`);
  }

  return date;
}

function parseTags(value: unknown, filename: string): string[] {
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error(`${filename}: frontmatter field "tags" must be an array of strings`);
  }

  return value.map((tag) => tag.trim()).filter(Boolean);
}

function parsePost(filename: string, source: string): BlogPost {
  const { data, content } = matter(source);
  const slug = requiredString(data.slug, 'slug', filename);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${filename}: frontmatter field "slug" is not URL-safe`);
  }

  const image = data.image === undefined
    ? undefined
    : requiredString(data.image, 'image', filename);
  const description = requiredString(data.description, 'description', filename);

  return {
    title: requiredString(data.title, 'title', filename),
    date: parseDate(data.date, filename),
    slug,
    tags: parseTags(data.tags, filename),
    description,
    content,
    excerpt: description || getExcerpt(content),
    image,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const filenames = (await readdir(postsDirectory))
    .filter((filename) => filename.endsWith('.md'))
    .sort();
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const source = await readFile(path.join(postsDirectory, filename), 'utf8');
      return parsePost(filename, source);
    }),
  );

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate blog post slug: ${post.slug}`);
    }
    slugs.add(post.slug);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  return (await getAllPosts()).map((post) => ({
    title: post.title,
    date: post.date,
    slug: post.slug,
    tags: post.tags,
    description: post.description,
    excerpt: post.excerpt,
    image: post.image,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((post) => post.slug);
}
