import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLASSES, GET_SUBJECTS } from "../../graphql/queries/queries";
import {
  ASSIGN_SUBJECT_TO_CLASS,
  REMOVE_SUBJECT_FROM_CLASS,
} from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Class, Subject } from "@/types/school";

const ClassSubjectAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const {
    data: classesData,
    loading: classesLoading,
    error: classesError,
    refetch: refetchClasses,
  } = useQuery(GET_CLASSES);
  const {
    data: subjectsData,
    loading: subjectsLoading,
    error: subjectsError,
  } = useQuery(GET_SUBJECTS);

  const [assignSubjectToClass] = useMutation(ASSIGN_SUBJECT_TO_CLASS, {
    onCompleted: () => {
      toast.success("Subject assigned to class successfully");
      refetchClasses();
      setIsAssignDialogOpen(false);
      setSelectedClass("");
      setSelectedSubject("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [removeSubjectFromClass] = useMutation(REMOVE_SUBJECT_FROM_CLASS, {
    onCompleted: () => {
      toast.success("Subject removed from class successfully");
      refetchClasses();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAssign = () => {
    if (!selectedClass || !selectedSubject) {
      toast.warn("Please select both a class and a subject");
      return;
    }

    assignSubjectToClass({
      variables: {
        classId: selectedClass,
        subjectId: selectedSubject,
      },
    });
  };

  const handleRemove = (classId: string, subjectId: string) => {
    if (
      confirm("Are you sure you want to remove this subject from the class?")
    ) {
      removeSubjectFromClass({
        variables: {
          classId,
          subjectId,
        },
      });
    }
  };

  if (classesLoading || subjectsLoading) return <div>Loading...</div>;
  if (classesError)
    return <div>Error loading classes: {classesError.message}</div>;
  if (subjectsError)
    return <div>Error loading subjects: {subjectsError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Class-Subject Assignment</CardTitle>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>Assign Subject to Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Subject to Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="class">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classesData?.getClasses.map((classItem: Class) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name} ({classItem.level})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject">Select Subject</label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsData?.getSubjects.map((subject: Subject) => (
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
              <TableHead>Class</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Assigned Subjects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classesData?.getClasses.map((classItem: Class) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.level}</TableCell>
                <TableCell>
                  {classItem.subjects && classItem.subjects.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {classItem.subjects.map((subject: Subject) => (
                        <li
                          key={subject.id}
                          className="flex items-center justify-between"
                        >
                          <span>
                            {subject.name} ({subject.code})
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemove(classItem.id, subject.id)
                            }
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
                      setSelectedClass(classItem.id);
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

export default ClassSubjectAssignment;
