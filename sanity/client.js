import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-with-your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-04",
  useCdn: true, // Use Edge CDN cache for fast page loads
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return null;
  // auto("format"): Sanity CDN отдаёт WebP/AVIF тем браузерам, что их понимают,
  // вместо исходного PNG (на главной это экономило ~1 МБ).
  return builder.image(source).auto("format");
}
