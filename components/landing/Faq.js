"use client";

import { useState } from "react";
import Reveal from "@/components/landing/Reveal";

// items — массив { q, a }. Тот же список стоит отдать в FAQPage JSON-LD лендинга.
export default function Faq({ items, title = "Частые вопросы" }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 48px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Вопросы</p>
          <h2 className="h2" style={{ marginTop: 16 }}>{title}</h2>
        </Reveal>

        <div className="faq-list">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className="faq-item glass" delay={i * 0.04}>
                <button
                  type="button"
                  className="faq-head"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={`faq-plus ${isOpen ? "open" : ""}`} />
                </button>
                <div id={`faq-answer-${i}`} inert={!isOpen} className={`faq-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="faq-answer">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
