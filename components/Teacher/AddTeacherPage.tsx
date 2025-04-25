"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeacherStore } from "@/store/useTeacher";
import { Gender } from "@/types/user";
import { toast } from "react-toastify";
import TeacherSuccessPage from "./TeacherSuccessPage";

// Utility function to capitalize the first character of a string
const capitalizeFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const AddTeacherPage = () => {
  // Initial state with all required fields
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: Gender.MALE, // Default gender
  });

  const { addTeacherLoading, addTeacher, error } = useTeacherStore();

  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Attempt to add teacher
      const newTeacherId = await addTeacher(teacher);

      if (newTeacherId) {
        setSuccess(newTeacherId);
        // Reset form after successful submission
        setTeacher({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          gender: Gender.MALE,
        });
        toast.success("Teacher added successfully!");
      }
    } catch (err) {
      // Handle the error
      toast.error("Failed to add teacher. Please try again.");
      console.error("Error adding teacher", err);
    }
  };

  if (success)
    return (
      <TeacherSuccessPage
        teacherId={success}
        onAddAnother={() => {
          setSuccess(null);
          setTeacher({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: Gender.MALE,
          });
        }}
      />
    );

  if (error) {
    return <div>Error loading teacher details: {error}</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                name="firstName"
                placeholder="Enter first name"
                value={teacher.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                name="lastName"
                placeholder="Enter last name"
                value={teacher.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={teacher.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                value={teacher.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={teacher.gender}
                onChange={(e) =>
                  setTeacher((prev) => ({
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

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            disabled={addTeacherLoading}
          >
            {addTeacherLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTeacherPage;
