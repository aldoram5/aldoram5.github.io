import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';
import type { Route } from './+types/root';
import { ThemeProvider } from './contexts/ThemeProvider';
import { site } from './config/site';
import './index.css';

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem('theme');
      const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(saved || preferred);
    } catch {
      document.documentElement.classList.add('light');
    }
  })();
`;

export function meta() {
  return [
    { title: site.title },
    { name: 'description', content: site.description },
  ];
}

export function links() {
  return [
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'alternate', href: '/rss.xml', type: 'application/rss+xml', title: `${site.name} RSS feed` },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = status === 404
    ? 'The page you requested could not be found.'
    : 'Something went wrong while loading this page.';

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24 text-center dark:bg-gray-900">
      <title>{status === 404 ? 'Page Not Found' : 'Page Error'} | {site.name}</title>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {status === 404 ? 'Page not found' : 'Unable to load this page'}
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
      <a className="btn-primary mt-8 inline-block" href="/">Back to latest posts</a>
    </main>
  );
}
