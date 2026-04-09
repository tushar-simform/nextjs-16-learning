import { Department, Employee } from "../types";

const DEPARTMENTS_KEY = "departments";
const EMPLOYEES_KEY = "employees";

// Generic storage functions
export const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Department functions
export const getDepartments = (): Department[] => {
  return getFromStorage<Department>(DEPARTMENTS_KEY);
};

export const saveDepartments = (departments: Department[]): void => {
  saveToStorage(DEPARTMENTS_KEY, departments);
};

export const addDepartment = (
  department: Omit<Department, "id" | "createdAt">,
): Department => {
  const departments = getDepartments();
  const newDepartment: Department = {
    ...department,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  saveDepartments([...departments, newDepartment]);
  return newDepartment;
};

export const updateDepartment = (
  id: string,
  updates: Partial<Department>,
): void => {
  const departments = getDepartments();
  const updated = departments.map((dept) =>
    dept.id === id ? { ...dept, ...updates } : dept,
  );
  saveDepartments(updated);
};

export const deleteDepartment = (id: string): void => {
  const departments = getDepartments();
  saveDepartments(departments.filter((dept) => dept.id !== id));
};

// Employee functions
export const getEmployees = (): Employee[] => {
  return getFromStorage<Employee>(EMPLOYEES_KEY);
};

export const saveEmployees = (employees: Employee[]): void => {
  saveToStorage(EMPLOYEES_KEY, employees);
};

export const addEmployee = (
  employee: Omit<Employee, "id" | "createdAt">,
): Employee[] => {
  const employees = getEmployees();
  const newEmployee: Employee = {
    ...employee,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const updatedEmployees = [...employees, newEmployee];
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};

export const updateEmployee = (employee: Employee): Employee[] => {
  const employees = getEmployees();
  const updatedEmployees = employees.map((emp) =>
    emp.id === employee.id ? employee : emp,
  );
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};

export const deleteEmployee = (id: string): Employee[] => {
  const employees = getEmployees();
  const updatedEmployees = employees.filter((emp) => emp.id !== id);
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  if (getDepartments().length === 0) {
    const sampleDepartments: Department[] = [
      {
        id: "1",
        name: "Engineering",
        description: "Software development and infrastructure",
        manager: "John Smith",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Human Resources",
        description: "Employee management and recruitment",
        manager: "Sarah Johnson",
        createdAt: new Date().toISOString(),
      },
    ];
    saveDepartments(sampleDepartments);
  }

  if (getEmployees().length === 0) {
    const sampleEmployees: Employee[] = [
      {
        id: "1",
        name: "Alice Brown",
        email: "alice@example.com",
        phone: "(555) 123-4567",
        departmentId: "1",
        position: "Senior Developer",
        salary: 95000,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Bob Wilson",
        email: "bob@example.com",
        phone: "(555) 234-5678",
        departmentId: "1",
        position: "DevOps Engineer",
        salary: 85000,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Carol Martinez",
        email: "carol@example.com",
        phone: "(555) 345-6789",
        departmentId: "2",
        position: "HR Manager",
        salary: 75000,
        createdAt: new Date().toISOString(),
      },
    ];
    saveEmployees(sampleEmployees);
  }
};
