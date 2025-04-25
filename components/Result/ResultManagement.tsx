import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_STUDENTS,
  GET_SUBJECTS,
  GET_SESSIONS,
} from "../../graphql/queries/queries";
import { RECORD_ASSESSMENT } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

const resultSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  subjectId: z.string().min(1, "Subject is required"),
  sessionId: z.string().min(1, "Session is required"),
  term: z.string().min(1, "Term is required"),
  ca1: z.coerce
    .number()
    .min(0, "CA1 must be at least 0")
    .max(20, "CA1 must be at most 20"),
  ca2: z.coerce
    .number()
    .min(0, "CA2 must be at least 0")
    .max(20, "CA2 must be at most 20"),
  exam: z.coerce
    .number()
    .min(0, "Exam must be at least 0")
    .max(60, "Exam must be at most 60"),
});

type ResultFormValues = z.infer<typeof resultSchema>;

const ResultManagement = () => {
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const {
    data: sessionsData,
    loading: sessionsLoading,
    error: sessionsError,
  } = useQuery(GET_SESSIONS);
  const {
    data: subjectsData,
    loading: subjectsLoading,
    error: subjectsError,
  } = useQuery(GET_SUBJECTS);
  const {
    data: studentsData,
    loading: studentsLoading,
    error: studentsError,
    refetch: refetchStudents,
  } = useQuery(GET_STUDENTS, {
    variables: {
      classId: selectedClassId,
      sessionId: form.watch("sessionId") || "",
    },
    skip: !selectedClassId || !form.watch("sessionId"),
  });

  const [recordAssessment] = useMutation(RECORD_ASSESSMENT, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Assessment recorded successfully",
      });
      setIsRecordDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<ResultFormValues>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      studentId: "",
      subjectId: "",
      sessionId: "",
      term: "",
      ca1: 0,
      ca2: 0,
      exam: 0,
    },
  });

  const onSubmit = (values: ResultFormValues) => {
    recordAssessment({
      variables: {
        input: values,
      },
    });
  };

  if (sessionsLoading || subjectsLoading) return <div>Loading...</div>;
  if (sessionsError)
    return <div>Error loading sessions: {sessionsError.message}</div>;
  if (subjectsError)
    return <div>Error loading subjects: {subjectsError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Result Management</CardTitle>
        <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
          <DialogTrigger asChild>
            <Button>Record Assessment</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record Student Assessment</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="sessionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Session</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sessionsData?.getSessions.map((session: any) => (
                            <SelectItem key={session.id} value={session.id}>
                              {session.year}{" "}
                              {session.isActive ? "(Active)" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FIRST">First Term</SelectItem>
                          <SelectItem value="SECOND">Second Term</SelectItem>
                          <SelectItem value="THIRD">Third Term</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <label htmlFor="class">Class</label>
                  <Select
                    value={selectedClassId}
                    onValueChange={setSelectedClassId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectsData?.getSubjects
                        .flatMap((subject: any) =>
                          subject.classes?.map((classItem: any) => ({
                            id: classItem.id,
                            name: classItem.name,
                            level: classItem.level,
                          }))
                        )
                        .filter(
                          (classItem: any, index: number, self: any[]) =>
                            classItem &&
                            index ===
                              self.findIndex(
                                (c: any) => c?.id === classItem?.id
                              )
                        )
                        .map(
                          (classItem: any) =>
                            classItem && (
                              <SelectItem
                                key={classItem.id}
                                value={classItem.id}
                              >
                                {classItem.name} ({classItem.level})
                              </SelectItem>
                            )
                        )}
                    </SelectContent>
                  </Select>
                </div>

                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedClassId || studentsLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                studentsLoading
                                  ? "Loading students..."
                                  : "Select student"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {studentsData?.getStudents.map((student: any) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName} (
                              {student.regNo})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectsData?.getSubjects
                            .filter((subject: any) =>
                              subject.classes?.some(
                                (cls: any) => cls.id === selectedClassId
                              )
                            )
                            .map((subject: any) => (
                              <SelectItem key={subject.id} value={subject.id}>
                                {subject.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ca1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CA1 (Max: 20)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ca2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CA2 (Max: 20)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam (Max: 60)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRecordDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View overall performance metrics by class</p>
                <Button variant="outline" className="mt-4">
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Analyze performance across different subjects</p>
                <Button variant="outline" className="mt-4">
                  View Analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View individual student result reports</p>
                <Button variant="outline" className="mt-4">
                  View Results
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Assessments</h3>
            <div className="rounded-md border">
              <div className="p-4">
                <p className="text-center text-muted-foreground">
                  No recent assessments to display
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultManagement;
