---
title: "Building a Modern Blog with React and Vite"
date: "2025-09-10"
slug: "building-modern-blog-react-vite"
tags: ["react", "vite", "web-development"]
description: "Learn how to build a modern blog using React, Vite, and Tailwind CSS with GitHub Pages deployment."
---

# Building a Modern Blog with React and Vite

In this post, I'll discuss a bit about the process of building a modern blog using React, Vite, and Tailwind CSS. This is the tech stack powering the blog you're reading right now!

## Why This Tech Stack?

### React: Component-Based Architecture
React's component-based approach makes it easy to build reusable UI elements and manage complex application state. For a blog, this means:

- Reusable components for posts, headers, and layouts
- Easy state management for features like dark mode
- Great developer experience with hot reloading

### Vite: Lightning-Fast Development
Vite has revolutionized the development experience with:

- **Instant server start**: No waiting for bundling
- **Hot Module Replacement (HMR)**: Changes appear instantly
- **Optimized builds**: Efficient production bundles
- **Modern ES modules**: Native browser support

### Tailwind CSS: Utility-First Styling
Tailwind CSS provides:

- **Rapid development**: Style components without leaving your HTML
- **Consistent design**: Predefined scale for spacing, colors, and typography
- **Responsive design**: Mobile-first approach with breakpoint prefixes
- **Dark mode support**: Built-in dark mode variants

### GitHub Pages: Free Hosting
GitHub Pages offers:

- **Free hosting**: No cost for public repositories
- **Automatic deployment**: Push to deploy with GitHub Actions
- **Custom domains**: Use your own domain name
- **HTTPS by default**: Secure by default

Although I do own and pay for [crimsonrgames.com](https://crimsonrgames.com), I consider this approach quite simple and useful, as I don't really need that much complexity coming from having to handle a VPS or deal with a tech stack provided by a third party and the github actions make deployments part of the process for free.


## Key Features Implemented

### 1. Markdown Support with Frontmatter
Each blog post is a markdown file with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2025-08-15"
slug: "post-slug"
tags: ["tag1", "tag2"]
description: "Post description for SEO"
---
```

This approach provides:
- Easy content creation
- Structured metadata
- Version control for content
- SEO-friendly URLs

### 2. Tag-Based Filtering System
The blog includes a sophisticated tag system:

- **Desktop**: Fixed sidebar with all available tags
- **Mobile**: Collapsible tag filter section
- **URL integration**: Tags reflected in the URL for bookmarking
- **Dynamic filtering**: Instant post filtering without page reloads

### 3. Responsive Design
The blog is built mobile-first with:

```css
/* Mobile: Single column */
.main-content {
  @apply grid-cols-1;
}

/* Desktop: Two columns with sidebar */
@screen lg {
  .main-content {
    @apply grid-cols-4;
  }
}
```

### 4. Dark/Light Mode Toggle
Implemented with:

- System preference detection
- localStorage persistence
- CSS custom properties for theming
- Smooth transitions between modes

```javascript
const { theme, toggleTheme } = useTheme();

// Auto-detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### 5. SEO Optimization
The blog includes:

- Semantic HTML structure
- Meta tags for social sharing
- Descriptive URLs
- Fast loading times
- Mobile-responsive design

## Performance Considerations

### Code Splitting
React Router enables automatic code splitting:

```javascript
const Home = lazy(() => import('./pages/Home'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
```

### Image Optimization
Images are optimized with:

- Lazy loading
- Responsive images
- Modern formats (WebP)
- Proper alt text for accessibility

### Bundle Optimization
Vite automatically:

- Tree shakes unused code
- Minifies JavaScript and CSS
- Generates efficient chunks
- Enables browser caching

## Deployment Strategy

### GitHub Actions Workflow
The blog deploys automatically with:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: actions/deploy-pages@v4
```

### Benefits of This Approach

1. **Zero-friction publishing**: Write markdown, push to Git, and it's live
2. **Version control**: Full history of content changes
3. **Backup**: Content is safely stored in Git
4. **Collaboration**: Easy for multiple authors to contribute

## Conclusion
I'm quite happy with the results, developing this took almost no time and was somewhat smooth. Even if simple (because the blog doesn't have a 'traditional backend', nor does it support user generated content like comments), this modern blog with React and Vite provides an excellent balance of:

- **Developer experience**: Fast, modern tooling
- **Performance**: Optimized for speed and SEO
- **Maintainability**: Clean, component-based architecture
- **Cost**: Free hosting with GitHub Pages

The result is a fast, maintainable blog that's perfect for developers who want to share their knowledge and projects.

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

Happy coding! 