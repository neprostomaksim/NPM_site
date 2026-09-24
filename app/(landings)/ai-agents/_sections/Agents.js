import Reveal from "@/components/landing/Reveal";
import { Icon } from "@/components/landing/icons";
import { agents, workshop } from "../_content/content";

export default function Agents() {
  return (
    <section className="section" id="agents">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Что вы соберёте</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Выберите 2–3 агента под свои задачи</h2>
          <p className="lead" style={{ marginTop: 16 }}>Каждого собираете сами, на своих примерах, — и забираете с собой.</p>
        </Reveal>
        <div className="aa-agents">
          {agents.map((a, i) => (
            <Reveal key={a.name} className="aa-agent-card glass" delay={(i % 2) * 0.08}>
              <div className="aa-agent-top">
                <div className="icon-badge" style={{ marginBottom: 0 }}><Icon name={a.icon} /></div>
                <span className="mono aa-agent-num">0{i + 1}</span>
              </div>
              <h3 className="aa-card-title" style={{ marginTop: 22 }}>{a.name}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{a.text}</p>
              <div className="aa-io mono">
                <span className="aa-io-in">{a.input}</span>
                <span className="aa-io-arrow" aria-hidden="true">→</span>
                <span className="aa-io-out">{a.output}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="aa-center" style={{ marginTop: 44 }}>
          <a className="btn btn-primary" href="#register" data-analytics-event="cta_clicked" data-analytics-location="agents" data-workshop-id={workshop.id}>
            Хочу своих агентов <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
