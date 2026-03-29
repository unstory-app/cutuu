import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/landing", "/login", "/register"],
        disallow: ["/api/", "/handler/", "/chat/", "/memories/"],
      },
    ],
    sitemap: "https://cutuu.unstory.app/sitemap.xml",
  };
}
