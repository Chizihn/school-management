"use client";
import React from "react";
import { useState, useEffect } from "react";

const Loader = () => {
  const [dots, setDots] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex space-x-2">
        <div
          className={`w-4 h-4 rounded-full bg-blue-600 ${
            dots >= 1 ? "opacity-100" : "opacity-30"
          } transition-opacity duration-300`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full bg-blue-600 ${
            dots >= 2 ? "opacity-100" : "opacity-30"
          } transition-opacity duration-300`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full bg-blue-600 ${
            dots >= 3 ? "opacity-100" : "opacity-30"
          } transition-opacity duration-300`}
        ></div>
      </div>
    </div>
  );
};

const PageLoading = () => {
  return (
    <div className="h-80 flex justify-center items-center">
      <Loader />
    </div>
  );
};

const FullPageLoading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export { Loader, PageLoading, FullPageLoading };
