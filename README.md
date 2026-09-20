# aldoram5's Blog

A statically generated personal blog built with React 19, React Router, Vite, TypeScript, and Tailwind CSS. It is deployed to GitHub Pages and publishes real HTML for every page and blog post.

## Features

- Markdown posts with validated frontmatter
- Static HTML generation for all public routes
- Per-page metadata, canonical URLs, Open Graph, and JSON-LD
- XML sitemap, robots.txt, RSS, llms.txt, and a machine-readable author profile
- Tag filtering and pagination with crawlable links
- Responsive light and dark themes
- Automatic GitHub Pages deployment

## Requirements

- Node.js 20 or newer
- npm

## Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173` by default.

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

The deployable artifact is written to `dist/client`.

## Writing Blog Posts

Add a Markdown file to `public/posts/content/` using the naming convention `YYYY-MM-DD-post-title.md`. Posts are discovered automatically during development and production builds; there is no separate registry to update.

Every post requires this frontmatter:

```yaml
---
title: "Your Post Title"
date: "2026-08-17"
slug: "your-post-slug"
tags: ["tag1", "tag2"]
description: "A concise description for search results and social sharing."
image: "/images/optional-featured-image.png"
---
```

- `title`, `date`, `slug`, `tags`, and `description` are required.
- `date` must use `YYYY-MM-DD`.
- `slug` must contain lowercase letters, numbers, and hyphens only.
- `image` is optional and should point to an asset in `public/`.
- Duplicate slugs or invalid frontmatter fail the build.

Post bodies support standard Markdown, responsive images, code blocks, blockquotes, and bare YouTube URLs as embeds.

## Architecture

- `react-router.config.ts` defines static prerendering and the GitHub Pages fallback.
- `src/routes.ts` maps public URLs to route modules.
- `src/root.tsx` owns the HTML document, theme initialization, and hydration shell.
- `src/utils/posts.server.ts` discovers, validates, and parses Markdown at build time.
- `src/config/site.ts` is the shared source for site and author identity.
- `src/utils/seo.ts` builds consistent route metadata and structured data.
- `src/routes/` contains generated resource endpoints such as the sitemap and RSS feed.
- `src/pages/` contains the visible page route modules.
- `public/posts/content/` remains the source of truth for blog post content.

React Router runs with `ssr: false` because GitHub Pages is static hosting. Every known route is still prerendered during the build, including dynamic post slugs. A `404.html` fallback preserves the client-rendered not-found page, and legacy `/#/...` links redirect to their clean URL equivalents.

## Site Configuration

Update `src/config/site.ts` for shared site identity and canonical host values. Page-specific titles, descriptions, and structured data live beside each route module.

The following endpoints are generated from the same post and identity data:

- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`
- `/llms.txt`
- `/about.json`

## Deployment

The workflow in `.github/workflows/deploy.yml` builds pushes and pull requests targeting `master`. Only pushes to `master` deploy `dist/client` to GitHub Pages.

## License

The project code is available under the MIT License. Blog opinions, names, trademarks, and original game or app assets remain the property of their respective owners.
