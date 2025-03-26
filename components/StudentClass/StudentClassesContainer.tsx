import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const StudentClassesContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => (
  <div className={`p-6 bg-gray-50 min-h-screen ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </div>
);
