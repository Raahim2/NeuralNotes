import React from 'react';

const TableTools = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
      <div className="px-1">
        <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
      </div>

      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        type="button"
        data-tooltip-target="tooltip-insert-table"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm0 6h16M10 4v16"/>
        </svg>
        <span className="sr-only">Insert Table</span>
      </button>
       <div id="tooltip-insert-table" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Insert Table
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>


      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        type="button"
        data-tooltip-target="tooltip-add-column-before"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4v16m-4-8h4m6 0h4M4 4h16v16H4V4z"/>
        </svg>
        <span className="sr-only">Add Column Before</span>
      </button>
      <div id="tooltip-add-column-before" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Add Column Before
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        type="button"
        data-tooltip-target="tooltip-add-column-after"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4v16m-4-8h4M8 12h4m-4-8h12v16H4V4z"/>
        </svg>
        <span className="sr-only">Add Column After</span>
      </button>
      <div id="tooltip-add-column-after" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Add Column After
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        type="button"
        data-tooltip-target="tooltip-delete-column"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-4-8h8M4 4h16v16H4V4z"/>
        </svg>
        <span className="sr-only">Delete Column</span>
      </button>
      <div id="tooltip-delete-column" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Delete Column
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        type="button"
        data-tooltip-target="tooltip-add-row-before"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M4 4v16h16V4H4zm8 2v4m0 4v4"/>
        </svg>
        <span className="sr-only">Add Row Before</span>
      </button>
      <div id="tooltip-add-row-before" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Add Row Before
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        type="button"
        data-tooltip-target="tooltip-add-row-after"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14h16M4 4v16h16V4H4zm8 2v4m0 4v4"/>
        </svg>
        <span className="sr-only">Add Row After</span>
      </button>
       <div id="tooltip-add-row-after" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Add Row After
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        type="button"
        data-tooltip-target="tooltip-delete-row"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16M4 4v16h16V4H4z"/>
        </svg>
        <span className="sr-only">Delete Row</span>
      </button>
      <div id="tooltip-delete-row" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Delete Row
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        type="button"
        data-tooltip-target="tooltip-delete-table"
        className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm4 4L16 16m-8 0L16 8"/>
        </svg>
        <span className="sr-only">Delete Table</span>
      </button>
      <div id="tooltip-delete-table" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
         Delete Table
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      <div className="px-1">
        <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
      </div>
    </div>
  );
};

export default TableTools;