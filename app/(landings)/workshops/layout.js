import { Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/components/landing/glass-theme.css";
import Analytics from "@/components/Analytics";
import MarketingAnalytics from "@/components/landing/MarketingAnalytics";
import MetaPixel from "@/components/landing/MetaPixel";
import StructuredData from "./_sections/StructuredData";

// Корневой layout лендинга. У лендингов свой <html>/<body> и свои стили,
// поэтому тёмная тема здесь не пересекается со светлой темой сайта в app/(site).

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

export const metadata = {
  metadataBase: new URL("https://www.nempl.app"),
  title: "Воркшопы по ИИ в Минске для бизнеса · Максим Леонов",
  description:
    "Практические воркшопы по ИИ в Минске: ИИ-агенты, вайб-кодинг и ИИ-менеджер. За 3 часа создайте рабочий результат на своих задачах.",
  keywords: [
    "воркшопы по ИИ Минск",
    "обучение нейросетям Минск",
    "ИИ для бизнеса",
    "вайб-кодинг",
    "ИИ-агенты",
    "курсы искусственного интеллекта Минск",
  ],
  authors: [{ name: "Максим Леонов", url: "https://www.nempl.app" }],
  creator: "Максим Леонов",
  publisher: "Максим Леонов",
  category: "education",
  alternates: {
    canonical: "/workshops",
    languages: { "ru-BY": "/workshops" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Практические воркшопы по ИИ в Минске",
    description:
      "ИИ-помощники, первый продукт и автоматизация продаж. Практические воркшопы с Максимом Леоновым в Минске.",
    url: "/workshops",
    siteName: "Воркшопы по ИИ с Максимом Леоновым",
    type: "website",
    locale: "ru_BY",
    images: [
      {
        url: "/workshops/hero-bg.jpg",
        width: 1024,
        height: 571,
        alt: "Практический воркшоп по ИИ в Минске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Практические воркшопы по ИИ в Минске",
    description: "За 3 часа создайте ИИ-помощника, бота или первый продукт на своих задачах.",
    images: ["/workshops/hero-bg.jpg"],
  },
};

export const viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
};

export default function WorkshopsLayout({ children }) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <StructuredData />
        {children}
        {/* Метка "workshopkopeek" сохранена, чтобы статистика лендинга
            в платформе не разорвалась после переезда на nempl.app. */}
        <Analytics site="workshopkopeek" />
        <MarketingAnalytics />
        <MetaPixel />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
