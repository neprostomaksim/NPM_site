"use client";

import React from "react";
import Link from "next/link";

/* ── HOOKS ── */
function useScrollReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, active, duration = 2000) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // Easing out cubic
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function smoothTo(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 72,
      behavior: "smooth",
    });
  }
}

/* ── COMPONENTS ── */

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, id) => {
    // If we're on the home page, scroll smoothly.
    if (window.location.pathname === "/") {
      e.preventDefault();
      setOpen(false);
      smoothTo(id);
    }
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link
          href="/"
          className="nav-brand"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          НЕ ПРОСТО МАКСИМ
        </Link>
        <div className="nav-center">
          <Link href="/#about" onClick={(e) => go(e, "about")}>
            Обо мне
          </Link>
          <Link href="/#services" onClick={(e) => go(e, "services")}>
            Услуги
          </Link>
          <Link href="/blog">Блог</Link>
        </div>
        <div className="nav-cta">
          <Link href="/#cta" className="btn btn-primary" onClick={(e) => go(e, "cta")}>
            Записаться
          </Link>
        </div>
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div
        className={`mobile-menu${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="close-btn"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
        >
          ×
        </button>
        <Link href="/#about" onClick={(e) => go(e, "about")}>
          Обо мне
        </Link>
        <Link href="/#services" onClick={(e) => go(e, "services")}>
          Услуги
        </Link>
        <Link href="/blog" onClick={() => setOpen(false)}>
          Блог
        </Link>
        <Link
          href="/#cta"
          className="btn btn-primary"
          onClick={(e) => go(e, "cta")}
        >
          Записаться
        </Link>
      </div>
    </>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="hero-tag">// AI_НАСТАВНИК · M.AI.N COMMUNITY</span>
        <h1 style={{ fontSize: "70px" }}>
          Освой ИИ —<br />
          будущее станет <span className="lime-mark">твоим</span>
          <span className="cursor-blink" />
        </h1>
        <p className="hero-subtitle">
          Воркшопы по&nbsp;ChatGPT и&nbsp;нейросетям, личное наставничество и&nbsp;корпоративное обучение для&nbsp;тех, кто хочет использовать ИИ на&nbsp;полную мощность
        </p>
        <div className="hero-buttons">
          <a
            href="#cta"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              smoothTo("cta");
            }}
          >
            Записаться →
          </a>
          <a
            href="#services"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              smoothTo("services");
            }}
          >
            Узнать больше
          </a>
        </div>
      </div>
      <div className="hero-photo">
        <img
          src="/uploads/A_detailed_8k_cinematic_portrait_photograph_based__delpmaspu.png"
          alt="Максим Леонов — AI-наставник, эксперт по искусственному интеллекту"
          loading="eager"
        />
        <span className="hero-scroll">↓ scroll</span>
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = [
    "НЕЙРОСЕТИ",
    "АВТОМАТИЗАЦИЯ",
    "ПРОМПТИНГ",
    "CHATGPT",
    "CLAUDE",
    "MIDJOURNEY",
    "AI-АГЕНТЫ",
    "СТРАТЕГИЯ",
    "M.AI.N",
    "ИИ ДЛЯ БИЗНЕСА",
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <div className="marquee-dot" />
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content">
          {items.map((item, i) => (
            <React.Fragment key={`dup-${i}`}>
              <span>{item}</span>
              <div className="marquee-dot" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── NUMBERS ── */
function StatItem({ stat, visible, delay }) {
  const count = useCountUp(stat.target, visible, 2200);
  const formatted =
    stat.target >= 1000
      ? new Intl.NumberFormat("ru-RU").format(count)
      : String(count);
  return (
    <div
      className={`stat-item reveal-up${visible ? " visible" : ""}`}
      style={{ transitionDelay: delay + "ms" }}
    >
      <div className="stat-number">
        <span style={{ color: "#c8e620" }}>{formatted}</span>
        <span className="stat-plus">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

function Numbers() {
  const [ref, visible] = useScrollReveal(0.25);
  const stats = [
    { target: 40000, suffix: "+", label: "аудитория в соц. сетях" },
    { target: 350, suffix: "+", label: "учеников уже работают с ИИ" },
    { target: 2500, suffix: "+", label: "участников сообщества M.AI.N" },
  ];
  return (
    <section className="numbers" ref={ref} aria-label="Ключевые показатели">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} visible={visible} delay={i * 180} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function Services() {
  const [ref, visible] = useScrollReveal();
  const cards = [
    {
      index: "01",
      title: "Воркшопы",
      desc: "Групповые интенсивы с практикой. Прокачиваем промптинг, автоматизацию и работу с ИИ-инструментами на реальных задачах.",
      href: "/workshops",
    },
    {
      index: "02",
      title: "Наставничество 1:1",
      desc: "Личная работа. Разрабатываем персональную стратегию внедрения ИИ под ваши цели, специфику и темп.",
    },
    {
      index: "03",
      title: "Корп. обучение",
      desc: "Программы под ключ для команд. Маркетинг, продажи, продукт — адаптируем под процессы конкретной компании.",
      href: "/corporate",
    },
    {
      index: "04",
      title: "Внедрение ИИ для бизнеса",
      desc: "Аудит процессов, подбор инструментов и сопровождение внедрения ИИ — от стратегии до результата.",
    },
  ];
  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <span className="section-label">// форматы_работы</span>
        <h2>Форматы обучения ИИ</h2>
        <div className="services-grid">
          {cards.map((c, i) => (
            <article
              key={i}
              className={`service-card reveal-up${visible ? " visible" : ""}`}
              style={{ transitionDelay: i * 130 + "ms" }}
            >
              <span className="service-index">[{c.index}]</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              {c.href ? (
                <Link
                  href={c.href}
                  className="service-arrow"
                  aria-label={`Подробнее: ${c.title}`}
                >
                  подробнее →
                </Link>
              ) : (
                <a
                  href="#cta"
                  className="service-arrow"
                  aria-label={`Подробнее: ${c.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothTo("cta");
                  }}
                >
                  подробнее →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <span className="section-label">// обо_мне</span>
        <h2 style={{ marginBottom: 40 }}>AI-наставник Максим Леонов</h2>
        <div className="about-inner">
          {/* Left: text */}
          <div className={`reveal-up${visible ? " visible" : ""}`}>
            <div className="about-highlight">
              Помогаю людям и&nbsp;бизнесу находить общий язык с&nbsp;искусственным интеллектом. Без лишнего шума — только то, что работает.
            </div>
            <div className="about-text" style={{ marginTop: 24 }}>
              <p>
                Не просто рассказываю про инструменты — учу думать вместе с&nbsp;ИИ, выстраивать процессы и&nbsp;получать реальные результаты. Мой подход: практика, стратегия и&nbsp;индивидуальная работа с&nbsp;каждым.
              </p>
              <p>
                Провожу воркшопы по&nbsp;ChatGPT, Claude и&nbsp;другим нейросетям, веду личное наставничество и&nbsp;корпоративные программы по&nbsp;внедрению ИИ.
              </p>
              <div className="about-badge">
                Основатель <strong>Core M.AI.N community</strong> в&nbsp;Республике Беларусь — крупнейшего AI-сообщества в&nbsp;стране. Более 2&nbsp;500&nbsp;участников.
              </div>
              <p
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://t.me/maincomby"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-outline"
                >
                  Присоединяйся →
                </a>
                <a
                  href="#cta"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothTo("cta");
                  }}
                >
                  Написать мне
                </a>
              </p>
            </div>
          </div>

          {/* Right: photo grid */}
          <div
            className={`about-gallery reveal-up${visible ? " visible" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            <div className="about-gphoto">
              <img
                src="/uploads/1-134.jpg"
                alt="Максим Леонов — индивидуальная консультация по внедрению ИИ"
                loading="lazy"
              />
            </div>
            <div className="about-gphoto">
              <img
                src="/uploads/v-4.JPG"
                alt="Максим Леонов ведёт воркшоп по нейросетям и ChatGPT"
                loading="lazy"
              />
            </div>
            <div className="about-gphoto wide">
              <img
                src="/uploads/_MG_0214.jpg"
                alt="Максим Леонов на конференции по искусственному интеллекту — панельная дискуссия"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── EVENTS STRIP ── */
function EventsStrip() {
  const [ref, visible] = useScrollReveal();
  const photos = [
    { src: "/uploads/h-1.JPG", label: "Воркшоп M.AI.N community" },
    { src: "/uploads/photo_2025-05-06_16-17-27.jpg", label: "Корпоративное обучение ИИ" },
    { src: "/uploads/IMG_0389.PNG", label: "Практика: работа с ChatGPT" },
    { src: "/uploads/2026-03-18 20-17-22.jpg", label: "Выступление на конференции" },
  ];
  const alts = [
    "Участники воркшопа по ИИ — групповое фото M.AI.N community",
    "Корпоративное обучение ChatGPT — команда после тренинга по нейросетям",
    "Практическое обучение ИИ — участники воркшопа работают с нейросетями",
    "Максим Леонов выступает с лекцией об искусственном интеллекте",
  ];
  return (
    <section className="events" ref={ref} aria-label="Фото с мероприятий">
      <div className="container">
        <div className={`events-head reveal-up${visible ? " visible" : ""}`}>
          <span className="section-label">// мероприятия</span>
          <h2>Живые встречи и ивенты</h2>
          <p>
            350+ человек уже прошли практику на воркшопах и конференциях по ИИ
          </p>
        </div>
      </div>
      <div
        className={`events-grid reveal-up${visible ? " visible" : ""}`}
        style={{ transitionDelay: "160ms" }}
      >
        {photos.map((p, i) => (
          <div key={i} className="event-photo">
            <img src={p.src} alt={alts[i]} loading="lazy" />
            <div className="event-label">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── DYNAMIC BLOG PREVIEW ── */
function BlogSection({ posts }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="blog" id="blog" ref={ref}>
      <div className="container">
        <span className="section-label">// блог_об_ии</span>
        <h2>Блог об ИИ и нейросетях</h2>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <article
              key={p.slug || i}
              className={`blog-card reveal-up${visible ? " visible" : ""}`}
              style={{ transitionDelay: i * 130 + "ms" }}
            >
              <div className="blog-date">{p.date}</div>
              <h3>{p.title}</h3>
              <p>{p.excerpt || p.desc}</p>
              {p.slug ? (
                <Link href={`/blog/${p.slug}`} className="blog-link">
                  читать →
                </Link>
              ) : (
                <a
                  href="https://t.me/neprostonewsai"
                  target="_blank"
                  rel="noopener"
                  className="blog-link"
                >
                  читать →
                </a>
              )}
            </article>
          ))}
        </div>
        <div className="blog-all" style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/blog" className="btn btn-primary">
            Читать все статьи
          </Link>
          <a
            href="https://t.me/neprostonewsai"
            target="_blank"
            rel="noopener"
            className="btn btn-outline"
          >
            Telegram-канал об ИИ
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="cta-section" id="cta" ref={ref}>
      <div className={`reveal-up${visible ? " visible" : ""}`}>
        <h2>
          Готовы начать
          <br />
          работать с&nbsp;ИИ?
        </h2>
        <p>
          Запишитесь на бесплатную консультацию — обсудим, как искусственный
          интеллект поможет именно вам
        </p>
        <div className="cta-buttons">
          <a
            href="https://t.me/leonovmax"
            target="_blank"
            rel="noopener"
            className="btn btn-cta"
          >
            Написать в Telegram
          </a>
          <a
            href="https://instagram.com/neprostomaksim"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            Instagram @neprostomaksim
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const IgIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  );
  const TgIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">НЕ ПРОСТО МАКСИМ</span>
        <div className="footer-socials">
          <a
            href="https://instagram.com/neprostomaksim"
            target="_blank"
            rel="noopener"
            aria-label="Instagram Максима Леонова"
          >
            <IgIcon /> Instagram
          </a>
          <a
            href="https://t.me/neprostonewsai"
            target="_blank"
            rel="noopener"
            aria-label="Telegram-канал об ИИ"
          >
            <TgIcon /> Telegram
          </a>
        </div>
        <span className="footer-copy">© 2026 Максим Леонов</span>
      </div>
    </footer>
  );
}

/* ── EXPORTED HOMEPAGE CONTAINER ── */
export default function HomeClient({ initialPosts = [] }) {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "72px" }}>
        <Hero />
        <Marquee />
        <Numbers />
        <Services />
        <About />
        <EventsStrip />
        <BlogSection posts={initialPosts} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
export { Nav, Footer };
