// components/AllTeachersPage.js
"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTeacherStore } from "@/store/useTeacher";
import { PageLoading } from "@/components/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CenterModal from "@/components/modals/CenterModal";
import EditTeacherPage from "@/components/Teacher/EditTeacher";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { toast } from "react-toastify";
import Link from "next/link";

const AllTeachersPage = () => {
  const { teachers, loading, error, fetchTeachers, deleteTeacher } =
    useTeacherStore();

  const [deleting, setDeleting] = useState<boolean>(false);

  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );

  //For the edit teacher modal
  const [editTeacher, setEditTeacher] = useState<boolean>(false);

  //For the remove teacher confirm modal
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  function getTeacher() {
    return teachers.find((t) => t.id === selectedTeacherId);
  }

  const handleRemoveTeacher = async (id: string) => {
    setDeleting(true);
    const success = await deleteTeacher(id);
    if (success) {
      toast.success("Teacher remved successfully");
    }
  };

  if (loading) return <PageLoading />;

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );

  if (!loading && !teachers)
    return (
      <div>
        <p>No teacher found</p>
      </div>
    );
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search teachers..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers?.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                    <TableCell>
                      {teacher.subjects?.map((sub) => sub.name).join(", ")}
                    </TableCell>
                    <TableCell>
                      {teacher.classes?.map((cls) => cls.name).join(", ")}
                    </TableCell>
                    <TableCell>{teacher.createdAt}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="cursor-pointer"
                          align="end"
                        >
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/teachers/${teacher.id}`}
                              className="w-full"
                            >
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedTeacherId(teacher.id as string);
                              setEditTeacher(true);
                            }}
                          >
                            Edit Teacher
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTeacherId(teacher.id as string);
                              setOpenModal(true);
                            }}
                            className="text-red-600 cursor-pointer"
                          >
                            Remove Teacher
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <CenterModal
        isOpen={editTeacher}
        setIsOpen={() => setEditTeacher(false)}
        title="Edit Teacher"
      >
        <EditTeacherPage id={selectedTeacherId as string} />
      </CenterModal>

      <ConfirmationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirm"
        description={
          <>
            Are you sure you want to remove{" "}
            <strong>{getTeacher()?.firstName}</strong>{" "}
            <strong>{getTeacher()?.lastName}</strong> as a teacher?
          </>
        }
        confirmText="Yes, remove"
        cancelText="Cancel"
        isLoading={deleting}
        onConfirm={() => handleRemoveTeacher(selectedTeacherId as string)}
      />
    </>
  );
};

export default AllTeachersPage;
