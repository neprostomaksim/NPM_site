import Link from "next/link";
import { Nav, Footer } from "../home-client";
import { client, urlFor } from "../../sanity/client";

export const metadata = {
  title: "Блог об ИИ и нейросетях | Максим Леонов",
  description: "Практические инструкции по ChatGPT, разборы кейсов, анонсы воркшопов и актуальные новости искусственного интеллекта от AI-наставника Максима Леонова.",
};

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage
  }`;
  try {
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "120px", minHeight: "85vh", background: "var(--chalk-dim)" }}>
        <div className="container">
          <span className="section-label">// база_знаний_об_ии</span>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 800, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            Блог об ИИ и нейросетях
          </h1>
          <p style={{ color: "var(--coal-mid)", fontSize: "16px", maxWidth: "600px", marginBottom: "60px", lineHeight: 1.65 }}>
            Практические статьи, разборы кейсов внедрения нейросетей, анонсы предстоящих встреч и воркшопов. Всё самое актуальное для вашей работы и бизнеса.
          </p>

          {posts.length === 0 ? (
            <div style={{ padding: "100px 0", textAlign: "center", background: "#fff", border: "1px solid rgba(42,42,38,.05)" }}>
              <p style={{ color: "var(--coal-light)", fontFamily: "var(--font-mono)", fontSize: "15px" }}>
                // Здесь пока пусто. Первые статьи появятся уже очень скоро!
              </p>
            </div>
          ) : (
            <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "32px", marginBottom: "80px" }}>
              {posts.map((p) => {
                const dateStr = p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "";
                const imageUrl = p.mainImage ? urlFor(p.mainImage).width(600).height(400).url() : null;

                return (
                  <article key={p.slug} className="blog-card" style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff", padding: 0 }}>
                    {imageUrl && (
                      <Link href={`/blog/${p.slug}`} style={{ width: "100%", height: "210px", overflow: "hidden", borderBottom: "1px solid rgba(42,42,38,.04)", display: "block" }}>
                        <img
                          src={imageUrl}
                          alt={p.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                          className="blog-image-hover"
                        />
                      </Link>
                    )}
                    <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div className="blog-date">{dateStr}</div>
                      <h3 style={{ fontSize: "20px", fontWeight: "700", lineHeight: "1.35", marginBottom: "14px" }}>
                        <Link href={`/blog/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {p.title}
                        </Link>
                      </h3>
                      <p style={{ fontSize: "14px", color: "var(--coal-mid)", lineHeight: "1.65", flex: 1 }}>
                        {p.excerpt}
                      </p>
                      <Link href={`/blog/${p.slug}`} className="blog-link" style={{ marginTop: "24px" }}>
                        читать →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Styles for dynamic zoom inside Next.js */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card:hover .blog-image-hover {
          transform: scale(1.04);
        }
      `}} />
    </>
  );
}
