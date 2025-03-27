"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useStudentStore } from "@/store/useStudent";
import { Gender } from "@/types/user";
import { toast } from "react-toastify";
import { Class, Session } from "@/types/school";
import { X } from "lucide-react";
import { capitalizeFirstChar } from "@/utils";

interface AddStudentPageProps {
  classes: Class[];
  sessions: Session[];
}

const AddStudentPage: React.FC<AddStudentPageProps> = ({
  classes,
  sessions,
}) => {
  const { registerStudent, loading } = useStudentStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    gender: Gender.MALE,
    dateOfBirth: "",
    classId: "",
    sessionId: "",
  });

  const [localLoading, setLocalLoading] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle class selection
  const onClassSelect = (value: string) => {
    setSelectedClassId(value);
    setFormData((prev) => ({ ...prev, classId: value }));
  };

  // Handle session selection
  const onSessionSelect = (value: string) => {
    setSelectedSessionId(value);
    setFormData((prev) => ({ ...prev, sessionId: value }));
  };

  // Clear class selection
  const onClearClass = () => {
    setSelectedClassId(null);
    setFormData((prev) => ({ ...prev, classId: "" }));
  };

  // Clear session selection
  const onClearSession = () => {
    setSelectedSessionId(null);
    setFormData((prev) => ({ ...prev, sessionId: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await registerStudent(formData);

      toast.success("Student registered successfully");
      console.log("Student registered successfully", formData);
    } catch (error) {
      toast.error("Error registering student");
      console.error("Error registering student", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-none ">
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: e.target.value as Gender,
                  }))
                }
                className="w-full p-2 border rounded"
              >
                {Object.values(Gender).map((gender) => (
                  <option key={gender} value={gender}>
                    {capitalizeFirstChar(gender)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4 w-full">
              <Select
                value={selectedClassId || ""}
                onValueChange={onClassSelect}
              >
                <SelectTrigger className="p-6 w-full ">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedClassId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClearClass}
                  className="text-red-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}

              <Select
                value={selectedSessionId || ""}
                onValueChange={onSessionSelect}
              >
                <SelectTrigger className="py-6 w-full">
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSessionId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClearSession}
                  className="text-red-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading || localLoading}
          >
            {localLoading || loading ? "Adding..." : "Add Student"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStudentPage;
