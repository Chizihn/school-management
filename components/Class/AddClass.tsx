"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ClassLevel } from "@/types/school";
import { toast } from "react-toastify";
import { useClassStore } from "@/store/useClass";

const AddClassPage: React.FC = () => {
  const { createClass, loading } = useClassStore();
  const [formData, setFormData] = useState({
    name: "",
    level: ClassLevel.PRIMARY, // Default class level
  });

  const [localLoading, setLocalLoading] = useState(false);

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle class level change
  const handleLevelChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      level: value as ClassLevel,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await createClass(formData);
      toast.success("Class added successfully!");
      console.log("Class added successfully", formData);
    } catch (error) {
      toast.error("Error adding class");
      console.error("Error adding class", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Format level for display
  const formatLevel = (level: string) => {
    return level
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-none">
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Class Name</label>
            <Input
              name="name"
              placeholder="Enter class name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium">Class Level</label>
            <Select value={formData.level} onValueChange={handleLevelChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class Level">
                  {formatLevel(formData.level)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.values(ClassLevel).map((level) => (
                  <SelectItem key={level} value={level}>
                    {formatLevel(level)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Class Level</label>
            <select
              value={formData.level}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(ClassLevel).map((level) => (
                <option key={level} value={level}>
                  {formatLevel(level)}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading || localLoading}
          >
            {localLoading || loading ? "Adding..." : "Add Class"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddClassPage;
