"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeacherStore } from "@/store/useTeacher";
import { UpdateTeacherInput } from "@/types/teacher";
import { Gender } from "@/types/user";
import { toast } from "react-toastify";
import { capitalizeFirstChar } from "@/utils";

interface EditTeacherPageProps {
  id: string;
}

const EditTeacherPage: React.FC<EditTeacherPageProps> = ({ id }) => {
  const {
    teacher,
    teacherLoading,
    error,
    fetchTeacher,
    updateTeacher,
    updateTeacherLoading: loading,
  } = useTeacherStore();

  const [formData, setFormData] = useState<UpdateTeacherInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: Gender.MALE, // Default value
  });

  // Fetch teacher details when component mounts
  useEffect(() => {
    const loadTeacher = async () => {
      await fetchTeacher(id);
    };
    loadTeacher();
  }, [id, fetchTeacher]);

  // Update form data when teacher is loaded
  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        gender: teacher.gender || "",
      });
    }
  }, [teacher]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value as Gender,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await updateTeacher(id, formData);

      if (data) {
        // Handle successful update (e.g., show toast, redirect)
        toast.success("Teacher updated successfully");
        console.log("Teacher updated successfully", data);
      }
    } catch (mutationError) {
      toast.error(
        (mutationError as Error).message || "Updating teacher failed"
      );
      console.error("Error updating teacher", mutationError);
      // Handle error (e.g., show error message)
    }
  };

  if (teacherLoading) {
    return <div>Loading teacher details...</div>;
  }

  if (error) {
    return <div>Error loading teacher: {error}</div>;
  }

  return (
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleGenderChange}
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
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Teacher"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTeacherPage;
