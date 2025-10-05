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

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
  image?: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}