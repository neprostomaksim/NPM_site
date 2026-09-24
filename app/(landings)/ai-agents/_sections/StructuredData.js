import { site } from "@/content/workshops/config";
import { LANDING_URL, PRICE_BYN, UPDATED_AT, endsAt, faq, outcomes, workshop } from "../_content/content";

// JSON-LD лендинга: событие (с ценой, местами и площадкой), FAQ,
// хлебные крошки и сама страница. Это то, что Google показывает в
// расширенных сниппетах и на что опираются ИИ-поисковики (GEO).
export default function StructuredData() {
  const personId = "https://nempl.app/#maxim-leonov";
  const eventId = `${LANDING_URL}#event`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${LANDING_URL}#webpage`,
      url: LANDING_URL,
      name: `${workshop.title} — воркшоп ${workshop.date} в Минске`,
      description: `${workshop.tagline}. Практический воркшоп Максима Леонова: 3 часа, без кода, на своих задачах.`,
      inLanguage: "ru-BY",
      dateModified: UPDATED_AT,
      about: { "@id": eventId },
      breadcrumb: { "@id": `${LANDING_URL}#breadcrumb` },
      isPartOf: { "@type": "WebSite", "@id": "https://nempl.app/#website", url: "https://nempl.app", name: "Максим Леонов — AI-наставник" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${LANDING_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://nempl.app/" },
        { "@type": "ListItem", position: 2, name: "Воркшопы", item: "https://nempl.app/workshops" },
        { "@type": "ListItem", position: 3, name: workshop.title, item: LANDING_URL },
      ],
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Максим Леонов",
      url: "https://nempl.app",
      image: "https://nempl.app/workshops/speaker.jpg",
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
      image: "https://nempl.app/workshops/hero-bg.jpg",
      url: LANDING_URL,
      educationalLevel: "beginner",
      teaches: outcomes.map((o) => o.title),
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
