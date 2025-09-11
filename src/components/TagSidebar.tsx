import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';

interface TagSidebarProps {
  tags: string[];
  selectedTag?: string;
  onTagSelect: (tag: string | undefined) => void;
}

const TagSidebar: React.FC<TagSidebarProps> = ({ tags, selectedTag, onTagSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      onTagSelect(undefined); // Deselect if already selected
    } else {
      onTagSelect(tag);
    }
  };

  const clearFilter = () => {
    onTagSelect(undefined);
  };

  return (
    <>
      {/* Mobile Collapsible Tag Section */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-crimson-600" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Filter by Tags
            </span>
            {selectedTag && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({selectedTag})
              </span>
            )}
          </div>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {!isCollapsed && (
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {selectedTag && (
                <button
                  onClick={clearFilter}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Clear Filter
                </button>
              )}
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-crimson-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-crimson-100 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block">
        <div className="sticky top-20 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-4 w-4 text-crimson-600" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Filter by Tags
              </h3>
            </div>
            
            {selectedTag && (
              <button
                onClick={clearFilter}
                className="w-full mb-3 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filter
              </button>
            )}
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedTag === tag
                      ? 'bg-crimson-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagSidebar;