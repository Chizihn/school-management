import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const SchoolSignupFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
    staffCount: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Welcome, create your school account
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="schoolName"
                placeholder="School name"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-blue-500"
              />
              <button
                onClick={nextStep}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                Next <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose your password
            </h2>
            <div className="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="Choose password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-blue-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-blue-500"
              />
              <button
                onClick={nextStep}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                Next <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose your staff
            </h2>
            <div className="space-y-4">
              <input
                type="number"
                name="staffCount"
                placeholder="Number of staff"
                value={formData.staffCount}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-blue-500"
              />
              <button
                onClick={() => {
                  // Here you would typically send the full form data to your backend
                  console.log("Signup complete", formData);
                  alert("Signup completed!");
                }}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                Complete Signup
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 w-8 mx-1 rounded-full ${
                step >= item ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default SchoolSignupFlow;
