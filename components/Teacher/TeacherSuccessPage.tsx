import React from "react";
import { Check, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/store/useModal";

interface SuccessPageProps {
  teacherId: string;
  onAddAnother: () => void;
}

const TeacherSuccessPage: React.FC<SuccessPageProps> = ({
  teacherId,
  onAddAnother,
}) => {
  const { closeAddTeacherModal } = useModalStore();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <Check className="w-8 h-8 text-green-500" />
            <span>Teacher Added Successfully</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-4">
              <UserPlus className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-green-800 font-semibold">
              New Teacher Registered
            </p>
            <p className="text-green-600 text-sm mt-2">
              Teacher ID: <span className="font-bold">{teacherId}</span>
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onAddAnother}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Add Another Teacher
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => closeAddTeacherModal()}
            >
              View Teacher List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSuccessPage;
