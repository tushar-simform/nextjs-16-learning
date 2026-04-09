'use client';

import { useEffect, useState } from 'react';
import { getDepartments, getEmployees } from './utils/storage';

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    const employees = getEmployees();
    const departments = getDepartments();
    setEmployeeCount(employees.length);
    setDepartmentCount(departments.length);
  }, []);

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Count Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Total Employees</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{employeeCount}</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {employeeCount === 0 ? 'No employees yet' : `${employeeCount} employee${employeeCount !== 1 ? 's' : ''} in the system`}
          </p>
        </div>

        {/* Department Count Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Total Departments</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{departmentCount}</p>
            </div>
            <div className="text-5xl">🏢</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {departmentCount === 0 ? 'No departments yet' : `${departmentCount} department${departmentCount !== 1 ? 's' : ''} in the system`}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Use the sidebar navigation to manage employees and departments.
        </p>
      </div>
    </div>
  );
}
