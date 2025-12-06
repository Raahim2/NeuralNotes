"use client";

import React, { useState } from 'react';
import { FiChevronDown, FiCopy, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl } from 'react-icons/fa';

const FONT_FACES = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];

const TextToolbar = ({ properties, onPropertyChange }) => {
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  const toggleBold = () => onPropertyChange('fontWeight', properties.fontWeight === 'bold' ? 'normal' : 'bold');
  const toggleItalic = () => onPropertyChange('fontStyle', properties.fontStyle === 'italic' ? 'normal' : 'italic');
  const toggleUnderline = () => onPropertyChange('underline', !properties.underline);
  const toggleStrikethrough = () => onPropertyChange('linethrough', !properties.linethrough);
  const handleAlignment = (alignment) => onPropertyChange('textAlign', alignment);
  const handleFontSizeChange = (e) => onPropertyChange('fontSize', parseInt(e.target.value, 10) || properties.fontSize);
  const incrementFontSize = () => onPropertyChange('fontSize', properties.fontSize + 1);
  const decrementFontSize = () => onPropertyChange('fontSize', properties.fontSize - 1);
  const handleFontFamily = (font) => {
    onPropertyChange('fontFamily', font);
    setIsFontDropdownOpen(false);
  };
  const toggleBullets = () => onPropertyChange('toggleBullet', true);

  return (
    <div className="bg-white p-2 flex items-center gap-2 border-b border-gray-200 w-full">
      {/* Font Family Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setIsFontDropdownOpen(prev => !prev)}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <span className="text-sm font-medium whitespace-nowrap">{properties.fontFamily}</span>
          <FiChevronDown className="text-gray-500" />
        </button>
        {isFontDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {FONT_FACES.map(font => (
              <button
                key={font}
                onClick={() => handleFontFamily(font)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-6 w-px bg-gray-200"></div>
      
      {/* Font Size */}
      <div className="flex items-center border border-gray-200 rounded-md p-1">
        <button onClick={decrementFontSize} className="px-2 py-1 rounded hover:bg-gray-100"><FiMinus /></button>
        <input 
          type="text" 
          value={properties.fontSize}
          onChange={handleFontSizeChange}
          className="w-10 text-center text-sm font-medium focus:outline-none" 
        />
        <button onClick={incrementFontSize} className="px-2 py-1 rounded hover:bg-gray-100"><FiPlus /></button>
      </div>
      
      <div className="h-6 w-px bg-gray-200"></div>

      {/* Font Style Buttons */}
      <div className="flex items-center">
        <button onClick={toggleBold} className={`p-2 rounded-md ${properties.fontWeight === 'bold' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaBold /></button>
        <button onClick={toggleItalic} className={`p-2 rounded-md ml-1 ${properties.fontStyle === 'italic' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaItalic /></button>
        <button onClick={toggleUnderline} className={`p-2 rounded-md ml-1 ${properties.underline ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaUnderline /></button>
        <button onClick={toggleStrikethrough} className={`p-2 rounded-md ml-1 ${properties.linethrough ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaStrikethrough /></button>
      </div>

      <div className="h-6 w-px bg-gray-200"></div>

      {/* Text Alignment & Bullets */}
      <div className="flex items-center">
        <button onClick={() => handleAlignment('left')} className={`p-2 rounded-md ${properties.textAlign === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaAlignLeft /></button>
        <button onClick={() => handleAlignment('center')} className={`p-2 rounded-md ml-1 ${properties.textAlign === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaAlignCenter /></button>
        <button onClick={() => handleAlignment('right')} className={`p-2 rounded-md ml-1 ${properties.textAlign === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><FaAlignRight /></button>
        <button onClick={toggleBullets} className="p-2 rounded-md ml-1 hover:bg-gray-100"><FaListUl /></button>
      </div>
      
      <div className="h-6 w-px bg-gray-200"></div>

      {/* Other actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-md hover:bg-gray-100"><FiCopy /></button>
        <button className="p-2 rounded-md hover:bg-gray-100"><FiTrash2 /></button>
      </div>
    </div>
  );
};

export default TextToolbar;