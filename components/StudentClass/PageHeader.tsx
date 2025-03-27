import React from "react";
import { Button } from "@/components/ui/button";
import { Book, UserPlus } from "lucide-react";
import { useModalStore } from "@/store/useModal";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { openAddStudentModal, openAddClassModal } = useModalStore();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => openAddClassModal()}
          >
            <Book size={16} />
            Add Class
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openAddStudentModal()}
          >
            <UserPlus size={16} className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
