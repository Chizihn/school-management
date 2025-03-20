// app/not-found.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">
          {" "}
          <span className="text-red-600 ">404</span> Page Not Found
        </h1>

        <p className="text-gray-700 mb-6">
          The page you are looking for does not exist, might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
