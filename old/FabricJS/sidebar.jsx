// Sidebar.jsx

import React from 'react';
import { FiImage, FiType, FiSettings } from 'react-icons/fi';
import { LuLayoutTemplate, LuShapes, LuPencil, LuSparkles } from 'react-icons/lu';

// Accept onItemClick and activeItem as props
const Sidebar = ({ onItemClick, activeItem }) => {
  const sidebarItems = [
    { icon: FiType, label: 'Text' },
    { icon: LuLayoutTemplate, label: 'Design' },
    { icon: FiImage, label: 'Image' },
    { icon: LuShapes, label: 'Shapes' },
    { icon: LuPencil, label: 'Draw' },
    { icon: LuSparkles, label: 'AI' },
    { icon: FiSettings, label: 'Settings' },
  ];

  return (
    <aside className="w-24 h-full bg-white flex flex-col items-center py-6 gap-6 border-r border-gray-200 shadow-sm flex-shrink-0">
      {sidebarItems.map((item, index) => {
        // Check if the current item is the active one
        const isActive = activeItem === item.label;

        return (
          <button
            key={index}
            // Call the function passed from the parent with the item's label
            onClick={() => onItemClick(item.label)}
            className={`flex flex-col items-center gap-1 transition-colors group ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`}
            title={item.label}
          >
            <item.icon className={`w-6 h-6 stroke-1 ${isActive ? 'stroke-2' : 'group-hover:stroke-2'}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;