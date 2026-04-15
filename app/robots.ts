import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/unauthorized"], // Don't index auth pages
      },
    ],
    sitemap: "https://yourapp.com/sitemap.xml",
  };
}
