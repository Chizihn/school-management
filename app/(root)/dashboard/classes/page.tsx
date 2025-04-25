"use client";

import { GET_CLASSES } from "@/graphql/queries/queries";
import { useQuery } from "@apollo/client";
import { Class } from "@/types/school";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassLevel } from "@/types/school";
import { Loader } from "@/components/Loader";
import ErrorDisplay from "@/components/ui/error-display";

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data, loading, error } = useQuery(GET_CLASSES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
  });

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error.message} />;

  const classes: Class[] = data?.classes || [];

  // Filter classes based on active tab
  const filteredClasses =
    activeTab === "all"
      ? classes
      : classes.filter((cls) => cls.level === activeTab);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Classes</h1>
        <Link href="/dashboard/classes/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value={ClassLevel.NUSERY}>Nursery</TabsTrigger>
          <TabsTrigger value={ClassLevel.PRIMARY}>Primary</TabsTrigger>
          <TabsTrigger value={ClassLevel.JUNIOR_SECONDARY}>
            Junior Secondary
          </TabsTrigger>
          <TabsTrigger value={ClassLevel.SENIOR_SECONDARY}>
            Senior Secondary
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <Link href={`/dashboard/classes/${cls.id}`} key={cls.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{cls.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Level:</span>{" "}
                          {cls.level}
                        </p>
                        <p>
                          <span className="font-medium">Students:</span>{" "}
                          {cls.students?.length || 0}
                        </p>
                        <p>
                          <span className="font-medium">Subjects:</span>{" "}
                          {cls.subjects?.length || 0}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No classes found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
