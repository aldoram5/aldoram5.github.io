import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Link } from 'react-router';

interface TagSidebarProps {
  tags: string[];
  selectedTag?: string;
}

function TagLinks({ tags, selectedTag }: TagSidebarProps) {
  return (
    <div className="flex flex-wrap gap-2 md:block md:space-y-2">
      {selectedTag && (
        <Link to="/" className="block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 md:mb-3 md:text-center">
          Clear filter
        </Link>
      )}
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/?tag=${encodeURIComponent(tag)}`}
          aria-current={selectedTag === tag ? 'true' : undefined}
          className={`block rounded-md px-3 py-2 text-sm transition-colors md:w-full md:text-left ${selectedTag === tag
            ? 'bg-crimson-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-crimson-50 hover:text-crimson-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-crimson-900/20 dark:hover:text-crimson-400 md:bg-transparent dark:md:bg-transparent'}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export default function TagSidebar({ tags, selectedTag }: TagSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <div className="mb-6 md:hidden">
        <button
          type="button"
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-expanded={!isCollapsed}
          aria-controls="mobile-tag-filters"
        >
          <span className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-crimson-600" aria-hidden="true" />
            <span className="font-medium text-gray-900 dark:text-gray-100">Filter by tags</span>
            {selectedTag && <span className="text-sm text-gray-500 dark:text-gray-400">({selectedTag})</span>}
          </span>
          {isCollapsed
            ? <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
            : <ChevronUp className="h-4 w-4 text-gray-500" aria-hidden="true" />}
        </button>

        {!isCollapsed && (
          <div id="mobile-tag-filters" className="mt-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <TagLinks tags={tags} selectedTag={selectedTag} />
          </div>
        )}
      </div>

      <aside className="hidden md:block" aria-label="Blog tags">
        <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-4 flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-100">
            <Tag className="h-4 w-4 text-crimson-600" aria-hidden="true" />
            <span>Filter by tags</span>
          </p>
          <div className="max-h-64 overflow-y-auto">
            <TagLinks tags={tags} selectedTag={selectedTag} />
          </div>
        </div>
      </aside>
    </>
  );
}
