import type { Metadata } from "next";

// Static metadata for the employees page
export const metadata: Metadata = {
  title: "Employees",
  description:
    "View and manage all employees in your organization. Add, edit, and delete employee records.",
  keywords: ["employees", "staff management", "employee list", "HR"],
  openGraph: {
    title: "Employees | Team Management",
    description: "View and manage all employees in your organization",
    url: "https://yourapp.com/employees",
  },
};

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
