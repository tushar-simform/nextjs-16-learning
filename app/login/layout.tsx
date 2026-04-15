import type { Metadata } from "next";

// Static metadata for the login page
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access the Team Management System",
  robots: {
    index: false, // Don't index login pages
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
