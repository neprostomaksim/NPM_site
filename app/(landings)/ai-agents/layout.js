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
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const title = `ИИ-агенты для руководителя — воркшоп ${workshop.date} в Минске | Максим Леонов`;
const description =
  "Практический воркшоп в Минске: за 3 часа соберите ИИ-помощников для встреч, договоров и документов. Без кода, на своих задачах. 29 сентября, 18:30, 130 BYN.";

// OG-картинка берётся автоматически из opengraph-image.js в этой папке.
export const metadata = {
  metadataBase: new URL("https://nempl.app"),
  title,
  description,
  keywords: [
    "ИИ-агенты",
    "ИИ для руководителя",
    "воркшоп по ИИ Минск",
    "обучение нейросетям Минск",
    "ИИ-помощник для бизнеса",
    "автоматизация рутины с ИИ",
    "ChatGPT для руководителей",
    "Максим Леонов",
  ],
  authors: [{ name: "Максим Леонов", url: "https://nempl.app" }],
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
    title: `ИИ-агенты для руководителя — ${workshop.date}, Минск`,
    description: "За 3 часа соберите ИИ-помощников для встреч, договоров и документов. Без кода, на своих задачах.",
    url: LANDING_PATH,
    siteName: "Максим Леонов — AI-наставник",
    type: "website",
    locale: "ru_BY",
  },
  twitter: {
    card: "summary_large_image",
    title: `ИИ-агенты для руководителя — ${workshop.date}, Минск`,
    description: "За 3 часа соберите ИИ-помощников для встреч, договоров и документов.",
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
