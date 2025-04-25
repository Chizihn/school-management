import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Student } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/store/useModal";
import CenterModal from "../modals/CenterModal";
import EditStudentPage from "../Student/EditStudent";
import { FetchLoader } from "../Loader";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  totalStudents?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  loading,
  error,
  totalStudents = 0,
  pageSize = 10,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>("firstName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const {
    isEditStudentModalOpen,
    openEditStudentModal,
    closeEditStudentModal,
  } = useModalStore();

  const handleClose = () => {
    closeEditStudentModal();
    setSelectedStudentId(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort students based on current sort settings
  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const renderContent = (students: Student[]) => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center">
            <FetchLoader />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center text-red-500">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (students.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center text-gray-500">
            No students found
          </TableCell>
        </TableRow>
      );
    }

    return students.map((student, index) => (
      <TableRow key={student.id} className="hover:bg-gray-50">
        <TableCell className="font-medium">{index + 1}</TableCell>

        <TableCell className="font-medium">
          {student.firstName} {student.lastName}
        </TableCell>
        <TableCell>
          {new Date(student.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedStudentId(student.id);
                  openEditStudentModal();
                }}
              >
                Edit Student
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  const totalPages = Math.ceil(totalStudents / pageSize);

  const handlePageChange = (newPage: number) => {
    const sanitizedPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(sanitizedPage);
    onPageChange?.(sanitizedPage);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead
                className="w-[250px] cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                Name{" "}
                {sortField === "firstName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="w-[200px] cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Admission Date{" "}
                {sortField === "createdAt" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderContent(sortedStudents)}</TableBody>
        </Table>
      </div>

      {totalStudents > 0 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalStudents)}{" "}
            to {Math.min(currentPage * pageSize, totalStudents)} of{" "}
            {totalStudents} students
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <CenterModal
        isOpen={isEditStudentModalOpen}
        setIsOpen={handleClose}
        title="Edit Student"
      >
        <EditStudentPage id={selectedStudentId as string} />
      </CenterModal>
    </>
  );
};
