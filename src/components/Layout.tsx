import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppStore } from '../store';

const Layout: React.FC = () => {
  const { isAuthenticated, darkMode } = useAppStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        
        <main className={`flex-1 p-6 ${isAuthenticated ? 'ml-64' : ''} ${darkMode ? 'text-white' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;