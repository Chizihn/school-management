import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface StudentAdmissionFormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  parentName: string;
  phoneNumber: string;
  email: string;
  relation: string;
  grade: string;
  section: string;
}

export const StudentAdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentAdmissionFormData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    parentName: "",
    phoneNumber: "",
    email: "",
    relation: "",
    grade: "",
    section: "",
  });

  const handleChange = (
    field: keyof StudentAdmissionFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement submission logic
    console.log("Submission data:", formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="Enter student full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold pt-4 mb-4">
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Name</label>
                <Input
                  placeholder="Enter parent name"
                  value={formData.parentName}
                  onChange={(e) => handleChange("parentName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Relation to Student
                </label>
                <Select
                  value={formData.relation}
                  onValueChange={(value) => handleChange("relation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold pt-4 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade/Class</label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleChange("grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Section</label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => handleChange("section", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
