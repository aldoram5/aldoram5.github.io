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

## Quick Start: Build, Lint, and Test

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

### Setup
```bash
npm install  # Install all dependencies
```

### How to Build
```bash
npm run build    # Production build (runs TypeScript check + Vite build)
```
- TypeScript compilation runs first (`tsc -b`)
- Vite builds the production bundle
- Output directory: `dist/`
- Expected warnings: gray-matter eval warning (safe, library-specific), large chunk size (acceptable for this project)

### How to Lint
```bash
npm run lint     # Run ESLint on all source files
```
- ESLint configuration: `eslint.config.js`
- Known acceptable linting warnings:
  - `react-refresh/only-export-components` in `ThemeContext.tsx` (exports both context and hook by design)
  - Some `@ts-ignore` comments exist for library compatibility (buffer polyfill)

### How to Run Development Server
```bash
npm run dev      # Start dev server at localhost:5173
npm run preview  # Preview production build locally
```

### How to Test
**Note**: This project currently does not have a formal test suite. Manual testing is performed by:
1. Running `npm run build` to check for TypeScript/build errors
2. Running `npm run dev` and manually testing:
   - Navigation between pages
   - Dark/light mode toggle
   - Tag filtering functionality
   - Post content rendering
   - Responsive design at different screen sizes
   - Mobile menu functionality

If adding tests in the future, use testing frameworks compatible with React 19 and Vite.

## Security Considerations

### Dependencies
- Always check for security vulnerabilities before adding new dependencies
- Keep dependencies up to date, especially security-critical ones
- Current dependencies are from trusted sources (React, Vite, Tailwind)

### Content Security
- User-generated content is minimal (only markdown posts controlled by repository owner)
- No external API calls or database connections
- No user authentication or personal data collection

### Build Security
- Buffer polyfill is required for gray-matter (markdown parsing library)
- GitHub Actions deployment uses Node.js 20 with `npm ci` for reproducible builds
- All code is static HTML/CSS/JS served from GitHub Pages

### Code Quality
- TypeScript strict mode is enabled to catch type errors
- ESLint is configured to catch common issues
- No use of `eval()` except in gray-matter library (library dependency, cannot be avoided)

### Best Practices When Making Changes
- Never commit secrets or API keys
- Validate all external URLs before adding them to markdown content
- Keep all external dependencies to a minimum
- Review all code changes for potential XSS vulnerabilities (though risk is low for static site)

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

### Development Commands
All commands should be run from the repository root:

```bash
npm install      # Install dependencies (run once or after package.json changes)
npm run dev      # Start dev server (localhost:5173) - Hot reload enabled
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

### Build Process
The `npm run build` command runs: `tsc -b && vite build`
- TypeScript compilation validates types first
- Vite build processes and bundles the application with PostCSS for Tailwind
- Output: `dist/` directory ready for deployment
- Build artifacts are automatically deployed to GitHub Pages on push to `master` branch

### Making Changes - Workflow
1. **Before starting**: Run `npm install` to ensure dependencies are up to date
2. **During development**: Use `npm run dev` for hot reload
3. **Before committing**: 
   - Run `npm run lint` to check for code quality issues
   - Run `npm run build` to ensure no build errors
   - Manually test affected functionality
4. **Testing responsive design**: Check at mobile (375px), tablet (768px), and desktop (1024px+) widths
5. **Testing theme**: Verify both dark and light modes work correctly
6. **Commit and push**: Changes trigger automatic deployment via GitHub Actions

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
- Port conflicts: Vite dev server uses port 5173 by default, change in vite.config.ts if needed

### Content Not Showing
- Verify filename in `availablePosts` array
- Check frontmatter syntax (YAML format)
- Ensure markdown file is in `public/posts/content/`
- Verify all required frontmatter fields are present (title, date, slug, tags, description)

### Routing Issues
- Remember: HashRouter uses `#` in URLs
- Post slugs must match frontmatter, not filenames
- Check that routes in `App.tsx` match navigation links
- For GitHub Pages: ensure `base` in vite.config.ts is correct for your repository

### Styling Issues
- Run Tailwind rebuild if styles not applying (`npm run build`)
- Check dark mode classes have `dark:` prefix
- Verify custom colors are defined in `tailwind.config.js`
- Clear browser cache if styles appear stale

### Linting Issues
- Known acceptable warnings:
  - `react-refresh/only-export-components` in ThemeContext.tsx (exports both context and hook)
  - `@ts-ignore` comments for Buffer polyfill compatibility
- For new linting errors, fix them before committing
- Run `npm run lint` frequently during development

## Common Pitfalls and How to Avoid Them

### Adding New Blog Posts
**Pitfall**: Creating a markdown file but forgetting to add it to `availablePosts` array
**Solution**: Always follow the two-step process:
1. Create markdown file in `public/posts/content/`
2. Add filename to `availablePosts` in `src/utils/posts.ts`

### Routing on GitHub Pages
**Pitfall**: Using `BrowserRouter` which breaks on GitHub Pages
**Solution**: Always use `HashRouter` for GitHub Pages compatibility

### Missing Frontmatter
**Pitfall**: Omitting required frontmatter fields causes posts not to display
**Solution**: Use the frontmatter template and validate all five required fields

### Import Paths
**Pitfall**: Using incorrect import paths that work locally but fail in production
**Solution**: Use relative imports consistently, avoid mixing absolute/relative paths

### Dark Mode Support
**Pitfall**: Adding new components without dark mode styles
**Solution**: Always add `dark:` variants for colors and backgrounds in new components

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

## Getting Help and Contributing

### Before Asking for Help
1. Check this instructions file for relevant guidance
2. Review the README.md for setup instructions
3. Check the Troubleshooting section above
4. Verify your Node.js version is 18 or higher
5. Try deleting `node_modules` and running `npm install` again

### When Reporting Issues
Include the following information:
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Exact error messages or unexpected behavior
- Steps to reproduce
- What you expected to happen

### Contributing Guidelines
1. This is a personal blog, so contributions are not actively sought
2. If you do want to suggest improvements:
   - Open an issue first to discuss the change
   - Keep changes minimal and focused
   - Follow the existing code style and patterns
   - Test thoroughly before submitting
3. For typos or obvious bugs, feel free to open a PR directly

### Resources
- React 19 Documentation: https://react.dev/
- Vite Documentation: https://vite.dev/
- Tailwind CSS Documentation: https://tailwindcss.com/
- TypeScript Documentation: https://www.typescriptlang.org/
- GitHub Pages Documentation: https://docs.github.com/pages
