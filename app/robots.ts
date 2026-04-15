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
    sitemap: "https://learning-nextjs-16-with-tushar.vercel.app/sitemap.xml",
  };
}
