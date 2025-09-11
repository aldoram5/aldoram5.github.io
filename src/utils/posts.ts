import type { BlogPost } from '../types';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// List of available markdown posts - update this when adding new posts
const availablePosts = [
  '2025-08-18-welcome-to-my-blog.md',
  '2025-09-10-building-modern-blog-react-vite.md'
];

async function loadMarkdownPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  for (const filename of availablePosts) {
    try {
      const response = await fetch(`/posts/content/${filename}`);
      if (response.ok) {
        const markdownContent = await response.text();
        const { data, content } = matter(markdownContent);
        
        const post: BlogPost = {
          title: data.title,
          date: data.date,
          slug: data.slug,
          tags: data.tags || [],
          description: data.description || '',
          content: content,
          excerpt: data.description || getExcerpt(content)
        };
        
        posts.push(post);
      }
    } catch (error) {
      console.warn(`Failed to load post ${filename}:`, error);
    }
  }
  
  return posts;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await loadMarkdownPosts();
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown syntax for excerpt
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}