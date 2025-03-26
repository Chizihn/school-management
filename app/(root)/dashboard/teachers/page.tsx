// components/AllTeachersPage.js
"use client";
import React, { useEffect } from "react";
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

const AllTeachersPage = () => {
  const { teachers, loading, error, fetchTeachers } = useTeacherStore();

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

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
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllTeachersPage;
