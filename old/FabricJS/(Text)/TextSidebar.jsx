// (Text)/TextSidebar.jsx

"use client";

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMagic } from 'react-icons/fa';
import { CgCollage } from 'react-icons/cg';
import { FaCrown } from 'react-icons/fa';

// 1. Accept the `onAddText` prop
const TextSidebar = ({ onAddText }) => {
  // A safety check to ensure the function exists before calling it
  const handleAdd = (type) => {
    if (onAddText) {
      onAddText(type);
    } else {
      console.warn('onAddText prop was not provided to TextSidebar');
    }
  };

  return (
    <div className="w-80 h-full bg-white p-4 shadow-lg overflow-y-auto text-gray-800 space-y-4 border-r">
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search fonts and combinations"
          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 2. Add onClick handlers to call the prop function with a specific identifier */}
      <button 
        onClick={() => handleAdd('textbox')}
        className="w-full flex items-center justify-center gap-2 bg-[#8d33ff] text-white font-semibold py-2.5 rounded-lg hover:bg-[#7b29e0] transition-colors"
      >
        <span className="text-xl font-bold align-middle">T</span>
        Add a text box
      </button>

      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
        <FaMagic size={18} />
        Magic Write
      </button>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CgCollage size={20} />
            <h2 className="font-semibold">Brand Kit</h2>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 cursor-pointer hover:text-black">
            <span>Edit</span>
            <FaCrown className="text-yellow-500" />
          </div>
        </div>
        <button className="w-full bg-white border border-gray-300 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Add your brand fonts
        </button>
      </div>
      
      <div className="pt-2">
        <h3 className="font-semibold mb-3">Default text styles</h3>
        <div className="space-y-2">
          <button 
            onClick={() => handleAdd('heading')}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-bold text-3xl">Add a heading</span>
          </button>
          <button 
            onClick={() => handleAdd('subheading')}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-xl">Add a subheading</span>
          </button>
          <button 
            onClick={() => handleAdd('body')}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm">Add a little bit of body text</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextSidebar;