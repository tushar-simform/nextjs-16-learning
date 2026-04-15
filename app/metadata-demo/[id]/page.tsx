import { Metadata } from "next";

// This demonstrates how generateMetadata works for dynamic routes
// In a real scenario, this would be at app/employees/[id]/page.tsx

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// This function generates metadata dynamically based on the route params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you'd fetch employee data from your database/API
  const id = params.id;

  // Simulated employee data fetch
  const employee = {
    id,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
  };

  return {
    title: employee.name,
    description: `${employee.name} - ${employee.position} at ${employee.department}`,
    openGraph: {
      title: `${employee.name} | Team Management`,
      description: `${employee.position} at ${employee.department}`,
      url: `https://learning-nextjs-16-with-tushar.vercel.app/employees/${id}`,
      images: [
        {
          url: `/employees/${id}/avatar.png`,
          width: 800,
          height: 600,
          alt: employee.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: employee.name,
      description: `${employee.position} at ${employee.department}`,
    },
  };
}

// Example Server Component for employee details
export default function EmployeeDetailExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Dynamic Metadata Example</h1>
        <p className="text-gray-600 mb-6">
          This page demonstrates how to use{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            generateMetadata()
          </code>{" "}
          for dynamic content.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h2 className="font-semibold mb-2">How it works:</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Next.js calls <code>generateMetadata()</code> before rendering
            </li>
            <li>
              You can fetch data based on route params (e.g., employee ID)
            </li>
            <li>Return customized metadata for that specific page</li>
            <li>SEO tags are automatically generated in the HTML head</li>
          </ol>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h2 className="font-semibold mb-2">Use Cases:</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Employee detail pages with custom titles and descriptions</li>
            <li>Department pages with specific keywords</li>
            <li>Blog posts with article metadata</li>
            <li>Product pages with Open Graph images</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This is a demonstration. In production,
            create a route like{" "}
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">
              app/employees/[id]/page.tsx
            </code>{" "}
            to use dynamic routes with generateMetadata.
          </p>
        </div>
      </div>
    </div>
  );
}
