"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import { useStudentStore } from "@/store/useStudent";
import { useClassStore } from "@/store/useClass";
import { useSessionStore } from "@/store/useSession";
import { StudentFilters } from "./StudentFilter";
import { StudentTable } from "./StudentTable";
import { ClassCard } from "./ClassCard";
import { PageLoading } from "../Loader";
import CenterModal from "../modals/CenterModal";
import AddStudentPage from "../Student/AddStudent";
import { useModalStore } from "@/store/useModal";
import PageHeader from "../PageHeader";
import AddClassPage from "../Class/AddClass";
import { Button } from "../ui/button";
import { Book, UserPlus } from "lucide-react";
import { PageContainer } from "../PageContainer";

const StudentsClassesPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<
    string | number | null
  >(null);
  const [selectedSessionId, setSelectedSessionId] = useState<
    string | number | null
  >(null);

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

  const [showStudents, setShowStudents] = useState<boolean>(false);

  const {
    openAddStudentModal,
    openAddClassModal,
    isAddClassModalOpen,
    closeAddClassModal,
    isAddStudentModalOpen,
    closeAddStudentModal,
  } = useModalStore();

  // Fetch initial data
  useEffect(() => {
    Promise.all([fetchClasses(), fetchSessions()])
      .then(() => console.log("Initial data fetched"))
      .catch((error) => console.error("Error fetching initial data:", error));
  }, [fetchClasses, fetchSessions]);

  // Auto-fetch students when both class and session are selected
  useEffect(() => {
    if (selectedClassId && selectedSessionId) {
      setShowStudents(true);
      fetchStudents(
        selectedClassId as string,
        selectedSessionId as string
      ).catch((err) => console.error("Error fetching students:", err));
    }
  }, [selectedClassId, selectedSessionId, fetchStudents]);

  const handleClearSelections = () => {
    setSelectedClassId(null);
    setSelectedSessionId(null);
    setShowStudents(false);
    setStudents([]);
  };

  if (classesLoading) return <PageLoading />; // Minimal loading state
  if (classesError) return <div>Error: {classesError}</div>;

  return (
    <>
      <PageContainer>
        <PageHeader
          title="Students & Classes"
          component={
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => openAddClassModal()}
              >
                <Book size={16} />
                Add Class
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => openAddStudentModal()}
              >
                <UserPlus size={16} className="mr-2" />
                Add Student
              </Button>
            </div>
          }
        />

        <Tabs defaultValue="all-students" className="mb-6">
          <TabsList className="grid grid-cols-4 max-w-xl bg-gray-100">
            <TabsTrigger value="all-students" className="p-2">
              All Students
            </TabsTrigger>
            <TabsTrigger value="classes" className="p-2">
              Classes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-students">
            <Card>
              <CardContent className="px-2 lg:px-6 pt-6 space-y-4">
                <StudentFilters
                  classes={classes}
                  sessions={sessions}
                  onClassSelect={setSelectedClassId}
                  onSessionSelect={setSelectedSessionId}
                  selectedClassId={selectedClassId as string}
                  selectedSessionId={selectedSessionId as string}
                  onClearFilters={handleClearSelections}
                />

                {showStudents && (
                  <StudentTable
                    students={students}
                    loading={studentsLoading}
                    error={studentsError}
                  />
                )}
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
      </PageContainer>
      <CenterModal
        isOpen={isAddClassModalOpen}
        setIsOpen={() => closeAddClassModal()}
        title="Add Class"
      >
        <AddClassPage />
      </CenterModal>

      <CenterModal
        isOpen={isAddStudentModalOpen}
        setIsOpen={() => closeAddStudentModal()}
        title="Add Student"
      >
        <AddStudentPage classes={classes} sessions={sessions} />
      </CenterModal>
    </>
  );
};

export default StudentsClassesPage;
