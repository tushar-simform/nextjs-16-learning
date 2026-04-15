import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenGraph Preview Demo",
  description: "See how your pages look when shared on social media",
};

export default function OGPreviewDemo() {
  // This is what your employees page metadata looks like
  const employeesMetadata = {
    title: "Employees | Team Management",
    description: "View and manage all employees in your organization",
    url: "https://learning-nextjs-16-with-tushar.vercel.app/employees",
    image: "/og-image.png", // You can add this
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">🎨 OpenGraph Preview Demo</h1>
        <p className="text-gray-600 mb-8">
          This is how your <strong>/employees</strong> page appears when shared
          on social media
        </p>

        {/* Facebook Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-600">📘 Facebook</span>
          </h2>
          <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-64 flex items-center justify-center text-white text-lg font-semibold">
              {employeesMetadata.image}
              <br />
              (Add this image to see it here)
            </div>
            {/* Content */}
            <div className="bg-gray-50 p-4 border-t">
              <div className="text-xs text-gray-500 uppercase mb-1">
                yourapp.com
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {employeesMetadata.title}
              </div>
              <div className="text-sm text-gray-600">
                {employeesMetadata.description}
              </div>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-sky-500">🐦 Twitter/X</span>
          </h2>
          <div className="border border-gray-300 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-sky-400 to-sky-600 h-64 flex items-center justify-center text-white text-lg font-semibold">
              {employeesMetadata.image}
              <br />
              (Add this image to see it here)
            </div>
            {/* Content */}
            <div className="bg-white p-3 border-t">
              <div className="text-base font-semibold text-gray-900 mb-1">
                {employeesMetadata.title}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {employeesMetadata.description}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                🔗 yourapp.com
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-700">💼 LinkedIn</span>
          </h2>
          <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-64 flex items-center justify-center text-white text-lg font-semibold">
              {employeesMetadata.image}
              <br />
              (Add this image to see it here)
            </div>
            {/* Content */}
            <div className="bg-white p-4 border-t">
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {employeesMetadata.title}
              </div>
              <div className="text-xs text-gray-500 mb-2">yourapp.com</div>
            </div>
          </div>
        </div>

        {/* Slack Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-purple-600">💬 Slack</span>
          </h2>
          <div className="border-l-4 border-purple-500 bg-gray-50 pl-3 py-2">
            <div className="text-blue-600 font-semibold hover:underline cursor-pointer">
              {employeesMetadata.title}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {employeesMetadata.description}
            </div>
            <div className="text-xs text-gray-500 mt-2">yourapp.com</div>
          </div>
        </div>

        {/* Microsoft Teams Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-indigo-600">👥 Microsoft Teams</span>
          </h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Teams message preview */}
            <div className="p-3 bg-gray-50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">User</div>
                  <div className="text-xs text-gray-500">Just now</div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-3">
                Check out our employee management page:
              </div>
              {/* Link preview card in Teams */}
              <div className="border-l-4 border-indigo-500 bg-white rounded shadow-sm">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 h-32 flex items-center justify-center text-white text-sm font-semibold">
                  {employeesMetadata.image}
                  <br />
                  (Add this image to see it here)
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer">
                    {employeesMetadata.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {employeesMetadata.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    🔗 yourapp.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Tools */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
          <h3 className="font-bold text-lg mb-3">
            🔧 Test Your OpenGraph Tags:
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Facebook:</strong>{" "}
              <a
                href="https://developers.facebook.com/tools/debug/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook Sharing Debugger
              </a>
            </li>
            <li>
              <strong>Twitter:</strong>{" "}
              <a
                href="https://cards-dev.twitter.com/validator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter Card Validator
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/post-inspector/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn Post Inspector
              </a>
            </li>
            <li>
              <strong>General:</strong>{" "}
              <a
                href="https://www.opengraph.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenGraph.xyz Preview Tool
              </a>
            </li>
            <li>
              <strong>Microsoft Teams:</strong>{" "}
              <span className="text-gray-600">
                No public validator - paste your URL directly in Teams to see
                the preview
              </span>
            </li>
          </ul>
        </div>

        {/* What the HTML looks like */}
        <div className="bg-gray-800 text-gray-100 rounded-lg p-6 mt-8 font-mono text-sm">
          <h3 className="font-bold text-white mb-3">
            📄 Generated HTML Meta Tags:
          </h3>
          <pre className="overflow-x-auto">
            {`<head>
  <title>Employees | Team Management</title>
  <meta name="description" content="View and manage all employees..." />
  
  <!-- OpenGraph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Employees | Team Management" />
  <meta property="og:description" content="View and manage all employees..." />
  <meta property="og:url" content="https://learning-nextjs-16-with-tushar.vercel.app/employees" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Employees | Team Management" />
  <meta name="twitter:description" content="View and manage all employees..." />
</head>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
