import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen w-full flex-col bg-gray-900">
      <div className="w-full">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="sm:p-6">
          <HeaderAdmin toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
