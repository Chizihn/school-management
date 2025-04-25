import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => (
  <div className={`p-0 lg:p-3 bg-gray-50 min-h-screen ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </div>
);
