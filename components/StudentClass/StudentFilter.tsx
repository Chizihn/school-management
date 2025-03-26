import React from "react";
import { Search, Filter, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Class, Session } from "@/types/school";

interface StudentFiltersProps {
  classes: Class[];
  sessions: Session[];
  onClassSelect: (classId: string) => void;
  onSessionSelect: (sessionId: string) => void;
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
}) => (
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
        <Select value={selectedClassId || ""} onValueChange={onClassSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.id}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSessionId || ""} onValueChange={onSessionSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
