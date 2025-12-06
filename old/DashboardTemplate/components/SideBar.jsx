import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: FolderIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

export default function Sidebar() {
  return (
     <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              {/* Your Logo */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-auto text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662v.512a48.678 48.678 0 007.324 0v-.512z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12v.512a48.678 48.678 0 01-7.324 0v-.512a48.678 48.678 0 017.324 0z" />
              </svg>
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
               <div className="mt-auto">
                <div className="px-2">
                  <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="teams-headline">
                    Your teams
                  </h3>
                  <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                    {teams.map((team) => (
                      <a
                        key={team.name}
                        href={team.href}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full" aria-hidden="true" />
                        <span className="truncate">{team.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <nav className="px-2 mt-6">
                    <a
                      href="#"
                      className='group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    >
                      <CogIcon
                        className='text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 flex-shrink-0'
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                </nav>
              </div>
            </div>
          </div>
  );
}