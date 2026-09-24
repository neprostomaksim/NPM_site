import { client } from "../sanity/client";

const SITE_URL = "https://www.nempl.app";

// Динамический sitemap.xml: статические разделы + все статьи блога из Sanity.
// Sanity-запрос обёрнут в try/catch (как и остальные чтения в проекте):
// если CMS недоступна, отдаём хотя бы статические страницы.
export default async function sitemap() {
  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/corporate`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/workshops`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/ai-agents`, changeFrequency: "weekly", priority: 0.9 },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  let postRoutes = [];
  try {
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      "updatedAt": _updatedAt
    }`;
    const posts = await client.fetch(query, {}, { next: { revalidate: 60 } });
    postRoutes = (posts || []).map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error building sitemap from Sanity:", error);
  }

  return [...staticRoutes, ...postRoutes];
}
