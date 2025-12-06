// components/Layout.js


import EmptyProject from '@/components/EmptyProject';
import Sidebar from '@/components/SideBar';
import Topbar from '@/components/TopBar';
import RecentProjects from '@/components/RecentProjects';


export default function Layout({ children }) {
  return (
    <div className="h-screen w-full ">
      <div className="flex h-full rounded-lg bg-white shadow-sm">
        <div className="flex w-64 flex-col">
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col">
          <Topbar />

          <main className="flex-1 bg-white">
            {/* <EmptyProject/> */}
            <RecentProjects />
          </main>
        </div>
      </div>
    </div>
  );
}