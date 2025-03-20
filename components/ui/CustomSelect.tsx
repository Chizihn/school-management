/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/custom-select.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectGroup = {
  label: string;
  options: SelectOption[];
};

type CustomSelectProps = {
  options: SelectOption[] | SelectGroup[];
  placeholder?: string;
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  control?: Control<any>;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
  size?: "default" | "sm" | "lg";
  isGrouped?: boolean;
};

export const CustomSelect = ({
  options,
  placeholder = "Select an option",
  name,
  label,
  description,
  disabled = false,
  required = false,
  className,
  control,
  onChange,
  value,
  error,
  size = "default",
  isGrouped = false,
}: CustomSelectProps) => {
  // Determine if we're using grouped options
  const isGroupedOptions =
    isGrouped ||
    ("label" in (options[0] || {}) && "options" in (options[0] || {}));

  // Handle size variations
  const sizeClasses = {
    sm: "h-8 text-xs",
    default: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  // If using react-hook-form
  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel
                className={
                  required
                    ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                    : ""
                }
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className={cn(sizeClasses[size], className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {isGroupedOptions
                    ? (options as SelectGroup[]).map((group, groupIndex) => (
                        <SelectGroup key={`group-${groupIndex}`}>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))
                    : (options as SelectOption[]).map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // If using without react-hook-form
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          )}
        >
          {label}
        </label>
      )}
      <Select disabled={disabled} onValueChange={onChange} value={value}>
        <SelectTrigger id={name} className={cn(sizeClasses[size], className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {isGroupedOptions
            ? (options as SelectGroup[]).map((group, groupIndex) => (
                <SelectGroup key={`group-${groupIndex}`}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))
            : (options as SelectOption[]).map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};

// Example usage
// export const SelectExample = () => {
//   const [value, setValue] = React.useState("");

//   const options = [
//     { value: "apple", label: "Apple" },
//     { value: "banana", label: "Banana" },
//     { value: "orange", label: "Orange", disabled: true },
//   ];

//   const groupedOptions = [
//     {
//       label: "Fruits",
//       options: [
//         { value: "apple", label: "Apple" },
//         { value: "banana", label: "Banana" },
//       ],
//     },
//     {
//       label: "Vegetables",
//       options: [
//         { value: "carrot", label: "Carrot" },
//         { value: "broccoli", label: "Broccoli" },
//       ],
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <CustomSelect
//         name="basic-select"
//         label="Select a fruit"
//         description="Choose your favorite fruit"
//         options={options}
//         value={value}
//         onChange={setValue}
//         required
//       />

//       <CustomSelect
//         name="grouped-select"
//         label="Grouped example"
//         options={groupedOptions}
//         isGrouped
//         size="lg"
//       />
//     </div>
//   );
// };
