import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { capitalizeFirstChar } from "@/utils";

interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  showScrollbar?: boolean;
  loading?: boolean;
  changeBg?: "default" | "white" | "transparent"; // New prop for background
  [key: string]: unknown;
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  label,
  required = false,
  searchable = false,
  clearable = false,
  showScrollbar = true, // New prop for scrollbar
  loading = false,
  changeBg = "default", // Default value
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement>(null);

  // Background styles based on the changeBg prop
  const getBgStyles = () => {
    switch (changeBg) {
      case "white":
        return "bg-white border-1 ";
      case "transparent":
        return "bg-transparent hover:bg-gray-50/10";
      default:
        return "bg-slate-100 hover:bg-slate-200";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!disabled || !loading) {
      setIsOpen((prev) => !prev);
      setSearchTerm("");
    }
  };

  const handleSelect = (selectedValue: string | number) => {
    if (disabled) return;
    onChange(selectedValue);
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={`flex flex-col gap-1.5 ${
        showScrollbar ? "" : "scrollbar-none"
      } ${className}`}
      ref={selectRef}
      {...props}
    >
      {label && (
        <label className="text-sm lg:text-md font-medium ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="select-dropdown"
          className={`
            w-full px-4 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-gray-200
            transition-colors
            flex items-center justify-between cursor-pointer ${
              showScrollbar ? "" : "scrollbar-none"
            }
            ${getBgStyles()}
            ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}
          `}
          onClick={toggleDropdown}
          tabIndex={disabled ? -1 : 0}
        >
          {loading ? (
            <div className=" w-full flex justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
            </div>
          ) : (
            <span className="truncate text-md text-gray-500">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}

          <div className="flex gap-2 items-center">
            {clearable && selectedOption && (
              <X
                size={20}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={clearSelection}
              />
            )}
            <ChevronDown
              size={20}
              className={`text-gray-600 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div
            id="select-dropdown"
            role="listbox"
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {searchable && (
              <div className="p-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <ul className={`py-1 ${showScrollbar ? "" : "scrollbar-none"}`}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    ref={option.value === value ? selectedOptionRef : null}
                    role="option"
                    aria-selected={option.value === value}
                    className={`px-4 py-2 cursor-pointer select-none
                      ${
                        option.value === value
                          ? "bg-gray-200 text-gray-700"
                          : "text-gray-500"
                      }
                      ${disabled ? "cursor-not-allowed" : "hover:bg-gray-100"}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {capitalizeFirstChar(option.label)}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-500 text-center">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
