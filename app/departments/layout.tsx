import type { Metadata } from "next";

// Static metadata for the departments page
export const metadata: Metadata = {
  title: "Departments",
  description:
    "View and manage all departments in your organization. Add, edit, and delete department records.",
  keywords: [
    "departments",
    "organizational units",
    "department management",
    "company structure",
  ],
  openGraph: {
    title: "Departments | Team Management",
    description: "View and manage all departments in your organization",
    url: "https://learning-nextjs-16-with-tushar.vercel.app/departments",
  },
};

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
