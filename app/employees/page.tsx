"use client";

import { useState, useEffect, useMemo } from "react";
import { Employee, Department } from "../types";
import {
  getEmployees,
  getDepartments,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../utils/storage";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";

const ROWS_PER_PAGE = 5;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  // Load data on mount
  useEffect(() => {
    setEmployees(getEmployees());
    setDepartments(getDepartments());
  }, []);

  // Create department lookup map
  const departmentMap = useMemo(() => {
    const map = new Map<string, string>();
    departments.forEach((dept) => {
      map.set(dept.id, dept.name);
    });
    return map;
  }, [departments]);

  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) {
      return employees;
    }

    const query = searchQuery.toLowerCase();
    return employees.filter((emp) => {
      const departmentName = departmentMap.get(emp.departmentId) || "";
      return (
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        departmentName.toLowerCase().includes(query) ||
        (emp.phone && emp.phone.toLowerCase().includes(query)) ||
        (emp.position && emp.position.toLowerCase().includes(query))
      );
    });
  }, [employees, searchQuery, departmentMap]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle Create Employee
  const handleCreateEmployee = (data: Omit<Employee, "id" | "createdAt">) => {
    const updatedEmployees = addEmployee(data);
    setEmployees(updatedEmployees);
    setIsCreateModalOpen(false);
  };

  // Handle Edit Employee
  const handleEditEmployee = (data: Omit<Employee, "id" | "createdAt">) => {
    if (!selectedEmployee) return;

    const updatedEmployee: Employee = {
      ...data,
      id: selectedEmployee.id,
      createdAt: selectedEmployee.createdAt,
    };

    const updatedEmployees = updateEmployee(updatedEmployee);
    setEmployees(updatedEmployees);
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  // Handle Delete Employee
  const handleDeleteEmployee = () => {
    if (!selectedEmployee) return;

    const updatedEmployees = deleteEmployee(selectedEmployee.id);
    setEmployees(updatedEmployees);
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);

    // Adjust current page if needed
    const newTotalPages = Math.ceil(
      (filteredEmployees.length - 1) / ROWS_PER_PAGE,
    );
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Get existing emails for validation (excluding current employee when editing)
  const existingEmails = useMemo(() => {
    return employees
      .filter((emp) => emp.id !== selectedEmployee?.id)
      .map((emp) => emp.email);
  }, [employees, selectedEmployee]);

  // Open Edit Modal
  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  // Open Delete Dialog
  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      {/* Search and Create Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          + Create Employee
        </button>
      </div>

      {/* Employee Table */}
      {currentEmployees.length > 0 ? (
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
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.phone || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {departmentMap.get(employee.departmentId) ||
                            "Unknown"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.position || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(employee)}
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
                          onClick={() => openDeleteDialog(employee)}
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
            {Math.min(endIndex, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} employee
            {filteredEmployees.length !== 1 ? "s" : ""}
            {searchQuery && ` (filtered from ${employees.length} total)`}
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchQuery ? "No employees found" : "No employees yet"}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery
              ? "Try adjusting your search criteria"
              : "Get started by creating your first employee"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              + Create Employee
            </button>
          )}
        </div>
      )}

      {/* Create Employee Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Employee"
      >
        <EmployeeForm
          departments={departments}
          onSubmit={handleCreateEmployee}
          onCancel={() => setIsCreateModalOpen(false)}
          submitText="Create Employee"
          existingEmails={existingEmails}
        />
      </Modal>

      {/* Edit Employee Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEmployee(null);
        }}
        title="Edit Employee"
      >
        {selectedEmployee && (
          <EmployeeForm
            key={selectedEmployee.id}
            initialData={selectedEmployee}
            departments={departments}
            onSubmit={handleEditEmployee}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedEmployee(null);
            }}
            submitText="Update Employee"
            existingEmails={existingEmails}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Employee"
        message={
          selectedEmployee
            ? `Are you sure you want to delete "${selectedEmployee.name}"? This action cannot be undone.`
            : ""
        }
        onConfirm={handleDeleteEmployee}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedEmployee(null);
        }}
        confirmText="Delete"
        confirmStyle="danger"
      />
    </div>
  );
}
