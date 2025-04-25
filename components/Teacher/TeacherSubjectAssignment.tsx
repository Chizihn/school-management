import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TEACHERS, GET_SUBJECTS } from "../../graphql/queries/queries";
import { ASSIGN_SUBJECT_TO_TEACHER, REMOVE_SUBJECT_FROM_TEACHER } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const TeacherSubjectAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const { data: teachersData, loading: teachersLoading, error: teachersError, refetch: refetchTeachers } = useQuery(GET_TEACHERS);
  const { data: subjectsData, loading: subjectsLoading, error: subjectsError } = useQuery(GET_SUBJECTS);
  
  const [assignSubjectToTeacher] = useMutation(ASSIGN_SUBJECT_TO_TEACHER, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Subject assigned to teacher successfully",
      });
      refetchTeachers();
      setIsAssignDialogOpen(false);
      setSelectedTeacher("");
      setSelectedSubject("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [removeSubjectFromTeacher] = useMutation(REMOVE_SUBJECT_FROM_TEACHER, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Subject removed from teacher successfully",
      });
      refetchTeachers();
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
    if (!selectedTeacher || !selectedSubject) {
      toast({
        title: "Error",
        description: "Please select both a teacher and a subject",
        variant: "destructive",
      });
      return;
    }

    assignSubjectToTeacher({
      variables: {
        teacherId: selectedTeacher,
        subjectId: selectedSubject,
      },
    });
  };

  const handleRemove = (teacherId: string, subjectId: string) => {
    if (confirm("Are you sure you want to remove this subject from the teacher?")) {
      removeSubjectFromTeacher({
        variables: {
          teacherId,
          subjectId,
        },
      });
    }
  };

  if (teachersLoading || subjectsLoading) return <div>Loading...</div>;
  if (teachersError) return <div>Error loading teachers: {teachersError.message}</div>;
  if (subjectsError) return <div>Error loading subjects: {subjectsError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Teacher-Subject Assignment</CardTitle>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>Assign Subject to Teacher</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Subject to Teacher</DialogTitle>
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
                <label htmlFor="subject">Select Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsData?.getSubjects.map((subject: any) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
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
              <TableHead>Teacher</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assigned Subjects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachersData?.getTeachers.map((teacher: any) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.firstName} {teacher.lastName}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  {teacher.subjects && teacher.subjects.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {teacher.subjects.map((subject: any) => (
                        <li key={subject.id} className="flex items-center justify-between">
                          <span>{subject.name} ({subject.code})</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemove(teacher.id, subject.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No subjects assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedTeacher(teacher.id);
                      setIsAssignDialogOpen(true);
                    }}
                  >
                    Assign Subject
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

export default TeacherSubjectAssignment;