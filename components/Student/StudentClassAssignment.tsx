import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STUDENTS, GET_CLASSES, GET_SESSIONS } from "../../graphql/queries/queries";
import { ASSIGN_STUDENT_TO_CLASS, REMOVE_STUDENT_FROM_CLASS } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const StudentClassAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");

  const { data: studentsData, loading: studentsLoading, error: studentsError, refetch: refetchStudents } = useQuery(GET_STUDENTS);
  const { data: classesData, loading: classesLoading, error: classesError } = useQuery(GET_CLASSES);
  const { data: sessionsData, loading: sessionsLoading, error: sessionsError } = useQuery(GET_SESSIONS);
  
  const [assignStudentToClass] = useMutation(ASSIGN_STUDENT_TO_CLASS, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Student assigned to class successfully",
      });
      refetchStudents();
      setIsAssignDialogOpen(false);
      setSelectedStudent("");
      setSelectedClass("");
      setSelectedSession("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [removeStudentFromClass] = useMutation(REMOVE_STUDENT_FROM_CLASS, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Student removed from class successfully",
      });
      refetchStudents();
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
    if (!selectedStudent || !selectedClass || !selectedSession) {
      toast({
        title: "Error",
        description: "Please select a student, class, and session",
        variant: "destructive",
      });
      return;
    }

    assignStudentToClass({
      variables: {
        studentId: selectedStudent,
        classId: selectedClass,
        sessionId: selectedSession,
      },
    });
  };

  const handleRemove = (studentId: string, classId: string, sessionId: string) => {
    if (confirm("Are you sure you want to remove this student from the class?")) {
      removeStudentFromClass({
        variables: {
          studentId,
          classId,
          sessionId,
        },
      });
    }
  };

  if (studentsLoading || classesLoading || sessionsLoading) return <div>Loading...</div>;
  if (studentsError) return <div>Error loading students: {studentsError.message}</div>;
  if (classesError) return <div>Error loading classes: {classesError.message}</div>;
  if (sessionsError) return <div>Error loading sessions: {sessionsError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Student-Class Assignment</CardTitle>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>Assign Student to Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Student to Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="student">Select Student</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentsData?.getStudents.map((student: any) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} ({student.regNo})
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
              <div className="space-y-2">
                <label htmlFor="session">Select Session</label>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionsData?.getSessions.map((session: any) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.year} {session.isActive ? "(Active)" : ""}
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
              <TableHead>Student</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Current Class</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData?.getStudents.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell>{student.firstName} {student.lastName}</TableCell>
                <TableCell>{student.regNo}</TableCell>
                <TableCell>
                  {student.currentClass ? (
                    <span>
                      {student.currentClass.name} ({student.currentClass.level})
                    </span>
                  ) : (
                    <span className="text-gray-500">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedStudent(student.id);
                        setIsAssignDialogOpen(true);
                      }}
                    >
                      Assign to Class
                    </Button>
                    {student.currentClass && (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleRemove(
                          student.id, 
                          student.currentClass.id, 
                          sessionsData?.getSessions.find((s: any) => s.isActive)?.id || ""
                        )}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentClassAssignment;