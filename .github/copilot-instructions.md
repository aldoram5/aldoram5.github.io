# Copilot Instructions for aldoram5's Blog

## Project Overview

This is a modern, responsive personal blog built with React 19, TypeScript, Vite, and Tailwind CSS. The blog features a warm color palette inspired by Crimson R Games, with automatic GitHub Pages deployment and markdown-based content management.

**Key Technologies:**
- React 19 with TypeScript
- Vite 7 for build tooling
- Tailwind CSS 3 with custom color palette
- React Router (hash-based routing for GitHub Pages)
- Gray Matter for markdown frontmatter parsing
- React Markdown for content rendering

## Architecture & Design Patterns

### Routing Strategy
- Uses `HashRouter` (not `BrowserRouter`) for GitHub Pages compatibility
- Routes: `/` (home), `/posts/:slug`, `/resume`, `/about`, `/projects`
- Post URLs use slugs from frontmatter, not file names

### State Management
- Theme management via React Context (`ThemeContext`)
- No Redux or other global state libraries
- Theme state persists to localStorage with system preference detection

### Content Architecture
**Critical:** The blog reads real markdown files from `public/posts/content/` using gray-matter for frontmatter parsing. New posts MUST be added to the `availablePosts` array in `src/utils/posts.ts` to be discovered (static sites can't dynamically list directory contents).

### Component Structure
- `Layout`: Consistent page wrapper with optional sidebar
- `Header`: Navigation with responsive mobile menu and theme toggle
- `TagSidebar`: Desktop fixed sidebar / mobile collapsible tag filtering
- `PostCard`: Blog post preview with excerpts and tag links

## Code Style & Conventions

### TypeScript Guidelines
- Use `import type { Type }` for type-only imports (verbatimModuleSyntax)
- Strict TypeScript configuration enabled
- Define interfaces in `src/types/index.ts`
- Avoid `any` types; prefer explicit typing

### React Patterns
- Functional components with hooks (no class components)
- Use `async/await` for data fetching (no .then() chains)
- Prefer named exports for components
- Use React 19 features where appropriate

### Styling
- Use Tailwind CSS utility classes exclusively
- Follow mobile-first responsive design approach
- Custom colors: `crimson-600` (primary), `warm-orange-400` (secondary), `warm-yellow-400` (accent)
- Dark mode: Use `dark:` prefix with `class` strategy
- Avoid inline styles; use Tailwind utilities

### File Naming
- Components: PascalCase (e.g., `PostCard.tsx`)
- Utils/hooks: camelCase (e.g., `posts.ts`, `useTheme.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`)
- Markdown posts: `YYYY-MM-DD-post-title.md`

## Creating & Managing Blog Posts

### Adding New Posts
1. Create markdown file in `public/posts/content/` with naming: `YYYY-MM-DD-post-title.md`
2. **CRITICAL:** Add filename to `availablePosts` array in `src/utils/posts.ts`
3. Include required frontmatter:
```yaml
---
title: "Post Title"
date: "2025-08-18"
slug: "url-slug"
tags: ["tag1", "tag2"]
description: "SEO description"
---
```

### Frontmatter Requirements
All fields are required:
- `title`: Post title (string)
- `date`: Publication date (YYYY-MM-DD format)
- `slug`: URL slug (lowercase with hyphens)
- `tags`: Array of tags (minimum 1, typically 2-4)
- `description`: SEO meta description (50-160 characters)

### Markdown Features
- Standard markdown syntax supported
- YouTube URLs automatically converted to embeds
- Code blocks with syntax highlighting
- Images should be placed in `public/` directory

## Development Workflow

### Essential Commands
```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Build Process
The build command runs: `tsc -b && vite build`
- TypeScript compilation first
- Vite build with PostCSS for Tailwind
- Output: `dist/` directory

### Testing Changes
Before committing:
1. Run `npm run build` to ensure no build errors
2. Check responsive design at mobile, tablet, and desktop widths
3. Test dark/light mode toggle
4. Verify tag filtering works
5. Test navigation on all pages

## Common Tasks & Solutions

### Modifying Colors
Edit `tailwind.config.js` in the `theme.extend.colors` section. The current palette is:
- Crimson shades (50-950)
- Warm orange shades (50-950)
- Warm yellow shades (50-950)

### Adding New Routes
1. Create page component in `src/pages/`
2. Add route to `src/App.tsx` Routes
3. Add navigation link in `src/components/Header.tsx`

### Updating SEO/Meta Tags
Edit `index.html` for global meta tags (Open Graph, Twitter Cards, canonical URL)

### Handling Images
- Place in `public/` directory
- Reference as `/path/to/image.jpg` in markdown
- Images are automatically responsive via markdown rendering

### Theme Customization
Theme context in `src/contexts/ThemeContext.tsx`:
- Initializes from localStorage or system preference
- Prevents flash with inline script in `index.html`
- Toggle function available via `useTheme()` hook

## GitHub Pages Deployment

### Configuration Requirements
1. Repository Settings > Pages > Source: "GitHub Actions"
2. If using custom repo name, update `base` in `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/',
   ```
3. Update URLs in `index.html` (canonical, Open Graph)

### Deployment Workflow
- Triggers on push to `master` branch
- Workflow: `.github/workflows/deploy.yml`
- Node.js 20, npm ci for dependencies
- Builds and deploys to GitHub Pages automatically

## Important Constraints & Limitations

### Do Not:
- Use `BrowserRouter` (breaks on GitHub Pages)
- Add posts without updating `availablePosts` array
- Use absolute paths in imports when relative paths work
- Install new major dependencies without discussion
- Create inline styles; use Tailwind utilities
- Use class components; prefer functional components with hooks

### Required Patterns:
- All blog posts must have complete frontmatter
- Use gray-matter for any new markdown parsing
- Maintain responsive design in all changes
- Keep dark mode support in new components
- Use lucide-react for icons (already installed)

## Polyfills & Browser Compatibility

### Buffer Polyfill
Gray-matter requires Node.js Buffer, polyfilled for browser:
- Configured in `vite.config.ts`
- Initialized in `src/utils/posts.ts`
- Do not remove Buffer-related configuration

### Target Browsers
Modern browsers with ES6+ support. No IE11 support needed.

## Performance Considerations

- Code splitting via React Router
- Lazy loading for images in markdown
- Optimized Vite builds with minimal bundle size
- No external API calls (static markdown files)
- Fast HMR in development

## License & Attribution

- Code: MIT License (open source)
- Content/opinions: Copyright of respective owners
- Game/app assets mentioned: Personal intellectual property
- Icons: Lucide React
- Fonts: Inter from Google Fonts

## Troubleshooting Common Issues

### Build Errors
- TypeScript errors: Run `tsc -b` separately to isolate issues
- Vite errors: Check `vite.config.ts` configuration
- Missing dependencies: Run `npm install`

### Content Not Showing
- Verify filename in `availablePosts` array
- Check frontmatter syntax (YAML format)
- Ensure markdown file is in `public/posts/content/`

### Routing Issues
- Remember: HashRouter uses `#` in URLs
- Post slugs must match frontmatter, not filenames
- Check that routes in `App.tsx` match navigation links

### Styling Issues
- Run Tailwind rebuild if styles not applying
- Check dark mode classes have `dark:` prefix
- Verify custom colors are defined in `tailwind.config.js`

## Project Structure Reference

```
├── .github/workflows/     # GitHub Actions (deploy.yml)
├── public/
│   └── posts/content/    # Markdown blog posts
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (Theme)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Utility functions (posts.ts)
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── index.html           # HTML template with SEO
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Additional Context

This is a personal blog project, so:
- Favor simplicity over complex abstractions
- Keep bundle size minimal
- Prioritize readability and maintainability
- No need for advanced testing frameworks
- SEO and performance are important
- Mobile experience should be excellent

When suggesting changes, prefer small, surgical modifications over large refactors unless explicitly requested.
