import React from "react";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-800 border border-red-300 rounded-md px-4 py-3 mb-4">
      {message}
    </div>
  );
};

export default ErrorDisplay;
