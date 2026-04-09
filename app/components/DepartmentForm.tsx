"use client";

import { useState } from "react";
import { Department } from "../types";

interface DepartmentFormProps {
  initialData?: Partial<Department>;
  onSubmit: (data: Omit<Department, "id" | "createdAt">) => void;
  onCancel: () => void;
  submitText?: string;
  existingDepartmentNames?: string[];
}

export default function DepartmentForm({
  initialData,
  onSubmit,
  onCancel,
  submitText = "Create Department",
  existingDepartmentNames = [],
}: DepartmentFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    manager: initialData?.manager || "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
    };

    let hasError = false;

    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      hasError = true;
    } else {
      // Check name uniqueness (case-insensitive)
      const isDuplicate = existingDepartmentNames.some(
        (existingName) =>
          existingName.toLowerCase() === formData.name.toLowerCase(),
      );
      if (isDuplicate) {
        newErrors.name = "Department name already exists";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (!hasError) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter department name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter department description"
          rows={4}
          maxLength={500}
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Manager Field */}
      <div>
        <label
          htmlFor="manager"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Manager
        </label>
        <input
          type="text"
          id="manager"
          value={formData.manager}
          onChange={(e) => handleChange("manager", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter manager name"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
