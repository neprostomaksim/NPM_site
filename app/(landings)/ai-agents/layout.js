import { Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/components/landing/glass-theme.css";
import "./landing.css";
import Analytics from "@/components/Analytics";
import MarketingAnalytics from "@/components/landing/MarketingAnalytics";
import MetaPixel from "@/components/landing/MetaPixel";
import StructuredData from "./_sections/StructuredData";
import { LANDING_PATH, workshop } from "./_content/content";

// Лендинг одного воркшопа. Свой корневой layout (см. CLAUDE.md → «Layout of the ecosystem»).

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  // Вариативный шрифт: один файл на алфавит вместо файла на каждую жирность.
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  // Моноширинный — только в мелких подписях: не предзагружаем, чтобы не мешал первой отрисовке.
  preload: false,
});

const title = `Личные ИИ-агенты за один вечер — воркшоп ${workshop.date}, Минск`;
const description =
  "За 3 часа соберите личных ИИ-агентов для встреч, контента, документов и поиска информации. Без кода. Минск, 29 сентября, 18:30, 130 BYN.";

// OG-картинка берётся автоматически из opengraph-image.js в этой папке.
export const metadata = {
  metadataBase: new URL("https://www.nempl.app"),
  title,
  description,
  keywords: [
    "ИИ-агенты",
    "личный ИИ-ассистент",
    "как создать ИИ-агента",
    "воркшоп по ИИ Минск",
    "обучение нейросетям Минск",
    "ИИ-помощник для бизнеса",
    "автоматизация рутины с ИИ",
    "ChatGPT для руководителей",
    "Максим Леонов",
  ],
  authors: [{ name: "Максим Леонов", url: "https://www.nempl.app" }],
  creator: "Максим Леонов",
  publisher: "Максим Леонов",
  category: "education",
  alternates: { canonical: LANDING_PATH },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: `Личные ИИ-агенты за один вечер — ${workshop.date}, Минск`,
    description: "Соберите ИИ-помощников, которые знают ваши задачи и стиль. Без кода, на своих задачах, за 3 часа.",
    url: LANDING_PATH,
    siteName: "Максим Леонов — AI-наставник",
    type: "website",
    locale: "ru_BY",
  },
  twitter: {
    card: "summary_large_image",
    title: `Личные ИИ-агенты за один вечер — ${workshop.date}, Минск`,
    description: "Соберите ИИ-помощников, которые знают ваши задачи и стиль. Без кода, за 3 часа.",
  },
};

export const viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
};

export default function AiAgentsLayout({ children }) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <StructuredData />
        {children}
        <Analytics site="nempl.app" />
        <MarketingAnalytics />
        <MetaPixel />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
