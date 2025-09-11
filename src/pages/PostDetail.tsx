import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import { getPostBySlug } from '../utils/posts';
import { formatDate } from '../utils/posts';
import type { BlogPost } from '../types';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const foundPost = await getPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crimson-600"></div>
        </div>
      </Layout>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        {/* Back to Posts */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to posts</span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>Tagged in:</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <React.Fragment key={tag}>
                      <Link
                        to={`/?tag=${encodeURIComponent(tag)}`}
                        className="text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors"
                      >
                        {tag}
                      </Link>
                      {index < post.tags.length - 1 && <span className="text-gray-400">,</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {post.description && (
            <div className="bg-warm-orange-50 dark:bg-warm-orange-900/10 border-l-4 border-warm-orange-400 pl-4 py-3 mb-6">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {post.description}
              </p>
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-crimson-600 dark:prose-a:text-crimson-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-crimson-600 dark:prose-code:text-crimson-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          <ReactMarkdown
            components={{
              // Enhanced link rendering
              a: ({ href, children }) => {
                const isExternal = href?.startsWith('http');
                return (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors"
                  >
                    {children}
                  </a>
                );
              },
              
              // Enhanced image rendering
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-lg shadow-md mx-auto max-w-full h-auto"
                  loading="lazy"
                />
              ),
              
              // YouTube embedding support
              p: ({ children }) => {
                // Check if paragraph contains a YouTube URL
                const text = children?.toString() || '';
                const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
                const match = text.match(youtubeRegex);
                
                if (match) {
                  const videoId = match[1];
                  return (
                    <div className="relative w-full h-0 pb-[56.25%] my-6 rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  );
                }
                
                return <p className="mb-4">{children}</p>;
              },
              
              // Enhanced blockquote rendering
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-crimson-400 pl-4 italic bg-gray-50 dark:bg-gray-800 py-2 my-6">
                  {children}
                </blockquote>
              ),
              
              // Enhanced code block rendering
              pre: ({ children }) => (
                <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/?tag=${encodeURIComponent(tag)}`}
                    className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-crimson-100 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors duration-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Posts */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all posts</span>
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  );
};

export default PostDetail;