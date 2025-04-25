"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ClassLevel } from "@/types/school";
import { toast } from "react-toastify";
import { useClassStore } from "@/store/useClass";
import CustomSelect from "../ui/CustomSelect";

const AddClassPage: React.FC = () => {
  const { createClass, loading } = useClassStore();
  const [formData, setFormData] = useState({
    name: "",
    level: ClassLevel.NUSERY, // Default class level
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

  const levelOptions = Object.values(ClassLevel).map((level) => ({
    label: level,
    value: level,
  }));

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

          <CustomSelect
            options={levelOptions}
            label="Class level"
            value={formData.level}
            onChange={(value) => handleLevelChange(value as string)}
            placeholder="Class level"
            searchable={false}
            clearable={false}
            className="w-full"
            changeBg="white"
          />

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
