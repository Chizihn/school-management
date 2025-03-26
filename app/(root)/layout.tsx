"use client";
import React, { ReactNode, useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check screen size and set mobile state
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 1024); // Use lg breakpoint

      // Automatically close sidebar on mobile
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Check initial screen size
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-screen flex relative">
      {/* Sidebar (fixed on the left) */}
      <DashboardSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <main
        className={`
          flex-grow 
          p-4 
          overflow-auto 
          transition-all 
          duration-300 
          bg-white 
          absolute 
          right-0 
          top-0 
          bottom-0 
          ${
            isMobile
              ? isOpen
                ? "left-0 opacity-50 pointer-events-none"
                : "left-0"
              : isOpen
              ? "left-64"
              : "left-0"
          }
        `}
      >
        {/* Mobile hamburger menu */}
        <div className="lg:hidden flex items-center p-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-900 text-white bg-blue-600"
          >
            {isOpen ? (
              <span className="absolute top-10 right-10 text-white z-[1002] cursor-pointer">
                <X size={28} />
              </span>
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Main content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
