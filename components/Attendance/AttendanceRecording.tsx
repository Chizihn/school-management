import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLASSES, GET_STUDENTS, GET_SESSIONS } from "../../graphql/queries/queries";
import { RECORD_ATTENDANCE } from "../../graphql/mutations/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const AttendanceRecording = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [attendanceDate, setAttendanceDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, { status: string; comment: string }>>({});

  const { data: classesData, loading: classesLoading, error: classesError } = useQuery(GET_CLASSES);
  const { data: sessionsData, loading: sessionsLoading, error: sessionsError } = useQuery(GET_SESSIONS);
  const { data: studentsData, loading: studentsLoading, error: studentsError } = useQuery(GET_STUDENTS, {
    variables: { classId: selectedClass },
    skip: !selectedClass,
  });

  const [recordAttendance] = useMutation(RECORD_ATTENDANCE);

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
  };

  const handleCommentChange = (studentId: string, comment: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], comment },
    }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSession || !attendanceDate) {
      toast({
        title: "Error",
        description: "Please select class, session, and date",
        variant: "destructive",
      });
      return;
    }

    const studentIds = Object.keys(attendanceRecords);
    if (studentIds.length === 0) {
      toast({
        title: "Error",
        description: "No attendance records to submit",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const studentId of studentIds) {
        const record = attendanceRecords[studentId];
        if (!record.status) continue;

        await recordAttendance({
          variables: {
            input: {
              studentId,
              classId: selectedClass,
              sessionId: selectedSession,
              date: attendanceDate,
              status: record.status,
              comment: record.comment || "",
            },
          },
        });
      }

      toast({
        title: "Success",
        description: "Attendance recorded successfully",
      });
      
      // Reset form
      setAttendanceRecords({});
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (classesLoading || sessionsLoading) return <div>Loading...</div>;
  if (classesError) return <div>Error loading classes: {classesError.message}</div>;
  if (sessionsError) return <div>Error loading sessions: {sessionsError.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Record Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="class">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
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
              <label htmlFor="session">Session</label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
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
            <div className="space-y-2">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {studentsLoading ? (
          <div>Loading students...</div>
        ) : studentsError ? (
          <div>Error loading students: {studentsError.message}</div>
        ) : studentsData?.getStudents.length === 0 ? (
          <div>No students found in this class</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Registration Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData?.getStudents.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                    <TableCell>{student.regNo}</TableCell>
                    <TableCell>
                      <RadioGroup
                        value={attendanceRecords[student.id]?.status || ""}
                        onValueChange={(value) => handleStatusChange(student.id, value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PRESENT" id={`present-${student.id}`} />
                          <Label htmlFor={`present-${student.id}`}>Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ABSENT" id={`absent-${student.id}`} />
                          <Label htmlFor={`absent-${student.id}`}>Absent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="LATE" id={`late-${student.id}`} />
                          <Label htmlFor={`late-${student.id}`}>Late</Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Optional comment"
                        value={attendanceRecords[student.id]?.comment || ""}
                        onChange={(e) => handleCommentChange(student.id, e.target.value)}
                        className="h-10"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6">
              <Button onClick={handleSubmit}>Submit Attendance</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceRecording;