import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClassPromotionSection: React.FC = () => {
  const [currentGrade, setCurrentGrade] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<string>("");
  const [newGrade, setNewGrade] = useState<string>("");

  const handleLoadStudents = () => {
    // Implement student loading logic
    console.log("Loading students", { currentGrade, currentSection, newGrade });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Grade</label>
              <Select value={currentGrade} onValueChange={setCurrentGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9th Grade</SelectItem>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Section</label>
              <Select value={currentSection} onValueChange={setCurrentSection}>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">New Grade</label>
              <Select value={newGrade} onValueChange={setNewGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLoadStudents}
            disabled={!currentGrade || !currentSection || !newGrade}
          >
            Load Students
          </Button>

          <div className="pt-4">
            <p className="text-sm text-gray-500 italic">
              Select grades and section to view students eligible for promotion
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
