import React from "react";

const StructureTools = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
        <div className="px-1">
          <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
        </div>

        {/* --- Unordered List Button (No Change) --- */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
          data-tooltip-target="tooltip-list"
          className={`p-1.5 rounded-sm cursor-pointer ${
            editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-800" : ""
          } text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
          </svg>
          <span className="sr-only">Toggle list</span>
        </button>
        {/* ... existing tooltips ... */}

        {/* --- Ordered List Button (No Change) --- */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type="button"
          data-tooltip-target="tooltip-ordered-list"
          className={`p-1.5 rounded-sm cursor-pointer ${
            editor.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-800" : ""
          } text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
          </svg>
          <span className="sr-only">Toggle ordered list</span>
        </button>
        {/* ... existing tooltips ... */}

        
        <div
          id="tooltip-task-list"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
        >
          Toggle task list
        </div>

        {/* --- Blockquote Button (No Change) --- */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type="button"
          data-tooltip-target="tooltip-blockquote-list"
          className={`p-1.5 rounded-sm cursor-pointer ${
            editor.isActive("blockquote") ? "bg-gray-200 dark:bg-gray-800" : ""
          } text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
          </svg>
          <span className="sr-only">Toggle blockquote</span>
        </button>
        {/* ... existing tooltips ... */}

        {/* --- Horizontal Rule Button (No Change) --- */}
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          type="button"
          data-tooltip-target="tooltip-hr-list"
          className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 12h14"/>
          </svg>
          <span className="sr-only">Toggle Horizontal Rule</span>
        </button>
        {/* ... existing tooltips ... */}

        <div className="px-1">
          <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
        </div>
      </div>
    </div>
  );
};

export default StructureTools;