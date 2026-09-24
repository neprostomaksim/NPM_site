const SITE_URL = "https://www.nempl.app";

// robots.txt — открываем сайт для всех поисковых и AI-краулеров,
// закрываем только Sanity Studio (/admin). AI-боты (GPTBot, PerplexityBot,
// ClaudeBot, Google-Extended) намеренно НЕ блокируются — это условие
// цитируемости в AI-ответах.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
