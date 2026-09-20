import { Link, useSearchParams } from 'react-router';
import type { Route } from './+types/Home';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import TagSidebar from '../components/TagSidebar';
import { getPostSummaries } from '../utils/posts.server';
import { pageMeta, personJsonLd, websiteJsonLd } from '../utils/seo';
import { site } from '../config/site';
import { useHydrated } from '../hooks/useHydrated';

const postsPerPage = 5;

export async function loader() {
  const posts = await getPostSummaries();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  return { posts, tags };
}

export function meta() {
  return pageMeta({
    title: site.title,
    description: site.description,
    path: '/',
    jsonLd: [websiteJsonLd(), personJsonLd()],
  });
}

function pageHref(page: number, selectedTag?: string): string {
  const params = new URLSearchParams();
  if (selectedTag) params.set('tag', selectedTag);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/?${query}` : '/';
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const isHydrated = useHydrated();
  const selectedTag = isHydrated ? searchParams.get('tag') || undefined : undefined;
  const requestedPage = Number.parseInt(isHydrated ? searchParams.get('page') || '1' : '1', 10);
  const posts = selectedTag
    ? loaderData.posts.filter((post) => post.tags.includes(selectedTag))
    : loaderData.posts;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <Layout sidebar={<TagSidebar tags={loaderData.tags} selectedTag={selectedTag} />}>
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          {selectedTag ? `Posts tagged with "${selectedTag}"` : 'Latest Posts'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400" aria-live="polite">
          {selectedTag
            ? `Found ${posts.length} post${posts.length !== 1 ? 's' : ''} with this tag`
            : 'Devlogs, tutorials, and notes about software and independent game development.'}
        </p>
      </div>

      {currentPosts.length > 0 ? (
        <div className="space-y-8">
          {currentPosts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          <p>No posts found with the tag "{selectedTag}".</p>
          <Link to="/" className="btn-primary mt-4 inline-block">View all posts</Link>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center" aria-label="Blog pagination">
          <div className="flex items-center space-x-2">
            {currentPage > 1 ? (
              <Link to={pageHref(currentPage - 1, selectedTag)} rel="prev" className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-crimson-600 dark:text-gray-300 dark:hover:text-crimson-400">
                Previous
              </Link>
            ) : (
              <span className="px-3 py-2 text-sm font-medium text-gray-400" aria-disabled="true">Previous</span>
            )}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                to={pageHref(page, selectedTag)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Page ${page}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentPage === page
                  ? 'bg-crimson-600 text-white'
                  : 'text-gray-700 hover:bg-crimson-50 hover:text-crimson-700 dark:text-gray-300 dark:hover:bg-crimson-900/20 dark:hover:text-crimson-400'}`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link to={pageHref(currentPage + 1, selectedTag)} rel="next" className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-crimson-600 dark:text-gray-300 dark:hover:text-crimson-400">
                Next
              </Link>
            ) : (
              <span className="px-3 py-2 text-sm font-medium text-gray-400" aria-disabled="true">Next</span>
            )}
          </div>
        </nav>
      )}
    </Layout>
  );
}
