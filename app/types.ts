export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  salary: number;
  createdAt: string;
}
