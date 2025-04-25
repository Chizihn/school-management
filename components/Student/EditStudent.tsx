"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useStudentStore } from "@/store/useStudent";
import { Gender } from "@/types/user";
import { toast } from "react-toastify";
import CustomSelect from "../ui/CustomSelect";
import { capitalizeFirstChar } from "@/utils";

interface EditStudentPageProps {
  id: string;
}

const EditStudentPage: React.FC<EditStudentPageProps> = ({ id }) => {
  const { student, loading, fetchStudent, updateStudent } = useStudentStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: Gender.MALE,
    dateOfBirth: "",
  });
  const [localLoading, setLocalLoading] = useState(false);

  // Fetch the student details when the page loads
  useEffect(() => {
    const loadStudent = async () => {
      await fetchStudent(id);
    };
    loadStudent();
  }, [id, fetchStudent]);

  // Update the form data when the student is loaded
  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
      });
    }
  }, [student]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await updateStudent(id, formData);

      toast.success("Student updated successfully");
      console.log("Student updated successfully", formData);
    } catch (error) {
      toast.error("Error updating student");
      console.error("Error updating student", error);
    } finally {
      setLocalLoading(false);
    }
  };

  if (loading) {
    return <div>Loading student details...</div>;
  }

  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <>
      <Card className="w-full max-w-5xl mx-auto shadow-none ">
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
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={localLoading || loading}
            >
              {localLoading || loading ? "Updating..." : "Update Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditStudentPage;
