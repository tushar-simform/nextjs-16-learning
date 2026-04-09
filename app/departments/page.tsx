"use client";

import { useState, useEffect, useMemo } from "react";
import { Department, Employee } from "../types";
import {
  getDepartments,
  getEmployees,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../utils/storage";
import Modal from "../components/Modal";
import DepartmentForm from "../components/DepartmentForm";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";

const ROWS_PER_PAGE = 5;

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [deleteError, setDeleteError] = useState("");

  // Load data on mount
  useEffect(() => {
    setDepartments(getDepartments());
    setEmployees(getEmployees());
  }, []);

  // Create employee count map
  const employeeCountMap = useMemo(() => {
    const map = new Map<string, number>();
    departments.forEach((dept) => {
      const count = employees.filter(
        (emp) => emp.departmentId === dept.id,
      ).length;
      map.set(dept.id, count);
    });
    return map;
  }, [departments, employees]);

  // Filter departments based on search query
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) {
      return departments;
    }

    const query = searchQuery.toLowerCase();
    return departments.filter((dept) => {
      return (
        dept.name.toLowerCase().includes(query) ||
        (dept.description && dept.description.toLowerCase().includes(query)) ||
        (dept.manager && dept.manager.toLowerCase().includes(query))
      );
    });
  }, [departments, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDepartments.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle Create Department
  const handleCreateDepartment = (
    data: Omit<Department, "id" | "createdAt">,
  ) => {
    const updatedDepartments = addDepartment(data);
    setDepartments(updatedDepartments);
    setIsCreateModalOpen(false);
  };

  // Handle Edit Department
  const handleEditDepartment = (data: Omit<Department, "id" | "createdAt">) => {
    if (!selectedDepartment) return;

    const updatedDepartment: Department = {
      ...data,
      id: selectedDepartment.id,
      createdAt: selectedDepartment.createdAt,
    };

    const updatedDepartments = updateDepartment(updatedDepartment);
    setDepartments(updatedDepartments);
    setIsEditModalOpen(false);
    setSelectedDepartment(null);
  };

  // Handle Delete Department
  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return;

    const updatedDepartments = deleteDepartment(selectedDepartment.id);
    setDepartments(updatedDepartments);
    setIsDeleteDialogOpen(false);
    setSelectedDepartment(null);
    setDeleteError("");

    // Adjust current page if needed
    const newTotalPages = Math.ceil(
      (filteredDepartments.length - 1) / ROWS_PER_PAGE,
    );
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Get existing department names for validation (excluding current department when editing)
  const existingDepartmentNames = useMemo(() => {
    return departments
      .filter((dept) => dept.id !== selectedDepartment?.id)
      .map((dept) => dept.name);
  }, [departments, selectedDepartment]);

  // Open Edit Modal
  const openEditModal = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
    setDeleteError("");
  };

  // Open Delete Dialog
  const openDeleteDialog = (department: Department) => {
    const employeeCount = employeeCountMap.get(department.id) || 0;

    if (employeeCount > 0) {
      setDeleteError(
        `Cannot delete department with ${employeeCount} assigned employee${employeeCount !== 1 ? "s" : ""}. Please reassign or remove employees first.`,
      );
      setSelectedDepartment(department);
      setIsDeleteDialogOpen(false);
    } else {
      setDeleteError("");
      setSelectedDepartment(department);
      setIsDeleteDialogOpen(true);
    }
  };

  // Truncate description for table display
  const truncateDescription = (description: string, maxLength: number = 50) => {
    if (!description) return "-";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Departments</h1>

      {/* Search and Create Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
            setDeleteError("");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          + Create Department
        </button>
      </div>

      {/* Delete Error Message */}
      {deleteError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{deleteError}</p>
        </div>
      )}

      {/* Department Table */}
      {currentDepartments.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Count
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDepartments.map((department) => (
                    <tr key={department.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {department.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {department.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-sm text-gray-900"
                          title={department.description || ""}
                        >
                          {truncateDescription(department.description)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {department.manager || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">
                          {employeeCountMap.get(department.id) || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(department)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteDialog(department)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredDepartments.length)} of{" "}
            {filteredDepartments.length} department
            {filteredDepartments.length !== 1 ? "s" : ""}
            {searchQuery && ` (filtered from ${departments.length} total)`}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchQuery ? "No departments found" : "No departments yet"}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery
              ? "Try adjusting your search criteria"
              : "Get started by creating your first department"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setIsCreateModalOpen(true);
                setDeleteError("");
              }}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              + Create Department
            </button>
          )}
        </div>
      )}

      {/* Create Department Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Department"
      >
        <DepartmentForm
          onSubmit={handleCreateDepartment}
          onCancel={() => setIsCreateModalOpen(false)}
          submitText="Create Department"
          existingDepartmentNames={existingDepartmentNames}
        />
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDepartment(null);
        }}
        title="Edit Department"
      >
        {selectedDepartment && (
          <DepartmentForm
            key={selectedDepartment.id}
            initialData={selectedDepartment}
            onSubmit={handleEditDepartment}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedDepartment(null);
            }}
            submitText="Update Department"
            existingDepartmentNames={existingDepartmentNames}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Department"
        message={
          selectedDepartment
            ? `Are you sure you want to delete "${selectedDepartment.name}"? This action cannot be undone.`
            : ""
        }
        onConfirm={handleDeleteDepartment}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedDepartment(null);
          setDeleteError("");
        }}
        confirmText="Delete"
        confirmStyle="danger"
      />
    </div>
  );
}
