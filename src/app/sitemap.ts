import { MetadataRoute } from "next";
import productsData from "@/data/products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aurelischemicals.vercel.app";

  // Base routes
  const routes = ["", "/about", "/industries", "/products", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Product routes
  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
