import Link from "next/link";
import { Nav, Footer } from "../home-client";

export const metadata = {
  title:
    "Корпоративное обучение ИИ для команд | Максим Леонов — AI-наставник",
  description:
    "Корпоративное обучение ИИ под задачи каждого отдела вашей компании: маркетинг, продажи, HR, финансы, операции, топ-менеджмент. Практика на ваших задачах, отчёт в цифрах и 30 дней поддержки.",
  keywords: [
    "корпоративное обучение ИИ",
    "обучение сотрудников нейросетям",
    "ChatGPT для бизнеса",
    "тренинг по искусственному интеллекту для команды",
    "внедрение ИИ в компании",
    "AI обучение персонала",
    "Максим Леонов",
    "Минск",
    "Беларусь",
  ],
  alternates: {
    canonical: "https://neprostomaksim.com/corporate",
  },
  openGraph: {
    type: "website",
    url: "https://neprostomaksim.com/corporate",
    title: "Корпоративное обучение ИИ для команд | Максим Леонов",
    description:
      "Программа под каждый отдел, практика на реальных задачах компании, замер результата в цифрах и 30 дней поддержки после обучения.",
    locale: "ru_RU",
    images: [
      {
        url: "https://neprostomaksim.com/gallery/h-1.JPG",
        width: 1200,
        height: 630,
        alt: "Корпоративное обучение ИИ — воркшоп для команды",
      },
    ],
  },
};

/* ── DATA ── */

const stats = [
  {
    value: "89%",
    label: "руководителей",
    desc: "считают, что компании без ИИ теряют конкурентное преимущество уже сейчас",
  },
  {
    value: "40%",
    label: "рабочего времени",
    desc: "сотрудники тратят на рутинные задачи, которые ИИ выполняет за минуты",
  },
  {
    value: "37–68%",
    label: "рост производительности",
    desc: "у команд, которые прошли обучение работе с ИИ (по данным McKinsey)",
  },
];

const benefits = [
  {
    title: "Команда работает на 40–70% быстрее",
    desc: "Отчёты, тексты, аналитика, письма — задачи, которые занимали часы, теперь решаются за минуты.",
  },
  {
    title: "Применяют с первого дня",
    desc: "Никакой теории ради теории — сотрудники начинают использовать ИИ прямо на обучении, на своих задачах.",
  },
  {
    title: "Программа под каждый отдел",
    desc: "Маркетинг, продажи, HR, финансы — у каждого отдела свои задачи, и мы учим решать именно их.",
  },
  {
    title: "10+ свободных часов в неделю",
    desc: "Каждый сотрудник освобождает время от рутины для задач, которые действительно требуют человека.",
  },
  {
    title: "Вы видите результат в цифрах",
    desc: "Замеряем скорость работы до и после обучения — вы точно знаете, что изменилось и сколько это сэкономило.",
  },
  {
    title: "Безопасно для вашей компании",
    desc: "Учим работать с ИИ так, чтобы конфиденциальные данные компании оставались защищены.",
  },
];

const departments = [
  {
    tag: "отдел_01",
    title: "Маркетинг",
    points: [
      "Создание рекламных текстов и изображений за минуты",
      "Быстрая проверка рекламных гипотез",
      "Разработка контент-планов и стратегий",
      "Анализ трендов и действий конкурентов",
    ],
  },
  {
    tag: "отдел_02",
    title: "Продажи",
    points: [
      "Персонализированные предложения для каждого клиента",
      "Готовые сценарии для работы с возражениями",
      "Прогнозирование вероятности сделки",
      "Автоматические напоминания и письма клиентам",
    ],
  },
  {
    tag: "отдел_03",
    title: "Финансы",
    points: [
      "Автоматическое формирование отчётов",
      "Финансовое моделирование сценариев",
      "Оценка и анализ рисков",
      "Быстрая сборка аналитических сводок",
    ],
  },
  {
    tag: "отдел_04",
    title: "HR",
    points: [
      "Ускоренный поиск и подбор кандидатов",
      "Быстрая адаптация новых сотрудников",
      "Анализ вовлечённости команды",
      "Автоматизация рутинных кадровых задач",
    ],
  },
  {
    tag: "отдел_05",
    title: "Операции",
    points: [
      "Оптимизация внутренних процессов",
      "Прогнозирование спроса и нагрузки",
      "Упрощение работы с подрядчиками",
      "Управление поставками и логистикой",
    ],
  },
  {
    tag: "отдел_06",
    title: "Топ-менеджмент",
    points: [
      "Понимание, где ИИ даст максимальный эффект",
      "Принятие решений на основе данных",
      "Управление командами, использующими ИИ",
      "Оценка окупаемости внедрения ИИ",
    ],
  },
];

const gallery = [
  {
    src: "/gallery/h-1.JPG",
    caption: "Обучение команды — воркшоп",
    alt: "Корпоративный воркшоп по искусственному интеллекту — обучение команды работе с ИИ",
    wide: true,
  },
  {
    src: "/gallery/v-1.JPG",
    caption: "Практика с ИИ-инструментами",
    alt: "Сотрудники практикуются с ИИ-инструментами на корпоративном обучении",
  },
  {
    src: "/gallery/v-2.JPG",
    caption: "Командная работа",
    alt: "Командная работа участников на тренинге по нейросетям",
  },
  {
    src: "/gallery/v-3.JPG",
    caption: "Презентация результатов",
    alt: "Презентация результатов практического задания по работе с ИИ",
  },
  {
    src: "/gallery/v-4.JPG",
    caption: "Нетворкинг участников",
    alt: "Нетворкинг участников корпоративного обучения искусственному интеллекту",
  },
  {
    src: "/gallery/h-2.JPG",
    caption: "Групповая дискуссия",
    alt: "Групповая дискуссия о внедрении ИИ в рабочие процессы компании",
    wide: true,
  },
];

const steps = [
  {
    title: "Разбираемся в ваших задачах",
    desc: "Изучаем, как работают ваши отделы, и находим задачи, где ИИ даст максимальный эффект.",
  },
  {
    title: "Готовим программу под вас",
    desc: "Создаём план обучения с примерами и заданиями из вашей сферы — не абстрактными, а реальными.",
  },
  {
    title: "Обучаем на практике",
    desc: "Сотрудники работают с ИИ прямо на занятии — на своих задачах, а не на учебных примерах.",
  },
  {
    title: "Помогаем внедрить",
    desc: "Настраиваем ИИ-инструменты для ежедневной работы вашей команды.",
  },
  {
    title: "Отчёт и поддержка 30 дней",
    desc: "Показываем, что изменилось в цифрах, и остаёмся на связи для вопросов.",
  },
];

const fitYes = [
  "Хотите, чтобы сотрудники работали быстрее и не тратили время на рутину",
  "Понимаете, что ИИ — это возможность, и хотите использовать её первыми",
  "Готовы вложить 1–2 дня, чтобы получить долгосрочный результат",
  "Нужен не просто рассказ про ИИ, а конкретные навыки, которые можно применить сразу",
  "В команде от 10 человек в одном или нескольких отделах",
];

const fitNo = [
  "Нужна разовая лекция «для галочки» без практического результата",
  "Не планируете менять текущий подход к работе",
  "Думаете, что ИИ заменит сотрудников — мы учим усиливать, а не заменять",
  "Нужно обучение для одного человека, а не для команды",
  "Команда не может выделить 1–2 дня на обучение",
];

const reviews = [
  {
    name: "ilex.by",
    url: "https://ilex.by",
    description: "Правовой портал",
    department: "Редакция",
    review:
      "После обучения наши редакторы стали готовить аналитические материалы в 2 раза быстрее. ИИ-инструменты встроились в ежедневную работу органично — без сопротивления команды.",
    reviewer: "Команда редакции",
  },
  {
    name: "Юриэлт",
    url: "https://urielt.by",
    description: "Агентство недвижимости",
    department: "Маркетинг",
    review:
      "Маркетинг-отдел перестал тратить дни на рутинные задачи. Объявления, описания объектов, посты для соцсетей — теперь это часы вместо дней. Затраты на обучение окупились за первый месяц.",
    reviewer: "Отдел маркетинга",
  },
  {
    name: "Не просто студия",
    url: null,
    description: "Сеть спа-студий",
    department: "Маркетинг и автоматизация",
    review:
      "Мы автоматизировали процессы записи и коммуникации с клиентами, а маркетинг-команда теперь создаёт контент и рекламные кампании с помощью ИИ. Освободили до 30% рабочего времени.",
    reviewer: "Управляющая сети",
  },
];

const faq = [
  {
    q: "Сколько длится обучение для одного отдела?",
    a: "Базовая программа занимает 1–2 дня. Точные сроки зависят от задач: сколько тем нужно охватить, сколько практики заложить и какова специфика работы вашей команды.",
  },
  {
    q: "Нужны ли сотрудникам технические навыки?",
    a: "Нет. Мы учим пользоваться готовыми инструментами — это как научиться работать в новой программе. Никакого программирования. Подходит для любого уровня: от новичков до опытных пользователей.",
  },
  {
    q: "Можно ли адаптировать программу под наш отдел?",
    a: "Именно так мы и работаем. Сначала изучаем задачи вашего отдела, а потом формируем программу с примерами из вашей сферы. Если нужного отдела нет в списке — подготовим программу за 48 часов.",
  },
  {
    q: "Какой формат обучения: онлайн или в офисе?",
    a: "Оба. Очные занятия проводим у вас в офисе. Онлайн — через Zoom или Teams с полным взаимодействием: практика, ответы на вопросы, групповые задания.",
  },
  {
    q: "Как понять, что обучение дало результат?",
    a: "Мы замеряем скорость работы сотрудников до и после обучения. Через 30 дней вы получаете отчёт с конкретными цифрами: на сколько быстрее стали выполняться задачи и сколько это сэкономило.",
  },
  {
    q: "Что получают сотрудники после обучения?",
    a: "Каждый участник получает доступ к базе знаний с готовыми шаблонами запросов к ИИ, чек-листами и записями занятий. Плюс 30 дней поддержки в чате для вопросов по внедрению.",
  },
];

const TELEGRAM = "https://t.me/leonovmax";

/* ── PAGE ── */

export default function CorporatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Корпоративное обучение ИИ",
        serviceType: "Корпоративное обучение искусственному интеллекту",
        description:
          "Индивидуальные программы обучения ИИ под задачи каждого отдела компании: маркетинг, продажи, HR, финансы, операции, топ-менеджмент. Практика на реальных задачах, отчёт в цифрах и 30 дней поддержки.",
        url: "https://neprostomaksim.com/corporate",
        provider: {
          "@type": "Person",
          name: "Максим Леонов",
          jobTitle: "AI-наставник",
          url: "https://neprostomaksim.com",
        },
        areaServed: { "@type": "Country", name: "Беларусь" },
        audience: { "@type": "BusinessAudience", name: "Компании и команды от 10 человек" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Программы обучения по отделам",
          itemListElement: departments.map((d) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Обучение ИИ для отдела «${d.title}»`,
              description: d.points.join(". "),
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* ── HERO ── */}
      <header className="corp-hero">
        <div className="corp-hero-inner">
          <Link href="/#services" className="corp-crumbs">
            ← Все форматы обучения
          </Link>
          <span className="section-label">{"// корпоративное_обучение"}</span>
          <h1>
            Научу вашу команду <em>работать с ИИ</em>
          </h1>
          <p className="corp-hero-sub">
            Сотрудники тратят часы на рутину, которую ИИ делает за минуты.
            Обучаю команды использовать искусственный интеллект в реальных
            рабочих задачах — по программе, собранной под вашу компанию.
          </p>
          <div className="corp-hero-buttons">
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener"
              className="btn btn-cta"
            >
              Обсудить обучение
            </a>
            <a href="#programs" className="btn btn-ghost">
              Смотреть программы
            </a>
          </div>
          <div className="corp-hero-meta">
            <span>1–2 дня базовая программа</span>
            <span>от 10 человек в команде</span>
            <span>офлайн в офисе или онлайн</span>
            <span>30 дней поддержки</span>
          </div>
        </div>
      </header>

      <main>
        {/* ── STATS ── */}
        <section className="corp-stats" aria-label="Почему ИИ важен сейчас">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// почему_сейчас"}</span>
              <h2>ИИ уже меняет скорость и качество работы в компаниях</h2>
            </div>
            <div className="corp-stats-grid">
              {stats.map((s) => (
                <div className="corp-stat" key={s.label}>
                  <div className="corp-stat-value">{s.value}</div>
                  <div className="corp-stat-label">{s.label}</div>
                  <p className="corp-stat-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="corp-why">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// результаты"}</span>
              <h2>Что изменится после обучения</h2>
              <p>
                Не презентация про будущее, а рабочие навыки, которые команда
                применяет уже на следующий день после занятия.
              </p>
            </div>
            <div className="corp-why-grid">
              {benefits.map((b, i) => (
                <article className="corp-why-card" key={b.title}>
                  <span className="corp-why-num">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPARTMENTS ── */}
        <section className="corp-depts" id="programs">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// программы"}</span>
              <h2>Примеры программ для вашей компании</h2>
              <p>
                Для каждого отдела — своя программа с реальными инструментами и
                примерами из вашей сферы.
              </p>
            </div>
            <div className="corp-dept-grid">
              {departments.map((d) => (
                <article className="corp-dept" key={d.title}>
                  <span className="corp-dept-tag">{d.tag}</span>
                  <h3>{d.title}</h3>
                  <ul>
                    {d.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="corp-note">
              Нужны другие отделы?{" "}
              <strong>Подготовлю программу за 48 часов</strong> —{" "}
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener"
                className="blog-link"
              >
                напишите мне →
              </a>
            </p>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="corp-gallery" aria-label="Фото с корпоративных обучений">
          <div className="container">
            <div className="corp-head corp-head--dark">
              <span className="section-label">{"// атмосфера"}</span>
              <h2>Как проходит обучение</h2>
              <p>
                Живая практика, работа в группах и разбор реальных задач команды
                — а не лекция под запись.
              </p>
            </div>
          </div>
          <div className="corp-gallery-grid">
            {gallery.map((g) => (
              <figure
                className={`corp-shot${g.wide ? " wide" : ""}`}
                key={g.src}
              >
                <img src={g.src} alt={g.alt} loading="lazy" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="corp-process">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// наш_процесс"}</span>
              <h2>От диагностики до результата</h2>
              <p>
                Пять шагов от первого созвона до отчёта с цифрами — вы всегда
                понимаете, что происходит и зачем.
              </p>
            </div>
            <ol className="corp-steps">
              {steps.map((s, i) => (
                <li className="corp-step" key={s.title}>
                  <span className="corp-step-num">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FIT / NOT FIT ── */}
        <section className="corp-fit">
          <div className="container">
            <div className="corp-head corp-head--dark">
              <span className="section-label">{"// для_кого"}</span>
              <h2>Подходит ли это вашей команде?</h2>
            </div>
            <div className="corp-fit-grid">
              <div className="corp-fit-col corp-fit--yes">
                <h3>
                  <span className="corp-fit-badge">✓</span> Подходит, если
                </h3>
                <ul>
                  {fitYes.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="corp-fit-col corp-fit--no">
                <h3>
                  <span className="corp-fit-badge">×</span> Не подойдёт, если
                </h3>
                <ul>
                  {fitNo.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="corp-reviews">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// отзывы"}</span>
              <h2>Что говорят клиенты</h2>
            </div>
            <div className="corp-review-grid">
              {reviews.map((r) => (
                <figure className="corp-review" key={r.name}>
                  <blockquote className="corp-review-quote">
                    {r.review}
                  </blockquote>
                  <figcaption>
                    <div className="corp-review-name">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener">
                          {r.name} ↗
                        </a>
                      ) : (
                        r.name
                      )}
                    </div>
                    <div className="corp-review-meta">
                      {r.description} · {r.department}
                      <br />
                      {r.reviewer}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="corp-faq">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// частые_вопросы"}</span>
              <h2>Вопросы и ответы</h2>
            </div>
            <div className="corp-faq-list">
              {faq.map((f) => (
                <details className="corp-q" key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="corp-q-body">{f.a}</div>
                </details>
              ))}
            </div>
            <p className="corp-faq-foot">
              Не нашли ответ?{" "}
              <a href={TELEGRAM} target="_blank" rel="noopener">
                Напишите мне в Telegram
              </a>{" "}
              — отвечу лично в течение 24 часов.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section" id="cta">
          <div>
            <h2>
              Готовы внедрить
              <br />
              ИИ-обучение?
            </h2>
            <p>
              Напишите мне — обсудим задачи ваших отделов и подготовлю пример
              программы под вашу компанию за 24 часа.
            </p>
            <div className="cta-buttons">
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener"
                className="btn btn-cta"
              >
                Написать в Telegram
              </a>
              <Link href="/#services" className="btn btn-ghost">
                Другие форматы обучения
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
