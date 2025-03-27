"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeacherStore } from "@/store/useTeacher";

const AddTeacherPage: React.FC = () => {
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: [],
    classes: [],
  });

  const { teacherLoading, error } = useTeacherStore();

  // Fetch teacher details when component mounts or id

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
    // Add your logic to submit the updated teacher details
    console.log("Updated Teacher", teacher);
    // Example: call API to update the teacher's data
    // await updateTeacher(teacher);
  };

  if (teacherLoading) {
    return <div>Loading...</div>;
  }

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
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700" type="submit">
            {teacherLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTeacherPage;
