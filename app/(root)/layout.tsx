"use client";
import React, { ReactNode, useState } from "react";
// import { X, Menu } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode; // This will accept children to render in the main content area
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // State to handle sidebar toggle

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
  };

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar (fixed on the left) */}
      <DashboardSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex-grow p-4 overflow-auto transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`} // Add margin-left when sidebar is open
      >
        {/* Mobile hamburger menu */}
        <div className="lg:hidden flex items-center p-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-900 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Main content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
