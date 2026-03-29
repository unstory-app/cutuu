import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://cutuu.unstory.app/landing",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://cutuu.unstory.app/login",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://cutuu.unstory.app/register",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
