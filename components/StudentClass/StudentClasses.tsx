"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import { useStudentStore } from "@/store/useStudent";
import { useClassStore } from "@/store/useClass";
import { useSessionStore } from "@/store/useSession";
import { PageHeader } from "./PageHeader";
import { StudentClassesContainer } from "./StudentClassesContainer";
import { StudentFilters } from "./StudentFilter";
import { StudentTable } from "./StudentTable";
import { ClassCard } from "./ClassCard";

const StudentsClassesPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const {
    classes,
    loading: classesLoading,
    error: classesError,
    fetchClasses,
  } = useClassStore();

  const { sessions, fetchSessions } = useSessionStore();
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const PAGE_SIZE = 10;

  const {
    students,
    setStudents,
    loading: studentsLoading,
    error: studentsError,
    fetchStudents,
  } = useStudentStore();

  // Fetch initial data
  useEffect(() => {
    Promise.all([fetchClasses(), fetchSessions()])
      .then(() => console.log("Initial data fetched"))
      .catch((error) => console.error("Error fetching initial data:", error));
  }, [fetchClasses, fetchSessions]);

  // Auto-fetch students when both class and session are selected
  useEffect(() => {
    if (selectedClassId && selectedSessionId) {
      fetchStudents(selectedClassId, selectedSessionId).catch((err) =>
        console.error("Error fetching students:", err)
      );
    }
  }, [selectedClassId, selectedSessionId, fetchStudents]);

  const handleClearSelections = () => {
    setSelectedClassId(null);
    setSelectedSessionId(null);
    setStudents([]);
  };

  if (classesLoading) return null; // Minimal loading state
  if (classesError) return <div>Error: {classesError}</div>;

  return (
    <StudentClassesContainer>
      <PageHeader title="Students & Classes" />

      <Tabs defaultValue="all-students" className="mb-6">
        <TabsList className="grid grid-cols-4 max-w-xl bg-gray-100">
          <TabsTrigger value="all-students">All Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="all-students">
          <Card>
            <CardContent className="pt-6">
              <StudentFilters
                classes={classes}
                sessions={sessions}
                onClassSelect={setSelectedClassId}
                onSessionSelect={setSelectedSessionId}
                selectedClassId={selectedClassId}
                selectedSessionId={selectedSessionId}
                onClearFilters={handleClearSelections}
              />

              <StudentTable
                students={students}
                loading={studentsLoading}
                error={studentsError}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </StudentClassesContainer>
  );
};

export default StudentsClassesPage;
