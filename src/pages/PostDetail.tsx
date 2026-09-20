import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/PostDetail';
import Layout from '../components/Layout';
import MarkdownContent from '../components/MarkdownContent';
import { absoluteAssetUrl, canonicalUrl, site } from '../config/site';
import { formatDate } from '../utils/posts';
import { getPostBySlug } from '../utils/posts.server';
import { pageMeta } from '../utils/seo';

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  if (!post) throw new Response('Post not found', { status: 404 });
  return post;
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return pageMeta({
      title: `Post Not Found | ${site.name}`,
      description: 'The requested blog post could not be found.',
      path: '/',
    });
  }

  const url = canonicalUrl(`/posts/${loaderData.slug}`);
  const image = loaderData.image ? absoluteAssetUrl(loaderData.image) : undefined;
  return pageMeta({
    title: `${loaderData.title} | ${site.name}`,
    description: loaderData.description,
    path: `/posts/${loaderData.slug}`,
    image: loaderData.image,
    type: 'article',
    publishedTime: `${loaderData.date}T00:00:00Z`,
    tags: loaderData.tags,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: loaderData.title,
      description: loaderData.description,
      datePublished: loaderData.date,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en',
      keywords: loaderData.tags,
      image,
      author: {
        '@type': 'Person',
        '@id': `${site.url}/#aldo-pedro-rangel-montiel`,
        name: site.author.name,
        url: canonicalUrl('/about'),
      },
      isPartOf: { '@id': `${site.url}/#blog` },
    },
  });
}

export default function PostDetail({ loaderData: post }: Route.ComponentProps) {
  return (
    <Layout>
      <article className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="group inline-flex items-center space-x-2 text-crimson-600 transition-colors hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300">
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            <span>Back to posts</span>
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.image && (
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="eager" />
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-start space-x-2">
                <Tag className="mt-0.5 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Tags:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`} className="text-crimson-600 transition-colors hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {post.description && (
            <div className="mb-6 border-l-4 border-warm-orange-400 bg-warm-orange-50 py-3 pl-4 dark:bg-warm-orange-900/10">
              <p className="font-medium text-gray-700 dark:text-gray-300">{post.description}</p>
            </div>
          )}
        </header>

        <MarkdownContent content={post.content} videoTitle={post.title} />

        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="text-center">
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to all posts</span>
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  );
}
