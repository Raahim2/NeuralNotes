import React from 'react';

// Importing icons from the react-icons library
import {
  FiFile,
  FiChevronDown,
  FiDownload,
} from 'react-icons/fi';
import { FaUndo, FaRedo, FaCrown } from 'react-icons/fa';
// CORRECTED: Replaced LuMousePointerSparkles with the correct LuMousePointer
import { LuMousePointer } from 'react-icons/lu'; 
import { IoCloudDoneOutline } from 'react-icons/io5';
import { BsLightningFill } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Section: Logo and File Menu */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <BsLightningFill className="text-2xl text-blue-600" />

        {/* File Dropdown */}
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
          <FiFile className="text-gray-600" />
          <span className="text-sm font-medium">File</span>
          <FiChevronDown className="text-gray-500" />
        </button>
      </div>

      {/* Center Section: Tools and Save Status */}
      <div className="flex items-center gap-2">
        {/* Selection Tool (Active State) */}
        <button className="p-2 rounded-md bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-200">
          {/* CORRECTED: Using the correct icon component */}
          <LuMousePointer className="text-lg text-black" />
        </button>
        
        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        {/* Undo / Redo */}
        <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <FaUndo className="text-lg text-gray-500" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <FaRedo className="text-lg text-gray-500" />
        </button>
        
        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        {/* Saved Status */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <IoCloudDoneOutline className="text-xl" />
          <span>Saved</span>
        </div>
      </div>

      {/* Right Section: Export and User Profile */}
      <div className="flex items-center gap-4">
        {/* Export Button */}
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
          <span className="text-sm font-medium">Export</span>
          <FiDownload className="text-gray-600" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" // Using a placeholder avatar
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          {/* Crown Icon overlay */}
          <div className="absolute -top-1 -right-1 bg-white rounded-full p-px shadow-sm">
            <FaCrown className="text-yellow-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;