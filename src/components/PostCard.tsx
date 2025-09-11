import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';
import { formatDate, getExcerpt } from '../utils/posts';

interface PostCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showExcerpt = true }) => {
  const excerpt = post.excerpt || getExcerpt(post.content);

  return (
    <article className="card p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Post Header */}
      <div className="mb-4">
        <Link 
          to={`/posts/${post.slug}`}
          className="block group"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors duration-200 mb-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span>
                {post.tags.slice(0, 2).join(', ')}
                {post.tags.length > 2 && ` +${post.tags.length - 2} more`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Post Excerpt/Description */}
      {showExcerpt && (
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {excerpt}
          </p>
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-crimson-100 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Read More Link */}
      <div className="flex justify-between items-center">
        <Link
          to={`/posts/${post.slug}`}
          className="inline-flex items-center space-x-2 text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 font-medium transition-colors duration-200 group"
        >
          <span>Read more</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;