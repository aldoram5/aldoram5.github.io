import { site } from '../config/site';

export function meta() {
  return [
    { title: `Page Not Found | ${site.name}` },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'page-kind', content: 'not-found' },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24 text-center dark:bg-gray-900">
      <main>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Page not found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          The page you requested does not exist or may have moved.
        </p>
        <a href="/" className="btn-primary mt-8 inline-block">Back to latest posts</a>
      </main>
    </div>
  );
}
