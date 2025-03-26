import StudentsClassesPage from "@/components/StudentClass/StudentClasses";
import React from "react";

const StudentsPage = () => {
  return <StudentsClassesPage />;
};

export default StudentsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   UserPlus,
//   Filter,
//   Download,
//   Book,
//   MoreHorizontal,
//   ArrowUpRight,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useStudentStore } from "@/store/useStudent";
// import { useClassStore } from "@/store/useClass";
// import { PageLoading } from "@/components/Loader";
// import { useSessionStore } from "@/store/useSession";

// const StudentsClassesPage: React.FC = () => {
//   // State for selected class and session
//   const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
//   const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
//     null
//   );

//   const {
//     classes,
//     loading: classesLoading,
//     error: classesError,
//     fetchClasses,
//   } = useClassStore();

//   const { sessions, fetchSessions } = useSessionStore();

//   useEffect(() => {
//     // Using Promise.all to fetch classes and sessions concurrently
//     Promise.all([fetchClasses(), fetchSessions()])
//       .then(() => {
//         console.log("Both classes and sessions fetched successfully");
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [fetchClasses, fetchSessions]);

//   // Use the student store hook
//   const { students, loading, error, fetchStudents } = useStudentStore();

//   // Fetch students when class and session are selected
//   const handleFetchStudents = () => {
//     if (selectedClassId && selectedSessionId) {
//       fetchStudents(selectedClassId, selectedSessionId);
//     }
//   };

//   if (classesLoading) return <PageLoading />;

//   if (classesError)
//     return (
//       <div>
//         <p>Error: {classesError}</p>
//       </div>
//     );

//   // Render student rows
//   const renderStudentRows = () => {
//     if (loading)
//       return (
//         <TableRow>
//           <TableCell colSpan={7}>Loading students...</TableCell>
//         </TableRow>
//       );
//     if (error)
//       return (
//         <TableRow>
//           <TableCell colSpan={7}>Error: {error}</TableCell>
//         </TableRow>
//       );

//     return students.map((student) => (
//       <TableRow key={student.id}>
//         <TableCell className="font-medium">
//           {student.firstName} {student.lastName}
//         </TableCell>
//         <TableCell>{student.session.year}</TableCell>
//         {/* <TableCell>{student.session.class.level}</TableCell> */}
//         <TableCell>{student.createdAt}</TableCell>
//         <TableCell>
//           {student.guardian.firstName} {student.guardian.lastName}
//         </TableCell>
//         {/* <TableCell>
//           <span className={`px-2 py-1 rounded-full text-xs font-semibold
//             ${student.results.some(r => r.isPaid)
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"}`}
//           >
//             {student.results.some(r => r.isPaid) ? "Paid" : "Pending"}
//           </span>
//         </TableCell> */}
//         <TableCell>
//           <Button variant="ghost" size="icon">
//             <MoreHorizontal size={16} />
//           </Button>
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Students & Classes
//           </h1>
//           <div className="flex gap-3 mt-4 md:mt-0">
//             <Button variant="outline" className="flex items-center gap-2">
//               <Book size={16} />
//               Add Class
//             </Button>
//             <Button className="bg-blue-600 hover:bg-blue-700">
//               <UserPlus size={16} className="mr-2" />
//               Add Student
//             </Button>
//           </div>
//         </div>

//         <Tabs defaultValue="all-students" className="mb-6">
//           <TabsList className="grid grid-cols-4 max-w-xl bg-gray-100">
//             <TabsTrigger value="all-students">All Students</TabsTrigger>
//             <TabsTrigger value="admission">Admission Form</TabsTrigger>
//             <TabsTrigger value="promotion">Student Promotion</TabsTrigger>
//             <TabsTrigger value="classes">Classes</TabsTrigger>
//           </TabsList>

//           <TabsContent value="all-students">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//                   <div className="relative w-full sm:w-1/2">
//                     <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
//                     <Input placeholder="Search students..." className="pl-10" />
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <Filter size={16} />
//                       Filter
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <Download size={16} />
//                       Export
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//                   <div className="flex gap-4 w-full">
//                     <Select
//                       value={selectedClassId || ""}
//                       onValueChange={setSelectedClassId}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Class" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {/* Populate with actual class options */}
//                         {classes.map((classItem) => (
//                           <SelectItem key={classItem.id} value={classItem.id}>
//                             {classItem.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>

//                     <Select
//                       value={selectedSessionId || ""}
//                       onValueChange={setSelectedSessionId}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Session" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {/* Populate with actual session options */}
//                         {sessions.map((session) => (
//                           <SelectItem key={session.id} value={session.id}>
//                             {session.year}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>

//                     <Button
//                       onClick={handleFetchStudents}
//                       disabled={!selectedClassId || !selectedSessionId}
//                     >
//                       Fetch Students
//                     </Button>
//                   </div>

//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <Filter size={16} />
//                       Filter
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <Download size={16} />
//                       Export
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Class</TableHead>
//                         <TableHead>Level</TableHead>
//                         <TableHead>Admission Date</TableHead>
//                         <TableHead>Parent</TableHead>
//                         <TableHead>Fees Status</TableHead>
//                         <TableHead></TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>{renderStudentRows()}</TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="admission">
//             <Card>
//               <CardContent className="pt-6">
//                 <form className="space-y-6">
//                   <h3 className="text-lg font-semibold">Student Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Full Name</label>
//                       <Input placeholder="Enter student full name" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Date of Birth
//                       </label>
//                       <Input type="date" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Gender</label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Address</label>
//                       <Input placeholder="Enter address" />
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-semibold pt-4">
//                     Parent/Guardian Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Parent Name</label>
//                       <Input placeholder="Enter parent name" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Phone Number
//                       </label>
//                       <Input placeholder="Enter phone number" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Email Address
//                       </label>
//                       <Input type="email" placeholder="Enter email address" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Relation to Student
//                       </label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select relation" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="father">Father</SelectItem>
//                           <SelectItem value="mother">Mother</SelectItem>
//                           <SelectItem value="guardian">Guardian</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-semibold pt-4">
//                     Academic Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Grade/Class</label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select grade" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="9">9th Grade</SelectItem>
//                           <SelectItem value="10">10th Grade</SelectItem>
//                           <SelectItem value="11">11th Grade</SelectItem>
//                           <SelectItem value="12">12th Grade</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Section</label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select section" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="A">A</SelectItem>
//                           <SelectItem value="B">B</SelectItem>
//                           <SelectItem value="C">C</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <Button className="bg-blue-600 hover:bg-blue-700">
//                       Submit Application
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="promotion">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Current Grade
//                       </label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select current grade" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="9">9th Grade</SelectItem>
//                           <SelectItem value="10">10th Grade</SelectItem>
//                           <SelectItem value="11">11th Grade</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Current Section
//                       </label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select section" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="A">A</SelectItem>
//                           <SelectItem value="B">B</SelectItem>
//                           <SelectItem value="C">C</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">New Grade</label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select new grade" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="10">10th Grade</SelectItem>
//                           <SelectItem value="11">11th Grade</SelectItem>
//                           <SelectItem value="12">12th Grade</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <Button variant="outline">Load Students</Button>

//                   <div className="pt-4">
//                     <p className="text-sm text-gray-500 italic">
//                       Select grades and section to view students eligible for
//                       promotion
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="classes">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {classes.map((classItem) => (
//                 <Card key={classItem.id}>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">{classItem.name}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">Subjects:</span>
//                         <span className="font-medium">
//                           {classItem.subjects?.length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">Students:</span>
//                         <span className="font-medium">
//                           {classItem.students?.length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">
//                           Class Teacher:
//                         </span>
//                         <span className="font-medium">
//                           {classItem.teachers?.map((teacher) => (
//                             <div key={teacher.id}>
//                               {teacher.firstName} {teacher.lastName}
//                             </div>
//                           ))}
//                         </span>
//                       </div>
//                       <Button
//                         variant="outline"
//                         className="w-full mt-4 flex items-center justify-center gap-2"
//                       >
//                         View Details
//                         <ArrowUpRight size={16} />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default StudentsClassesPage;
