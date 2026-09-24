import Reveal from "@/components/landing/Reveal";
import { facts, UPDATED_AT } from "../_content/content";

// «Коротко о воркшопе» — ответ-первым блок: самостоятельные факты,
// которые поисковики и ИИ-ассистенты могут процитировать дословно (GEO).
export default function Facts() {
  const updated = new Date(UPDATED_AT).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section className="section" id="about" aria-labelledby="facts-title">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Коротко</p>
          <h2 className="h2" id="facts-title" style={{ marginTop: 18 }}>Воркшоп «ИИ-агенты для руководителя» — главное</h2>
        </Reveal>
        <Reveal className="facts glass">
          <dl>
            {facts.map((f) => (
              <div className="facts-row" key={f.k}>
                <dt className="mono">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="facts-updated mono">Обновлено: <time dateTime={UPDATED_AT}>{updated}</time></p>
        </Reveal>
      </div>
    </section>
  );
}
