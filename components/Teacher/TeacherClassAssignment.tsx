import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TEACHERS, GET_CLASSES } from "../../graphql/queries/queries";
import { ASSIGN_TEACHER_TO_CLASS, REMOVE_TEACHER_FROM_CLASS } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const TeacherClassAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");

  const { data: teachersData, loading: teachersLoading, error: teachersError } = useQuery(GET_TEACHERS);
  const { data: classesData, loading: classesLoading, error: classesError, refetch: refetchClasses } = useQuery(GET_CLASSES);
  
  const [assignTeacherToClass] = useMutation(ASSIGN_TEACHER_TO_CLASS, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Teacher assigned to class successfully",
      });
      refetchClasses();
      setIsAssignDialogOpen(false);
      setSelectedTeacher("");
      setSelectedClass("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [removeTeacherFromClass] = useMutation(REMOVE_TEACHER_FROM_CLASS, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Teacher removed from class successfully",
      });
      refetchClasses();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAssign = () => {
    if (!selectedTeacher || !selectedClass) {
      toast({
        title: "Error",
        description: "Please select both a teacher and a class",
        variant: "destructive",
      });
      return;
    }

    assignTeacherToClass({
      variables: {
        teacherId: selectedTeacher,
        classId: selectedClass,
      },
    });
  };

  const handleRemove = (classId: string, teacherId: string) => {
    if (confirm("Are you sure you want to remove this teacher from the class?")) {
      removeTeacherFromClass({
        variables: {
          classId,
          teacherId,
        },
      });
    }
  };

  if (teachersLoading || classesLoading) return <div>Loading...</div>;
  if (teachersError) return <div>Error loading teachers: {teachersError.message}</div>;
  if (classesError) return <div>Error loading classes: {classesError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Teacher-Class Assignment</CardTitle>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>Assign Teacher to Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Teacher to Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="teacher">Select Teacher</label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachersData?.getTeachers.map((teacher: any) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="class">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classesData?.getClasses.map((classItem: any) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name} ({classItem.level})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAssign}>Assign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Assigned Teachers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classesData?.getClasses.map((classItem: any) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.level}</TableCell>
                <TableCell>
                  {classItem.teachers && classItem.teachers.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {classItem.teachers.map((teacher: any) => (
                        <li key={teacher.id} className="flex items-center justify-between">
                          <span>{teacher.firstName} {teacher.lastName}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemove(classItem.id, teacher.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No teachers assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedClass(classItem.id);
                      setIsAssignDialogOpen(true);
                    }}
                  >
                    Assign Teacher
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeacherClassAssignment;