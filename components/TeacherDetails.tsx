// components/TeacherDetails.js
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TeacherDetails: React.FC<{ id: string }> = ({ id }) => {
  // Mock teacher data with subjects and classes
  const teachers = [
    {
      id: "1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      phone: "123-456-7890",
      subjects: [{ id: "math-01", name: "Mathematics", code: "MATH101" }],
      classes: [{ id: "class-01", name: "Math 101", level: "Beginner" }],
      joinDate: "12 Jan 2024",
      status: "Active",
    },
    // Other teachers as necessary
  ];

  const teacher = teachers.find((teacher) => teacher.id === id);

  if (!teacher) return <div>Teacher not found</div>;

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold">{`${teacher.firstName} ${teacher.lastName}`}</h2>
        <p className="text-gray-500">Email: {teacher.email}</p>
        <p className="text-gray-500">Phone: {teacher.phone}</p>
        <p className="text-gray-500">Join Date: {teacher.joinDate}</p>
        <p
          className={`text-xs font-semibold ${
            teacher.status === "Active" ? "text-green-700" : "text-yellow-700"
          }`}
        >
          Status: {teacher.status}
        </p>
        <h3 className="font-semibold mt-4">Subjects:</h3>
        <ul>
          {teacher.subjects.map((subject) => (
            <li key={subject.id}>
              {subject.name} ({subject.code})
            </li>
          ))}
        </ul>
        <h3 className="font-semibold mt-4">Classes:</h3>
        <ul>
          {teacher.classes.map((cls) => (
            <li key={cls.id}>
              {cls.name} - {cls.level}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TeacherDetails;
