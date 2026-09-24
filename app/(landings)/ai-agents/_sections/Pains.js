import Reveal from "@/components/landing/Reveal";
import { Icon } from "@/components/landing/icons";
import { pains } from "../_content/content";

export default function Pains() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Знакомо?</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Рутина съедает часы, которые можно было бы потратить на важное</h2>
        </Reveal>
        <div className="grid-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} className="how-card glass" delay={i * 0.08}>
              <div className="icon-badge"><Icon name={p.icon} /></div>
              <h3 className="aa-card-title">{p.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{p.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="aa-insight glass-strong" delay={0.2}>
          <p className="aa-insight-big">
            Личный ИИ-агент — это ChatGPT, который <span className="lime">уже знает вас</span>.
          </p>
          <p className="dim" style={{ fontSize: 17, maxWidth: 440 }}>
            Ваши задачи, стиль и правила. Объясняете один раз — дальше он делает сам.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
