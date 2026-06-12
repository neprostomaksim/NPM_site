import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-with-your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-04",
  useCdn: true, // Use Edge CDN cache for fast page loads
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}
