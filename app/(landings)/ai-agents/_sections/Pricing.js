import Reveal from "@/components/landing/Reveal";
import { Icon } from "@/components/landing/icons";
import RegistrationForm from "@/components/landing/RegistrationForm";
import { site } from "@/content/workshops/config";
import { included, workshop } from "../_content/content";

export default function Pricing() {
  const taken = site.seatsTotal - site.seatsLeft;
  const pct = Math.round((taken / site.seatsTotal) * 100);
  const rows = [
    { icon: "calendar", text: `${workshop.weekday}, ${workshop.date}` },
    { icon: "clock", text: `${workshop.time} · 3 часа` },
    { icon: "pin", text: `${site.venue}, ${site.city}` },
    { icon: "laptop", text: "Со своим ноутбуком" },
    { icon: "users", text: `Группа до ${site.seatsTotal} человек` },
  ];

  return (
    <section className="section" style={{ overflow: "hidden" }} id="price">
      <div
        className="glow"
        style={{
          width: 560, height: 560, top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(198,244,50,0.45),transparent 70%)",
        }}
      />
      <div className="container">
        <Reveal className="price-card glass-strong">
          <div className="badge badge-amber">
            <span className="pulse-dot" style={{ width: 7, height: 7 }} />
            Осталось {site.seatsLeft} места из {site.seatsTotal}
          </div>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,34px)", margin: "22px 0 24px" }}>
            Забронируйте место на {workshop.date}
          </h2>
          <div>
            {rows.map((r) => (
              <div className="detail-row" key={r.text}>
                <Icon name={r.icon} />
                <span>{r.text}</span>
              </div>
            ))}
          </div>
          <div className="seats">
            <div className="seats-head">
              <span>Занято мест</span>
              <span><b>{taken}</b> / {site.seatsTotal}</span>
            </div>
            <div className="seats-track">
              <div className="seats-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="divider" />
          <div className="price-num mono">{site.price}</div>
          <ul className="aa-included">
            {included.map((t) => (
              <li key={t}><span className="aa-check" aria-hidden="true">✓</span>{t}</li>
            ))}
          </ul>
          <RegistrationForm
            workshops={[workshop]}
            defaultWorkshopId={workshop.id}
            price={site.price}
            botUrl={site.telegramBotUrl}
            submitLabel="Забронировать место"
          />
          <p className="dim center" style={{ fontSize: 14, marginTop: 14 }}>
            Другие темы и даты — в <a href="/workshops#schedule" style={{ color: "var(--lime)" }}>расписании воркшопов</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
