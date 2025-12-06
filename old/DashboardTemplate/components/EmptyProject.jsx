// components/ProjectsPageContent.js
import {
  ArrowRightIcon,
  Bars3Icon,
  CalendarDaysIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const templates = [
  {
    name: 'Create a List',
    description: "Another to-do system you'll but eventually give up on.",
    icon: Bars3Icon,
    bgColor: 'bg-pink-500',
  },
  {
    name: 'Create a Calendar',
    description: "Stay on top of your deadlines, or don't — it's up to you.",
    icon: CalendarDaysIcon,
    bgColor: 'bg-yellow-500',
  },
  {
    name: 'Create a Gallery',
    description: 'Great for mood boards and inspiration.',
    icon: PhotoIcon,
    bgColor: 'bg-green-500',
  },
  {
    name: 'Create a Board',
    description: 'Track tasks in different stages of your project.',
    icon: ViewColumnsIcon,
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Create a Spreadsheet',
    description: 'Lots of numbers and things — good for nerds.',
    icon: TableCellsIcon,
    bgColor: 'bg-indigo-500',
  },
  {
    name: 'Create a Timeline',
    description: 'Get a birds-eye-view of your procrastination.',
    icon: ClockIcon,
    bgColor: 'bg-purple-500',
  },
];

export default function ProjectsPageContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
        <p className="mt-2 text-lg text-gray-600">
          You haven’t created a project yet. Get started by selecting a template or start from an empty project.
        </p>
      </div>

      {/* Template Grid */}
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {templates.map((template) => (
          <a key={template.name} href="#" className="group flex items-start gap-x-6">
            <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg ${template.bgColor}`}>
              <template.icon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center">
                {template.name}
                <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="mt-1 text-sm text-gray-600">{template.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-12">
        <a href="#" className="inline-flex items-center text-base font-semibold text-indigo-600 hover:text-indigo-500">
          Or start from an empty project
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}