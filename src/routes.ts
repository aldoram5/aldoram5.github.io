import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/Home.tsx'),
  route('posts/:slug', 'pages/PostDetail.tsx'),
  route('resume', 'pages/Resume.tsx'),
  route('about', 'pages/About.tsx'),
  route('projects', 'pages/Projects.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
  route('rss.xml', 'routes/rss.ts'),
  route('llms.txt', 'routes/llms.ts'),
  route('about.json', 'routes/about-json.ts'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig;
