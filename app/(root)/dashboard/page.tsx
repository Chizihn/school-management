import React from "react";
import { UserPlus, Bookmark, GraduationCap, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DashboardMainContent = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Top notification bar */}
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <div className="text-sm text-gray-700 max-w-2xl">
          <span className="font-medium">Learn how to launch faster</span>
          <p className="text-xs text-gray-500">
            watch our webinar for tips from our experts and get a limited time
            offer.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <BellRing className="text-blue-500" size={20} />
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Log out
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-700">
              Welcome to your dashboard, Udemy school
            </h1>
            <p className="text-gray-500 mt-2">Uyo/school/@teachable.com</p>
          </div>

          {/* Action cards */}
          <div className="space-y-6">
            {/* Add other admins */}
            <Card className="p-4 hover:shadow-md border transition-shadow">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <UserPlus className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Add other admins
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Create rich course content and coaching products for your
                    students. When you give them a pricing plan, they&apos;ll
                    appear on your site!
                  </p>
                </div>
              </div>
            </Card>

            {/* Add classes */}
            <Card className="p-4 hover:shadow-md border transition-shadow">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bookmark className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Add classes</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Create rich course content and coaching products for your
                    students. When you give them a pricing plan, they&apos;ll
                    appear on your site!
                  </p>
                </div>
              </div>
            </Card>

            {/* Add students */}
            <Card className="p-4 hover:shadow-md border transition-shadow">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <GraduationCap className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Add students</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Create rich course content and coaching products for your
                    students. When you give them a pricing plan, they&apos;ll
                    appear on your site!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Support button */}
      <div className="fixed bottom-6 right-6">
        <Button className="bg-blue-900 text-white px-6 rounded-full flex items-center gap-2">
          Support
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default DashboardMainContent;
