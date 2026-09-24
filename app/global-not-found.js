import Link from "next/link";
import { Montserrat, Anonymous_Pro } from "next/font/google";
import "./(site)/globals.css";

// 404 для адресов, которые не совпали ни с одним маршрутом. Нужен потому, что
// у сайта и лендингов разные корневые layout'ы и общего app/layout.js нет.

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "800"],
  variable: "--font-main",
  display: "swap",
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Страница не найдена | Максим Леонов",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={`${montserrat.variable} ${anonymousPro.variable}`}>
      <body>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div className="container">
            <span className="section-label">{"// ошибка_404"}</span>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Такой страницы нет
            </h1>
            <p style={{ color: "var(--coal-mid)", fontSize: 17, marginBottom: 36, maxWidth: 520, lineHeight: 1.6 }}>
              Возможно, ссылка устарела или в адресе опечатка.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary">На главную</Link>
              <Link href="/workshops" className="btn btn-outline">Воркшопы</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
