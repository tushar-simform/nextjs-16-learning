import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real app, you'd fetch actual employee/department IDs
  // from your database and generate dynamic URLs

  return [
    {
      url: "https://yourapp.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://yourapp.com/employees",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://yourapp.com/departments",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
