import { ChevronLeft } from "lucide-react";
import React, { JSX } from "react";
import { Button } from "./ui/button";
import { tree } from "next/dist/build/templates/app-page";

interface PageHeaderProps {
  title: string;
  component?: JSX.Element;
  showTitle?: boolean;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  component,
  showTitle = tree,
  onBack,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
        </div>
        {showTitle && (
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        )}
        {component}
      </div>
    </>
  );
};

export default PageHeader;
