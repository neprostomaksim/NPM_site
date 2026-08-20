import { Montserrat, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-main",
  display: "swap",
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Максим Леонов — AI-наставник | Обучение ИИ, ChatGPT и нейросетям",
  description: "Максим Леонов — AI-наставник и эксперт по искусственному интеллекту. Воркшопы по ChatGPT и нейросетям, наставничество 1:1, корпоративное обучение ИИ. Основатель M.AI.N — крупнейшего AI-сообщества Беларуси. 350+ учеников.",
  keywords: ["AI наставник", "обучение ИИ", "ChatGPT курс", "промптинг", "нейросети обучение", "ИИ для бизнеса", "воркшоп искусственный интеллект", "Максим Леонов", "M.AI.N", "Беларусь", "Минск"],
  authors: [{ name: "Максим Леонов" }],
  creator: "Максим Леонов",
  robots: "index, follow",
  alternates: {
    canonical: "https://neprostomaksim.com/",
  },
  openGraph: {
    type: "website",
    url: "https://neprostomaksim.com/",
    title: "Максим Леонов — AI-наставник | Обучение ИИ и ChatGPT",
    description: "Воркшопы по нейросетям, наставничество 1:1 и корпоративное обучение ИИ. Основатель M.AI.N — крупнейшего AI-сообщества Беларуси (2500+ участников). 350+ учеников.",
    images: [
      {
        url: "https://neprostomaksim.com/uploads/A_detailed_8k_cinematic_portrait_photograph_based__delpmaspu.png",
        width: 1200,
        height: 630,
        alt: "Максим Леонов AI Наставник",
      },
    ],
    locale: "ru_RU",
    siteName: "Максим Леонов | AI-наставник",
  },
  twitter: {
    card: "summary_large_image",
    title: "Максим Леонов — AI-наставник | Обучение нейросетям",
    description: "Воркшопы по ChatGPT, наставничество 1:1 и корпоративное обучение ИИ. 40 000+ аудитория, 350+ учеников.",
    images: ["https://neprostomaksim.com/uploads/A_detailed_8k_cinematic_portrait_photograph_based__delpmaspu.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Максим Леонов",
    "jobTitle": "AI-наставник, эксперт по искусственному интеллекту",
    "description": "Провожу воркшопы по ChatGPT и нейросетям, личное наставничество 1:1 и корпоративное обучение ИИ. Основатель M.AI.N — крупнейшего AI-сообщества Беларуси.",
    "url": "https://neprostomaksim.com",
    "sameAs": [
      "https://instagram.com/neprostomaksim",
      "https://t.me/leonovmax",
      "https://t.me/neprostonewsai"
    ],
    "knowsAbout": [
      "Искусственный интеллект",
      "ChatGPT",
      "Промптинг",
      "Нейросети",
      "ИИ для бизнеса",
      "Claude AI",
      "Midjourney",
      "AI-автоматизация"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BY",
      "addressLocality": "Минск"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Воркшоп по ChatGPT и нейросетям",
        "description": "Групповые практические интенсивы по работе с ИИ-инструментами"
      },
      {
        "@type": "Offer",
        "name": "Наставничество по ИИ 1:1",
        "description": "Персональная работа по внедрению искусственного интеллекта"
      },
      {
        "@type": "Offer",
        "name": "Корпоративное обучение ИИ",
        "description": "Программы по искусственному интеллекту для команд и компаний"
      },
      {
        "@type": "Offer",
        "name": "Внедрение ИИ для бизнеса",
        "description": "Аудит процессов и сопровождение внедрения ИИ от стратегии до результата"
      }
    ]
  };

  return (
    <html lang="ru" className={`${montserrat.variable} ${anonymousPro.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics site="nempl.app" />
      </body>
    </html>
  );
}
