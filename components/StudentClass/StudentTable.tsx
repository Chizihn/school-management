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
  const [currentPage, setCurrentPage] = useState(1);

  const renderContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center">
            <div className="py-4 text-gray-500">Loading students...</div>
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

    return students.map((student) => (
      <TableRow key={student.id} className="hover:bg-gray-50">
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Student</DropdownMenuItem>
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
    <div>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead className="w-[200px]">Admission Date</TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderContent()}</TableBody>
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
    </div>
  );
};
