"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Class,
  ClassBroadsheet,
  Result,
  Session,
  Subject,
} from "@/types/school";
import {
  GET_ALL_CLASSES,
  GET_ALL_SESSIONS,
  GENERATE_CLASS_BROADSHEET,
} from "@/graphql/queries"; // Adjust path

const BroadsheetGenerator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialClassId = searchParams.get("classId") || "";
  const initialSessionId = searchParams.get("sessionId") || "";
  const initialTerm = searchParams.get("term") || "";

  const [classId, setClassId] = useState(initialClassId);
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [term, setTerm] = useState(initialTerm);
  const [broadsheetData, setBroadsheetData] = useState<ClassBroadsheet | null>(
    null
  );

  const { data: classesData, loading: classesLoading } =
    useQuery(GET_ALL_CLASSES);
  const { data: sessionsData, loading: sessionsLoading } =
    useQuery(GET_ALL_SESSIONS);

  const [generateBroadsheet, { loading: generatingBroadsheet }] = useMutation(
    GENERATE_CLASS_BROADSHEET,
    {
      onCompleted: (data) => {
        setBroadsheetData(data.generateClassBroadsheet);
      },
      onError: (err) => {
        console.error(err);
        alert("Error generating broadsheet");
      },
    }
  );

  const updateSearchParams = (key: string, value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set(key, value);

    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  const handleClassChange = (value: string) => {
    setClassId(value);
    updateSearchParams("classId", value);
  };

  const handleSessionChange = (value: string) => {
    setSessionId(value);
    updateSearchParams("sessionId", value);
  };

  const handleTermChange = (value: string) => {
    setTerm(value);
    updateSearchParams("term", value);
  };

  const handleGenerate = useCallback(() => {
    if (!classId || !sessionId || !term) {
      alert("Please select all fields");
      return;
    }

    generateBroadsheet({
      variables: {
        classId,
        sessionId,
        term,
      },
    });
  }, [classId, generateBroadsheet, sessionId, term]);

  // Auto-fetch if all parameters exist
  useEffect(() => {
    if (classId && sessionId && term && !broadsheetData) {
      handleGenerate();
    }
  }, [broadsheetData, classId, handleGenerate, sessionId, term]);

  if (classesLoading || sessionsLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto p-6 mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Generate Class Broadsheet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Class</Label>
          <Select onValueChange={handleClassChange} value={classId}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classesData?.classes.map((cls: Class) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name} - {cls.level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Session</Label>
          <Select onValueChange={handleSessionChange} value={sessionId}>
            <SelectTrigger>
              <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
              {sessionsData?.sessions.map((s: Session) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Term</Label>
          <Select onValueChange={handleTermChange} value={term}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FIRST">First Term</SelectItem>
              <SelectItem value="SECOND">Second Term</SelectItem>
              <SelectItem value="THIRD">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={generatingBroadsheet}
        className="w-full md:w-fit"
      >
        {generatingBroadsheet ? (
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
        ) : null}
        Generate Broadsheet
      </Button>

      {broadsheetData && (
        <div className="mt-10 overflow-auto">
          <h3 className="text-lg font-semibold mb-4">
            Broadsheet for {broadsheetData.class.name} -{" "}
            {broadsheetData.session.year} ({broadsheetData.term} Term)
          </h3>

          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Student</th>
                {broadsheetData.class.subjects.map((subject: Subject) => (
                  <th key={subject.id} className="border p-2 text-left">
                    {subject.name}
                  </th>
                ))}
                <th className="border p-2 text-left">Total</th>
                <th className="border p-2 text-left">Average</th>
              </tr>
            </thead>
            <tbody>
              {broadsheetData.studentResults.map((result: Result) => {
                const { student, subjectResults } = result;
                const total = result.totalScoreObtained;
                const average = result.average?.toFixed(2) ?? "N/A";

                return (
                  <tr key={student.id}>
                    <td className="border p-2">
                      {student.firstName} {student.lastName}
                    </td>
                    {broadsheetData.class.subjects.map((subject: Subject) => {
                      const res = subjectResults.find(
                        (r) => r.subject.id === subject.id
                      );
                      return (
                        <td key={subject.id} className="border p-2 text-center">
                          {res ? res.total : "N/A"}
                        </td>
                      );
                    })}
                    <td className="border p-2 text-center">{total}</td>
                    <td className="border p-2 text-center">{average}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default BroadsheetGenerator;
