"use client";
import React from "react";
import {
  Search,
  UserPlus,
  Filter,
  Download,
  Book,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentsClassesPage = () => {
  //   const [activeTab, setActiveTab] = useState("all-students");

  // Mock data
  const students = [
    {
      id: 1,
      name: "Emily Smith",
      grade: "10th",
      class: "A",
      admissionDate: "15 Jan 2024",
      parentName: "David Smith",
      fees: "Paid",
    },
    {
      id: 2,
      name: "James Wilson",
      grade: "9th",
      class: "B",
      admissionDate: "03 Feb 2024",
      parentName: "Sarah Wilson",
      fees: "Pending",
    },
    {
      id: 3,
      name: "Olivia Johnson",
      grade: "11th",
      class: "A",
      admissionDate: "22 Jan 2024",
      parentName: "Robert Johnson",
      fees: "Paid",
    },
    {
      id: 4,
      name: "William Brown",
      grade: "10th",
      class: "C",
      admissionDate: "05 Mar 2024",
      parentName: "Jessica Brown",
      fees: "Paid",
    },
    {
      id: 5,
      name: "Sophia Davis",
      grade: "12th",
      class: "A",
      admissionDate: "18 Dec 2023",
      parentName: "Michael Davis",
      fees: "Pending",
    },
  ];

  const classes = [
    {
      id: 1,
      name: "10th Grade - A",
      subjects: 8,
      students: 35,
      teacher: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      name: "9th Grade - B",
      subjects: 7,
      students: 32,
      teacher: "Mr. David Rodriguez",
    },
    {
      id: 3,
      name: "11th Grade - A",
      subjects: 9,
      students: 28,
      teacher: "Prof. Michael Chen",
    },
    {
      id: 4,
      name: "12th Grade - A",
      subjects: 8,
      students: 25,
      teacher: "Dr. Lisa Ahmed",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Students & Classes
          </h1>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Book size={16} />
              Add Class
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus size={16} className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-students" className="mb-6">
          <TabsList className="grid grid-cols-4 max-w-xl bg-gray-100">
            <TabsTrigger value="all-students">All Students</TabsTrigger>
            <TabsTrigger value="admission">Admission Form</TabsTrigger>
            <TabsTrigger value="promotion">Student Promotion</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="all-students">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div className="relative w-full sm:w-1/2">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search students..." className="pl-10" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Filter size={16} />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Fees Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.name}
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.admissionDate}</TableCell>
                          <TableCell>{student.parentName}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                student.fees === "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {student.fees}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admission">
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <h3 className="text-lg font-semibold">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="Enter student full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Date of Birth
                      </label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <Select>
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
                      <Input placeholder="Enter address" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold pt-4">
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Parent Name</label>
                      <Input placeholder="Enter parent name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Relation to Student
                      </label>
                      <Select>
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

                  <h3 className="text-lg font-semibold pt-4">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Grade/Class</label>
                      <Select>
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
                      <Select>
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

                  <div className="pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotion">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Current Grade
                      </label>
                      <Select>
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
                      <label className="text-sm font-medium">
                        Current Section
                      </label>
                      <Select>
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
                      <Select>
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

                  <Button variant="outline">Load Students</Button>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500 italic">
                      Select grades and section to view students eligible for
                      promotion
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Subjects:</span>
                        <span className="font-medium">
                          {classItem.subjects}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Students:</span>
                        <span className="font-medium">
                          {classItem.students}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Class Teacher:
                        </span>
                        <span className="font-medium">{classItem.teacher}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowUpRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentsClassesPage;
