import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import TagSidebar from '../components/TagSidebar';
import { getAllPosts, getAllTags, getPostsByTag } from '../utils/posts';
import type { BlogPost } from '../types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedTag = searchParams.get('tag') || undefined;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const postsPerPage = 5;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [allPosts, tags] = await Promise.all([
          selectedTag ? getPostsByTag(selectedTag) : getAllPosts(),
          getAllTags()
        ]);
        
        setPosts(allPosts);
        setAllTags(tags);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedTag]);

  const handleTagSelect = (tag: string | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (tag) {
      newParams.set('tag', tag);
    } else {
      newParams.delete('tag');
    }
    
    // Reset to first page when changing filters
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crimson-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      sidebar={
        <TagSidebar
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
        />
      }
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {selectedTag ? `Posts tagged with "${selectedTag}"` : 'Latest Posts'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {selectedTag 
            ? `Found ${posts.length} post${posts.length !== 1 ? 's' : ''} with this tag`
            : 'Welcome to my blog! Here are my latest thoughts and insights.'
          }
        </p>
      </div>

      {/* Posts List */}
      {currentPosts.length > 0 ? (
        <div className="space-y-8">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {selectedTag 
              ? `No posts found with the tag "${selectedTag}"`
              : 'No posts available yet'
            }
          </div>
          {selectedTag && (
            <button
              onClick={() => handleTagSelect(undefined)}
              className="mt-4 btn-primary"
            >
              View All Posts
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-crimson-600 dark:hover:text-crimson-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-crimson-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-crimson-600 dark:hover:text-crimson-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </Layout>
  );
};

export default Home;