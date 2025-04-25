"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useStudentStore } from "@/store/useStudent";
import { Gender } from "@/types/user";
import { Class, Session } from "@/types/school";
import { capitalizeFirstChar } from "@/utils";
import CustomSelect from "@/components/ui/CustomSelect"; // Import CustomSelect

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
  const [selectedClassId, setSelectedClassId] = useState<
    string | number | null
  >(null);
  const [selectedSessionId, setSelectedSessionId] = useState<
    string | number | null
  >(null);

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

  // Map classes and sessions to CustomSelect options
  const classOptions = classes.map((classItem) => ({
    label: classItem.name,
    value: classItem.id,
  }));

  const sessionOptions = sessions.map((session) => ({
    label: session.year,
    value: session.id,
  }));

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

            <CustomSelect
              options={Object.values(Gender).map((gender) => ({
                label: capitalizeFirstChar(gender),
                value: gender,
              }))}
              value={formData.gender}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: value as Gender,
                }))
              }
              label="Gender"
              placeholder="Select Gender"
              className="w-full"
              changeBg="white"
              searchable={false}
              clearable={false}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4 w-full">
              {/* Use CustomSelect for Class selection */}
              <CustomSelect
                options={classOptions}
                value={selectedClassId}
                label="Select class"
                onChange={(value) => onClassSelect(value as string)}
                placeholder=""
                searchable={false}
                clearable={true}
                className="w-full"
                changeBg="white"
              />

              {/* Use CustomSelect for Session selection */}
              <CustomSelect
                options={sessionOptions}
                label="Select session"
                value={selectedSessionId}
                onChange={(value) => onSessionSelect(value as string)}
                placeholder=""
                searchable={false}
                clearable={true}
                className="w-full"
                changeBg="white"
              />
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
