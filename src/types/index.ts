export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
  content: string;
  excerpt?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  description: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}