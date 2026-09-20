import { Children } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  videoTitle: string;
}

const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export default function MarkdownContent({ content, videoTitle }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-crimson-600 prose-strong:text-gray-900 prose-code:text-crimson-600 prose-pre:bg-gray-100 dark:prose-invert dark:prose-headings:text-gray-100 dark:prose-a:text-crimson-400 dark:prose-strong:text-gray-100 dark:prose-code:text-crimson-400 dark:prose-pre:bg-gray-800">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-bold first:mt-0">{children}</h2>,
          h2: ({ children }) => <h2 className="mb-3 mt-6 text-2xl font-bold">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-2 mt-5 text-xl font-bold">{children}</h3>,
          h4: ({ children }) => <h4 className="mb-2 mt-4 text-lg font-bold">{children}</h4>,
          h5: ({ children }) => <h5 className="mb-2 mt-3 text-base font-bold">{children}</h5>,
          h6: ({ children }) => <h6 className="mb-2 mt-3 text-sm font-bold">{children}</h6>,
          ul: ({ children }) => <ul className="mb-4 ml-4 list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 ml-4 list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-crimson-600 underline decoration-1 underline-offset-2 transition-colors hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300"
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ''}
              className="mx-auto h-auto max-w-full rounded-lg shadow-md"
              loading="lazy"
              decoding="async"
            />
          ),
          p: ({ children }) => {
            const text = Children.toArray(children)
              .filter((child): child is string => typeof child === 'string')
              .join('');
            const match = text.match(youtubePattern);

            if (match) {
              return (
                <div className="relative my-6 h-0 w-full overflow-hidden rounded-lg pb-[56.25%] shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${match[1]}`}
                    title={`Video embedded in ${videoTitle}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </div>
              );
            }

            return <p className="mb-4">{children}</p>;
          },
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-crimson-400 bg-gray-50 py-2 pl-4 italic dark:bg-gray-800">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre tabIndex={0} className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
