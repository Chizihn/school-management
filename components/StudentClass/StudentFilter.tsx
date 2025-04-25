import React from "react";
import { Search, Filter, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Class, Session } from "@/types/school";
import CustomSelect from "../ui/CustomSelect";

interface StudentFiltersProps {
  classes: Class[];
  sessions: Session[];
  onClassSelect: (classId: string | number | null) => void;
  onSessionSelect: (sessionId: string | number | null) => void;
  selectedClassId: string | null;
  selectedSessionId: string | null;
  onClearFilters: () => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  classes,
  sessions,
  onClassSelect,
  onSessionSelect,
  selectedClassId,
  selectedSessionId,
  onClearFilters,
}) => {
  const classOptions = classes.map((classItem) => ({
    label: classItem.name,
    value: classItem.id,
  }));

  const sessionOptions = sessions.map((session) => ({
    label: session.year,
    value: session.id,
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search students..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-4 w-full">
          <CustomSelect
            options={classOptions}
            value={selectedClassId}
            onChange={onClassSelect}
            placeholder="Select class"
            searchable={false}
            clearable={false}
            className="w-full"
            changeBg="white"
          />
          {/* <Select value={selectedClassId || ""} onValueChange={onClassSelect}>
          <SelectTrigger className="p-6 w-full ">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.id}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

          {/* <Select value={selectedSessionId || ""} onValueChange={onSessionSelect}>
          <SelectTrigger className="py-6 w-full">
            <SelectValue placeholder="Select Session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

          <CustomSelect
            options={sessionOptions}
            value={selectedSessionId}
            onChange={onSessionSelect}
            placeholder="Select session"
            searchable={false}
            clearable={false}
            className="w-full"
            changeBg="white"
          />

          {selectedClassId && selectedSessionId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearFilters}
              className="text-red-700"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
