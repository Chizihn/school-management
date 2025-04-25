"use client";
import React from "react";

// Custom spinner with a gap effect
const Loader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      {/* Spinner with gap */}

      <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-solid border-blue-900" />
    </div>
  );
};

const FetchLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      {/* Spinner with gap */}

      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
    </div>
  );
};

// Page Loading with Spinner
const PageLoading = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <Loader />
    </div>
  );
};

// Full Page Loading with Spinner
const FullPageLoading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export { Loader, PageLoading, FullPageLoading, FetchLoader };
