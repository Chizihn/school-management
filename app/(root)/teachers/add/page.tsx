// components/AddTeacherPage.js
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AddTeacherPage = () => {
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: [],
    classes: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission (e.g., send data to API)
    console.log("New Teacher", teacher);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="firstName"
                placeholder="Enter first name"
                value={teacher.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                name="lastName"
                placeholder="Enter last name"
                value={teacher.lastName}
                onChange={handleInputChange}
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
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                value={teacher.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTeacherPage;
