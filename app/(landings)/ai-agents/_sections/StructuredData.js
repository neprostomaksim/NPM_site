import { site } from "@/content/workshops/config";
import { LANDING_URL, PRICE_BYN, UPDATED_AT, agents, endsAt, faq, workshop } from "../_content/content";

// JSON-LD лендинга: событие (с ценой, местами и площадкой), FAQ,
// хлебные крошки и сама страница. Это то, что Google показывает в
// расширенных сниппетах и на что опираются ИИ-поисковики (GEO).
export default function StructuredData() {
  const personId = "https://www.nempl.app/#maxim-leonov";
  const eventId = `${LANDING_URL}#event`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${LANDING_URL}#webpage`,
      url: LANDING_URL,
      name: `${workshop.title} — воркшоп по ИИ-агентам ${workshop.date} в Минске`,
      description: `${workshop.tagline}. Практический воркшоп Максима Леонова в Минске: 3 часа, без кода, на своих задачах.`,
      inLanguage: "ru-BY",
      dateModified: UPDATED_AT,
      about: { "@id": eventId },
      breadcrumb: { "@id": `${LANDING_URL}#breadcrumb` },
      isPartOf: { "@type": "WebSite", "@id": "https://www.nempl.app/#website", url: "https://www.nempl.app", name: "Максим Леонов — AI-наставник" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${LANDING_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://www.nempl.app/" },
        { "@type": "ListItem", position: 2, name: "Воркшопы", item: "https://www.nempl.app/workshops" },
        { "@type": "ListItem", position: 3, name: workshop.title, item: LANDING_URL },
      ],
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Максим Леонов",
      url: "https://www.nempl.app",
      image: "https://www.nempl.app/workshops/speaker.jpg",
      jobTitle: "AI-эксперт и преподаватель",
      sameAs: [site.speaker.instagramUrl, site.speaker.telegramUrl],
    },
    {
      "@type": "EducationEvent",
      "@id": eventId,
      name: workshop.title,
      description: workshop.desc,
      startDate: workshop.startsAt,
      endDate: endsAt,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      inLanguage: "ru-BY",
      image: "https://www.nempl.app/workshops/hero-bg.jpg",
      url: LANDING_URL,
      educationalLevel: "beginner",
      teaches: ["Создание личных ИИ-агентов без программирования", ...agents.map((a) => a.name)],
      maximumAttendeeCapacity: site.seatsTotal,
      remainingAttendeeCapacity: site.seatsLeft,
      isAccessibleForFree: false,
      organizer: { "@id": personId },
      performer: { "@id": personId },
      location: {
        "@type": "Place",
        name: site.venue,
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "BY" },
      },
      offers: {
        "@type": "Offer",
        url: `${LANDING_URL}#register`,
        price: PRICE_BYN,
        priceCurrency: "BYN",
        availability: site.seatsLeft > 0 ? "https://schema.org/LimitedAvailability" : "https://schema.org/SoldOut",
        validFrom: "2026-09-01T00:00:00+03:00",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${LANDING_URL}#faq`,
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
