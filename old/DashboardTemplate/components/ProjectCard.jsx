// components/ProjectCard.js
"use client"
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

export default function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <a href="#" className="absolute inset-0 z-10" aria-label={`View ${project.name}`}>
        {/* This is the clickable link overlay */}
      </a>

      {/* Image Preview Area */}
      <div className="aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={`Preview of ${project.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800">
            {project.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Edited {project.lastEdited}
          </p>
        </div>

        {/* Card Footer with Avatars */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.sharedWith.map((user) => (
              <img
                key={user.name}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                src={user.avatarUrl}
                alt={user.name}
                title={user.name}
              />
            ))}
          </div>
          
          {/* Options Button */}
          <div className="relative z-20">
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent the link from firing
                alert(`Options for ${project.name}`);
              }}
              className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}