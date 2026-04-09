"use client";

import { useState } from "react";
import { Employee, Department } from "../types";

interface EmployeeFormProps {
  initialData?: Partial<Employee>;
  departments: Department[];
  onSubmit: (data: Omit<Employee, "id" | "createdAt">) => void;
  onCancel: () => void;
  submitText?: string;
  existingEmails?: string[];
}

export default function EmployeeForm({
  initialData,
  departments,
  onSubmit,
  onCancel,
  submitText = "Create Employee",
  existingEmails = [],
}: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    departmentId: initialData?.departmentId || "",
    position: initialData?.position || "",
    salary: initialData?.salary || 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
  });

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      departmentId: "",
    };

    let hasError = false;

    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      hasError = true;
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    } else {
      // Check email uniqueness
      const isDuplicate = existingEmails.some(
        (email) => email.toLowerCase() === formData.email.toLowerCase(),
      );
      if (isDuplicate) {
        newErrors.email = "Email already exists";
        hasError = true;
      }
    }

    // Validate department
    if (!formData.departmentId) {
      newErrors.departmentId = "Department is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | number) => {
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
          placeholder="Enter employee name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="employee@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="(123) 456-7890"
        />
      </div>

      {/* Department Field */}
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Department <span className="text-red-500">*</span>
        </label>
        <select
          id="department"
          value={formData.departmentId}
          onChange={(e) => handleChange("departmentId", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.departmentId ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="mt-1 text-sm text-red-500">{errors.departmentId}</p>
        )}
        {departments.length === 0 && (
          <p className="mt-1 text-sm text-amber-600">
            No departments available. Please create departments first.
          </p>
        )}
      </div>

      {/* Position Field */}
      <div>
        <label
          htmlFor="position"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Senior Developer"
        />
      </div>

      {/* Salary Field */}
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Salary
        </label>
        <input
          type="number"
          id="salary"
          value={formData.salary}
          onChange={(e) =>
            handleChange("salary", parseInt(e.target.value) || 0)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="50000"
          min="0"
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
