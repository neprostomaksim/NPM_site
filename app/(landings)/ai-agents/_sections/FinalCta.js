import Reveal from "@/components/landing/Reveal";
import { site } from "@/content/workshops/config";
import { workshop } from "../_content/content";

export default function FinalCta() {
  return (
    <section className="section-flush">
      <Reveal className="panel panel-bright aa-final">
        <p className="mono aa-final-kicker">{workshop.weekday}, {workshop.date} · {workshop.time} · {site.city}</p>
        <h2 className="h2 aa-final-title">Один вечер — и рутину делают ваши агенты</h2>
        <p className="aa-final-sub">Осталось {site.seatsLeft} места из {site.seatsTotal}. {site.price}.</p>
        <a className="btn btn-primary aa-btn-lg" href="#register" data-analytics-event="cta_clicked" data-analytics-location="final" data-workshop-id={workshop.id}>
          Забронировать место <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
