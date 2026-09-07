import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Nav, Footer } from "../../home-client";
import { client, urlFor } from "../../../sanity/client";

// Fetch post from Sanity
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    mainImage,
    body,
    seoTitle,
    seoDescription
  }`;
  try {
    return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate dynamic SEO metadata per article
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Статья не найдена | Максим Леонов",
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDesc = post.seoDescription || post.excerpt;
  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : null;

  return {
    title: `${seoTitle} | Блог Максима Леонова`,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : [],
    },
  };
}

// Custom serializers for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const imgUrl = urlFor(value).width(900).url();
      return (
        <figure style={{ margin: "40px 0" }}>
          <img
            src={imgUrl}
            alt={value.alt || "Изображение статьи"}
            style={{ width: "100%", borderRadius: "2px", display: "block", maxHeight: "550px", objectFit: "cover" }}
          />
          {value.alt && (
            <figcaption style={{ fontSize: "13px", color: "var(--coal-light)", marginTop: "12px", fontFamily: "var(--font-mono)", textAlign: "center" }}>
              // {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      if (!value || !value.code) return null;
      return (
        <div style={{
          margin: "32px 0",
          background: "var(--coal)",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid rgba(247, 247, 243, 0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}>
          {/* Header bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "rgba(0,0,0,0.2)",
            borderBottom: "1px solid rgba(247, 247, 243, 0.05)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            color: "var(--coal-light)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
              {value.filename && (
                <span style={{ marginLeft: "10px", color: "var(--chalk-dim)", fontWeight: "500" }}>{value.filename}</span>
              )}
            </div>
            {value.language && (
              <span style={{
                textTransform: "uppercase",
                background: "rgba(200, 230, 32, 0.1)",
                color: "var(--lime)",
                padding: "2px 8px",
                borderRadius: "3px",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.05em"
              }}>{value.language}</span>
            )}
          </div>
          {/* Code display */}
          <pre style={{
            margin: 0,
            padding: "24px",
            overflowX: "auto",
            fontSize: "14px",
            lineHeight: "1.6",
            fontFamily: "var(--font-mono), monospace",
            color: "var(--chalk-dim)",
            background: "transparent"
          }}>
            <code>{value.code}</code>
          </pre>
        </div>
      );
    },
    table: ({ value }) => {
      const rows = value?.rows;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      const [head, ...body] = rows;
      return (
        <div style={{ margin: "32px 0", overflowX: "auto", border: "1px solid rgba(42,42,38,.1)", borderRadius: "4px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", minWidth: "480px" }}>
            <thead>
              <tr>
                {(head?.cells || []).map((cell, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "14px 18px",
                      background: "var(--coal)",
                      color: "var(--chalk)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      borderBottom: "2px solid var(--lime)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={row?._key || r} style={{ background: r % 2 ? "var(--chalk-dim)" : "#fff" }}>
                  {(row?.cells || []).map((cell, c) => (
                    <td
                      key={c}
                      style={{
                        padding: "13px 18px",
                        color: "var(--coal-mid)",
                        lineHeight: 1.6,
                        borderBottom: "1px solid rgba(42,42,38,.08)",
                        verticalAlign: "top",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 700, margin: "48px 0 20px", color: "var(--coal)", lineHeight: 1.25, letterSpacing: "-0.015em" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 700, margin: "36px 0 16px", color: "var(--coal)", lineHeight: 1.3 }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ fontSize: "16px", lineHeight: "1.75", color: "var(--coal-mid)", marginBottom: "24px" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: "3px solid var(--lime)", paddingLeft: "24px", margin: "40px 0", fontSize: "18px", fontStyle: "italic", color: "var(--coal)", lineHeight: 1.6 }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ listStyleType: "disc", paddingLeft: "24px", marginBottom: "24px" }}>{children}</ul>,
    number: ({ children }) => <ol style={{ listStyleType: "decimal", paddingLeft: "24px", marginBottom: "24px" }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ fontSize: "16px", color: "var(--coal-mid)", lineHeight: "1.75", marginBottom: "10px" }}>{children}</li>,
    number: ({ children }) => <li style={{ fontSize: "16px", color: "var(--coal-mid)", lineHeight: "1.75", marginBottom: "10px" }}>{children}</li>,
  },
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null;

  return (
    <>
      <Nav />
      <article style={{ paddingTop: "120px", background: "var(--chalk)", minHeight: "90vh", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          
          {/* Breadcrumbs / Back button */}
          <div style={{ marginBottom: "32px" }}>
            <Link href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--coal-light)", display: "inline-flex", alignItems: "center", gap: "6px" }} className="blog-link">
              ← Назад в блог
            </Link>
          </div>

          {/* Date & Title */}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--coal-light)", marginBottom: "16px" }}>
            {dateStr}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 48px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--coal)", marginBottom: "32px" }}>
            {post.title}
          </h1>

          {/* Highlighted Lead text (Excerpt) */}
          <div style={{ fontSize: "18px", lineHeight: "1.65", color: "var(--coal)", fontWeight: "500", borderLeft: "2px solid var(--coal-light)", paddingLeft: "20px", marginBottom: "40px" }}>
            {post.excerpt}
          </div>

          {/* Cover image */}
          {imageUrl && (
            <div style={{ width: "100%", height: "clamp(250px, 45vh, 450px)", overflow: "hidden", marginBottom: "48px", position: "relative" }}>
              <img
                src={imageUrl}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Rich Text Body */}
          <div className="post-content">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Bottom Call to Action */}
          <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid rgba(42,42,38,.08)", textAlign: "center" }}>
            <span className="section-label" style={{ marginBottom: "20px" }}>// интересное_рядом</span>
            <p style={{ fontSize: "16px", color: "var(--coal-mid)", marginBottom: "32px" }}>
              Хотите регулярно получать практические лайфхаки по работе с ИИ? Подписывайтесь на мой Telegram-канал.
            </p>
            <a href="https://t.me/neprostonewsai" target="_blank" rel="noopener" className="btn btn-primary">
              Подписаться на Telegram
            </a>
          </div>

        </div>
      </article>
      <Footer />
    </>
  );
}
