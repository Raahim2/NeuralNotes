import React from 'react';

const AlignTools = ({editor}) => {

    return (
        
            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                        {/* Align Left */}
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            data-tooltip-target="tooltip-left-align"
                            className={`p-1.5 rounded-sm cursor-pointer ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-800' : ''} text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6h8m-8 4h12M6 14h8m-8 4h12"/>
                            </svg>
                            <span className="sr-only">Align left</span>
                        </button>
                        <div id="tooltip-left-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                            Align left
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>

                        {/* Align Center */}
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            data-tooltip-target="tooltip-center-align"
                            className={`p-1.5 rounded-sm cursor-pointer ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-800' : ''} text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
                        >
                           <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
                            </svg>
                            <span className="sr-only">Align center</span>
                        </button>
                        <div id="tooltip-center-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                            Align center
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>

                        {/* Align Right */}
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            data-tooltip-target="tooltip-right-align"
                            className={`p-1.5 rounded-sm cursor-pointer ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-800' : ''} text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
                        >
                            <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6h-8m8 4H6m12 4h-8m8 4H6"/>
                            </svg>
                            <span className="sr-only">Align right</span>
                        </button>
                         <div id="tooltip-right-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                            Align right
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>

                            <div className="px-1">
                            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                        </div>

                        



        </div>
    );
};

export default AlignTools;
