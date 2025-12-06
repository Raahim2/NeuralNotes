import React from 'react';

const HistoryTools = ({ editor }) => {
    // It's good practice to return null if the editor instance is not yet available.
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
            {/* Undo Button */}
            <button
                type="button"
                data-tooltip-target="tooltip-undo"
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => editor.chain().focus().undo().run()}
            >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                </svg>
                <span className="sr-only">Undo</span>
            </button>
            <div id="tooltip-undo" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Undo
            </div>

            {/* Redo Button */}
            <button
                type="button"
                data-tooltip-target="tooltip-redo"
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => editor.chain().focus().redo().run()}
            >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"/>
                </svg>
                <span className="sr-only">Redo</span>
            </button>
            <div id="tooltip-redo" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Redo
            </div>
        </div>
    );
};

export default HistoryTools;