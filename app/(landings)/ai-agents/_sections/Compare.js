import Reveal from "@/components/landing/Reveal";
import { compare } from "../_content/content";

// Ответ на главное возражение: «у меня уже есть ChatGPT».
export default function Compare() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>У меня уже есть ChatGPT</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Чем агент отличается от обычного чата</h2>
        </Reveal>
        <Reveal className="aa-compare">
          <div className="aa-compare-col glass">
            <p className="aa-compare-head mono">Обычный чат</p>
            <ul>
              {compare.map((r) => (
                <li key={r.chat}><span className="aa-x" aria-hidden="true">×</span>{r.chat}</li>
              ))}
            </ul>
          </div>
          <div className="aa-compare-col aa-compare-win glass-strong">
            <p className="aa-compare-head mono lime">Личный ИИ-агент</p>
            <ul>
              {compare.map((r) => (
                <li key={r.agent}><span className="aa-check" aria-hidden="true">✓</span>{r.agent}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
