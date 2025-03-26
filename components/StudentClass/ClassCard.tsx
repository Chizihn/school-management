import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Class } from "@/types/school";

interface ClassCardProps {
  classItem: Class;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{classItem.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Subjects:</span>
          <span className="font-medium">{classItem.subjects?.length || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Students:</span>
          <span className="font-medium">{classItem.students?.length || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Class Teacher:</span>
          <span className="font-medium">
            {classItem.teachers?.map((teacher) => (
              <div key={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </div>
            ))}
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 flex items-center justify-center gap-2"
        >
          View Details
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </CardContent>
  </Card>
);
