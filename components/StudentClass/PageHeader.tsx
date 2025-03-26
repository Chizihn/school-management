import React from "react";
import { Button } from "@/components/ui/button";
import { Book, UserPlus } from "lucide-react";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <div className="flex gap-3 mt-4 md:mt-0">
      <Button variant="outline" className="flex items-center gap-2">
        <Book size={16} />
        Add Class
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <UserPlus size={16} className="mr-2" />
        Add Student
      </Button>
    </div>
  </div>
);
