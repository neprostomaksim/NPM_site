import HomeClient from "./home-client";
import { client } from "../sanity/client";

async function getRecentPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
    title,
    "slug": slug.current,
    "date": publishedAt,
    excerpt
  }`;
  try {
    const posts = await client.fetch(query, {}, { next: { revalidate: 60 } });
    if (!posts || posts.length === 0) {
      return null;
    }
    return posts.map((p) => ({
      date: p.date
        ? new Date(p.date).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
      title: p.title,
      excerpt: p.excerpt,
      slug: p.slug,
    }));
  } catch (error) {
    console.error("Error fetching recent posts from Sanity:", error);
    return null;
  }
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  // Temporary mock fallback posts if Sanity database is empty or not yet connected
  const fallbackPosts = [
    {
      date: "28.05.2026",
      title: "100 команд для Claude, которые в 3 раза увеличат эффективность",
      excerpt: "Готовые промпты под реальные рабочие задачи — сохрани, чтобы не потерять.",
    },
    {
      date: "14.05.2026",
      title: "7 нейросетей, о которых все молчат",
      excerpt: "Инструменты вне радара, которые уже решают задачи лучше ChatGPT.",
    },
    {
      date: "02.05.2026",
      title: "PowerPoint — всё. Что используют вместо него с ИИ",
      excerpt: "Разбираем AI-инструменты, которые полностью закрывают задачу презентаций.",
    },
  ];

  return <HomeClient initialPosts={recentPosts || fallbackPosts} />;
}
