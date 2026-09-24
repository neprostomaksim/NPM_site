import Reveal from "@/components/landing/Reveal";
import { program, workshop } from "../_content/content";

export default function Program() {
  return (
    <section className="section" id="program" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Программа · {workshop.time} · 3 часа</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Как пройдёт вечер</h2>
        </Reveal>
        <ol className="timeline" style={{ listStyle: "none", padding: 0 }}>
          {program.map((s, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <Reveal as="li" key={s.name} className={`tl-item tl-${side}`} delay={0.05}>
                <span className="tl-node" />
                <div className={`tl-card glass ${s.main ? "prog-main" : ""}`.trim()}>
                  <div className="tl-time mono">{s.start} – {s.end}</div>
                  {s.main && <span className="prog-tag">Практика</span>}
                  <div className="tl-head">
                    <span className="tl-num mono">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="tl-name">{s.name}</h3>
                  </div>
                  <p className="dim tl-text">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
