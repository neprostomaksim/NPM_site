"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/workshops/config";
import { workshop } from "../_content/content";

// Липкая кнопка записи на телефоне: появляется после первого экрана
// и прячется, когда на экране уже форма записи.
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("register");
    let formVisible = false;
    const io = form
      ? new IntersectionObserver(([e]) => {
          formVisible = e.isIntersecting;
          setShow(window.scrollY > 560 && !formVisible);
        })
      : null;
    if (form) io.observe(form);
    const onScroll = () => setShow(window.scrollY > 560 && !formVisible);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div className={`mobile-bar glass-strong ${show ? "show" : ""}`} aria-hidden={!show}>
      <div>
        <b style={{ fontSize: 15 }}>{workshop.date} · {site.price}</b>
        <div className="dim" style={{ fontSize: 12.5 }}>Осталось {site.seatsLeft} места</div>
      </div>
      <a className="btn btn-primary" href="#register" tabIndex={show ? 0 : -1} data-analytics-event="cta_clicked" data-analytics-location="mobile_bar" data-workshop-id={workshop.id}>
        Записаться
      </a>
    </div>
  );
}
