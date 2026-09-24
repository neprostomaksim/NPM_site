import Reveal from "@/components/landing/Reveal";
import { Icon } from "@/components/landing/icons";
import { audience, notFor } from "../_content/content";

export default function Audience() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Для кого</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Для всех, у кого много повторяющихся задач</h2>
        </Reveal>
        <div className="grid-3">
          {audience.map((c, i) => (
            <Reveal key={c.title} className="how-card glass" delay={i * 0.08}>
              <div className="icon-badge"><Icon name={c.icon} /></div>
              <h3 className="aa-card-title">{c.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{c.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="dim aa-center" style={{ marginTop: 28, fontSize: 15 }}>{notFor}</Reveal>
      </div>
    </section>
  );
}
