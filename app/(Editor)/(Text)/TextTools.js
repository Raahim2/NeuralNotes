import React from 'react';

const TextTools = ({editor}) => {

    const FONT_SIZES = ['12px', '14px', '16px', '18px', '24px', '36px'];
    const FONT_FAMILIES = [
      { name: 'Default', value: 'Inter, ui-sans-serif' },
      { name: 'Arial', value: 'Arial, sans-serif' },
      { name: 'Courier New', value: "'Courier New', monospace" },
      { name: 'Georgia', value: 'Georgia, serif' },
      { name: 'Lucida Sans Unicode', value: "'Lucida Sans Unicode', sans-serif" },
      { name: 'Tahoma', value: 'Tahoma, sans-serif' },
      { name: 'Times New Roman', value: "'Times New Roman', serif" },
      { name: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
      { name: 'Verdana', value: 'Verdana, sans-serif' },
    ];
    const COLORS = ['#1A56DB', '#0E9F6E', '#FACA15', '#F05252', '#FF8A4C', '#0694A2', '#B4C6FC', '#8DA2FB', '#5145CD', '#771D1D', '#FCD9BD', '#99154B', '#7E3AF2', '#CABFFD', '#D61F69', '#F8B4D9', '#F6C196', '#A4CAFE', '#B43403', '#FCE96A', '#1E429F', '#768FFD', '#BCF0DA', '#EBF5FF', '#16BDCA', '#E74694', '#83B0ED', '#03543F', '#111928', '#4B5563', '#6B7280', '#D1D5DB', '#F3F4F6'];


    return (
        <div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                        {/* Text Size Dropdown */}
                        <button
                            id="toggleTextSizeButton"
                            data-dropdown-toggle="textSizeDropdown"
                            type="button"
                            data-tooltip-target="tooltip-text-size"
                            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"/>
                            </svg>
                            <span className="sr-only">Text size</span>
                        </button>
                        <div id="tooltip-text-size" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                           Text size
                           <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <div id="textSizeDropdown" className="z-10 hidden w-72 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700">
                           <ul className="space-y-1 text-sm font-medium" aria-labelledby="toggleTextSizeButton">
                                {FONT_SIZES.map(size => (
                                    <li key={size}>
                                        <button
                                            type="button"
                                            onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: size }).run()}
                                            className="flex justify-between items-center w-full rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                                            style={{ fontSize: size }}
                                        >
                                            {size}
                                        </button>
                                    </li>
                                ))}
                           </ul>
                        </div>
                        
                        {/* Text Color Dropdown */}
                        <button id="toggleTextColorButton" data-dropdown-toggle="textColorDropdown" type="button" data-tooltip-target="tooltip-text-color" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z"/>
                        </svg>
                            <span className="sr-only">Text color</span>
                        </button>
                        <div id="tooltip-text-color" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                           Text color
                           <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <div id="textColorDropdown" className="z-10 hidden w-48 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700">
                           <div className="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input type="color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="border-gray-200 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-md p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 w-full h-8 col-span-3" />
                                <label htmlFor="color" className="text-gray-500 dark:text-gray-400 text-sm font-medium col-span-3 group-hover:text-gray-900 dark:group-hover:text-white">Pick</label>
                           </div>
                           <div className="grid grid-cols-6 gap-1 mb-3">
                                {COLORS.map(color => (
                                    <button key={color} type="button" onClick={() => editor.chain().focus().setColor(color).run()} style={{ backgroundColor: color }} className="w-6 h-6 rounded-md"><span className="sr-only">{color}</span></button>
                                ))}
                           </div>
                           <button type="button" onClick={() => editor.chain().focus().unsetColor().run()} className="py-1.5 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white w-full dark:hover:bg-gray-600">Reset color</button>
                        </div>

                        {/* Font Family Dropdown */}
                        <button id="toggleFontFamilyButton" data-dropdown-toggle="fontFamilyDropdown" type="button" data-tooltip-target="tooltip-font-family" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z"/>
                            </svg>
                            <span className="sr-only">Font family</span>
                        </button>
                        <div id="tooltip-font-family" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                           Font Family
                           <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <div id="fontFamilyDropdown" className="z-10 hidden w-48 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700">
                           <ul className="space-y-1 text-sm font-medium" aria-labelledby="toggleFontFamilyButton">
                                {FONT_FAMILIES.map(font => (
                                    <li key={font.name}>
                                        <button type="button" onClick={() => editor.chain().focus().setFontFamily(font.value).run()} className="flex justify-between items-center w-full text-sm rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: font.value }}>{font.name}</button>
                                    </li>
                                ))}
                           </ul>
                        </div>
                        
                        <div className="px-1">
                            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                        </div>

                    </div>
        </div>
    );
};

export default TextTools;
