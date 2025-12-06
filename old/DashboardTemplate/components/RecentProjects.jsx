// components/RecentProjects.js
"use client"
import { PlusIcon } from "@heroicons/react/24/solid";
import ProjectCard from "./ProjectCard";

const mockProjects = [
  {
    id: 1,
    name: "Q4 Marketing Strategy",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    lastEdited: "2 hours ago",
    sharedWith: [
      { name: 'User 1', avatarUrl: 'https://i.pravatar.cc/32?u=1' },
      { name: 'User 2', avatarUrl: 'https://i.pravatar.cc/32?u=2' },
    ],
  },
  {
    id: 2,
    name: "New User Flow Diagram",
    imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    lastEdited: "1 day ago",
    sharedWith: [
      { name: 'User 3', avatarUrl: 'https://i.pravatar.cc/32?u=3' },
    ],
  },
  {
    id: 3,
    name: "Onboarding UI Mockup",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    lastEdited: "3 days ago",
    sharedWith: [
       { name: 'User 1', avatarUrl: 'https://i.pravatar.cc/32?u=1' },
       { name: 'User 4', avatarUrl: 'https://i.pravatar.cc/32?u=4' },
       { name: 'User 5', avatarUrl: 'https://i.pravatar.cc/32?u=5' },
    ],
  },
  {
    id: 4,
    name: "Blank Project",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    lastEdited: "5 days ago",
    sharedWith: [],
  }
];

export default function RecentProjects() {
  return (
    <div className="p-6 sm:p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Recent Projects</h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}