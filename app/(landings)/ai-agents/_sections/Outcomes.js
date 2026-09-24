import Reveal from "@/components/landing/Reveal";
import { Icon } from "@/components/landing/icons";
import { outcomes } from "../_content/content";

export default function Outcomes() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Результат</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Уходите с командой помощников</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Не конспект, а рабочие ИИ-помощники, собранные на ваших реальных задачах.
          </p>
        </Reveal>
        <div className="grid-3">
          {outcomes.map((c, i) => (
            <Reveal key={c.title} className="how-card glass" delay={i * 0.08}>
              <div className="icon-badge"><Icon name={c.icon} /></div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
