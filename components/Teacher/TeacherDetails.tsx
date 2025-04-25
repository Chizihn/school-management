"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeacherStore } from "@/store/useTeacher";
import { PageLoading } from "@/components/Loader";
import { Mail, Phone, Calendar } from "lucide-react";
import { Class, Subject } from "@/types/school";
import PageHeader from "../PageHeader";
import { useRouter } from "next/navigation";

interface TeacherDetailsProps {
  id: string;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ id }) => {
  const router = useRouter();
  const { teacher, fetchTeacher, teacherLoading: loading } = useTeacherStore();

  useEffect(() => {
    fetchTeacher(id);
  }, [id, fetchTeacher]);

  if (loading || !teacher) return <PageLoading />;

  //   const getInitials = (firstName: string, lastName: string) => {
  //     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  //   };

  const handleBack = () => {
    router.push("/dashboard/teachers");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Teacher" showTitle={false} onBack={handleBack} />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-bold">{`${teacher.firstName} ${teacher.lastName}`}</h2>
                <p className="text-gray-500">Teacher</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    Joined: {new Date(teacher.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subjects">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              {teacher.subjects && teacher.subjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject: Subject) => (
                    <Badge
                      key={subject.id}
                      variant="outline"
                      className="px-3 py-1"
                    >
                      {subject.name} ({subject.code})
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No subjects assigned yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {teacher.classes && teacher.classes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {teacher.classes.map((cls: Class) => (
                    <Badge key={cls.id} variant="outline" className="px-3 py-1">
                      {cls.name} ({cls.level})
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No classes assigned yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDetails;
