# aldoram5's Blog

A modern, responsive personal blog built with React, Vite, and Tailwind CSS. Features a clean design with warm colors inspired by Crimson R Games, dark/light mode toggle, tag-based filtering, and automatic GitHub Pages deployment.

## Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with clean, professional layout
- **Dark/Light Mode**: System preference detection with manual toggle
- **Tag System**: Filter posts by tags with responsive sidebar/collapsible design
- **Markdown Support**: Write posts in markdown with frontmatter metadata
- **YouTube Embedding**: Automatic YouTube video embedding in posts
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **GitHub Pages**: Automatic deployment via GitHub Actions
- **Fast Performance**: Optimized builds with code splitting

## Design

The blog features a warm color palette inspired by Crimson R Games:
- **Primary**: Crimson red (#dc2626)
- **Secondary**: Warm orange (#fb923c)  
- **Accent**: Warm yellow (#fcd34d)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aldoram5/aldoram5.github.io.git
   cd aldoram5.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Writing Blog Posts

### Creating a New Post

1. **Create the markdown file**
   - Add a new markdown file in `public/posts/content/`
   - Use the naming convention: `YYYY-MM-DD-post-title.md`

2. **Add the filename to the posts registry**
   - Open `src/utils/posts.ts`
   - Add your new filename to the `availablePosts` array:
   ```typescript
   const availablePosts = [
     '2025-08-18-welcome-to-my-blog.md',
     '2025-08-15-building-modern-blog-react-vite.md',
     '2025-MM-DD-your-new-post.md', // Add your new post here
   ];
   ```
   Please note that this also helps to ensure only posts "approved" can be published, as you need to add it to this list.

3. **Add frontmatter at the top of your file**:

```yaml
---
title: "Your Post Title"
date: "2025-08-18"
slug: "your-post-slug"
tags: ["tag1", "tag2", "tag3"]
description: "Brief description for SEO and social sharing"
---

# Your Post Content

Write your post content here using markdown...
```

**Note**: The blog reads posts from actual markdown files in `public/posts/content/` using gray-matter for frontmatter parsing. You must add new post filenames to the `availablePosts` array for them to be discovered.

### Frontmatter Fields

- **title**: Post title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **slug**: URL slug for the post (required)
- **tags**: Array of tags for categorization (required)
- **description**: Meta description for SEO (required)

### Markdown Features

- Standard markdown syntax
- Automatic YouTube embedding (paste YouTube URLs)
- Code syntax highlighting
- Responsive images
- Custom blockquotes

## Configuration

### Customizing Colors

Edit `tailwind.config.js` to modify the color palette:

```javascript
theme: {
  extend: {
    colors: {
      crimson: {
        // Your custom crimson shades
      },
      warm: {
        orange: {
          // Your custom orange shades
        }
      }
    }
  }
}
```

### Site Configuration

Update these files to customize your blog:

1. **`index.html`** - Meta tags, site title, SEO information
2. **`src/components/Header.tsx`** - Navigation and site name
3. **`src/pages/About.tsx`** - Your personal information
4. **`src/pages/Resume.tsx`** - Your professional experience
5. **`src/pages/Projects.tsx`** - Your project portfolio

### GitHub Pages Deployment

1. **Configure repository**
   - Go to repository Settings > Pages
   - Set source to "GitHub Actions"

2. **Update base URL** (if using a custom repository name)
   ```javascript
   // vite.config.ts
   export default defineConfig({
     base: '/your-repo-name/', // Change this to your repo name
     // ... other config
   })
   ```

3. **Update URLs in configuration files**
   - `index.html` - Update canonical URL and Open Graph URLs
   - Component files - Update any hardcoded URLs

4. **Deploy**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin master
   ```

The GitHub Action will automatically build and deploy your site.

## Project Structure

```
├── .github/workflows/    # GitHub Actions deployment
├── public/
│   └── posts/content/   # Markdown blog posts
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── main.tsx        # App entry point
├── index.html          # HTML template with SEO meta tags
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Key Components

### Header
- Responsive navigation with mobile burger menu
- Dark/light mode toggle
- Active route highlighting

### TagSidebar
- Desktop: Fixed sidebar with all tags
- Mobile: Collapsible section (collapsed by default)
- Tag filtering with URL integration

### PostCard
- Post preview with excerpt
- Tag display and filtering links
- Responsive design

### Layout
- Consistent page structure
- Sidebar integration
- Footer with attribution

## Responsive Design

- **Mobile**: Single column, burger menu, collapsible tag section
- **Tablet**: Single column with horizontal navigation
- **Desktop**: Two-column layout with fixed tag sidebar

## SEO Features

- Semantic HTML structure
- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Sitemap generation (via GitHub Pages)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading for images
- Optimized builds with Vite
- Minimal bundle size
- Fast development with HMR

## Contributing
Ideally, since this a non for profit, personal blog, there's no need to contribute but just in case:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE), that includes code changes, however,
opinions, names or trademarks are copyright of those who own them and wouldn't be subjected to the same licensing.
Whenever I mention or add assets related to my own Games or Apps, those are of my intelectual property.


## Acknowledgments

- Design inspiration from Crimson R Games
- Built with modern web technologies
- Icons by Lucide React
- Fonts by Google Fonts (Inter)

---

For questions or support, please open an issue on GitHub.
