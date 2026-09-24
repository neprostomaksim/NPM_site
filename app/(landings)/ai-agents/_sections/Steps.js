import Reveal from "@/components/landing/Reveal";
import { steps } from "../_content/content";

export default function Steps() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Как это проходит</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Три шага — и агент работает на вас</h2>
        </Reveal>
        <ol className="aa-steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="aa-step glass" delay={i * 0.08}>
              <span className="tile mono">{i + 1}</span>
              <h3 className="aa-card-title" style={{ marginTop: 22 }}>{s.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
