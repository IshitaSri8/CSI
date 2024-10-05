import React from 'react';
import { Outlet } from 'react-router-dom';
import CitySidebar from './CitySidebar';

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar is fixed here */}
      <div className="fixed h-screen">
        <CitySidebar />
      </div>
      {/* Main content will change based on routing */}
      <div className="ml-12 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
