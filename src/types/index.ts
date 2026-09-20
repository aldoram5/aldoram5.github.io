export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
  content: string;
  excerpt?: string;
  image?: string;
}

export type PostSummary = Omit<BlogPost, 'content'>;

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
  image?: string;
}
