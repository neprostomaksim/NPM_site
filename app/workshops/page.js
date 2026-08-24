import Link from "next/link";
import { Nav, Footer } from "../home-client";

export const metadata = {
  title: "Воркшопы по ИИ — 3 часа офлайн-практики | Максим Леонов",
  description:
    "Офлайн-воркшопы по искусственному интеллекту: 3 часа, одна тема, практика на своих задачах. ИИ-агенты, промпт-инжиниринг, ИИ для маркетинга, вайб-кодинг. Анонсы ближайших воркшопов — в блоге.",
  keywords: [
    "воркшоп по ИИ",
    "воркшоп ChatGPT",
    "офлайн интенсив по нейросетям",
    "промпт-инжиниринг обучение",
    "ИИ-агенты воркшоп",
    "вайб-кодинг",
    "ИИ для маркетинга",
    "Максим Леонов",
    "Минск",
  ],
  alternates: {
    canonical: "https://neprostomaksim.com/workshops",
  },
  openGraph: {
    type: "website",
    url: "https://neprostomaksim.com/workshops",
    title: "Воркшопы по ИИ — 3 часа офлайн-практики | Максим Леонов",
    description:
      "Одна тема, три часа, работа на своих задачах. Только офлайн — приходите с ноутбуком и уходите с готовым результатом.",
    locale: "ru_RU",
    images: [
      {
        url: "https://neprostomaksim.com/gallery/h-2.JPG",
        width: 1200,
        height: 630,
        alt: "Воркшоп по искусственному интеллекту — практика в группе",
      },
    ],
  },
};

/* ── DATA ── */

const format = [
  {
    value: "3 часа",
    label: "один воркшоп",
    desc: "Столько нужно, чтобы разобрать тему и успеть сделать своими руками, но не перегореть.",
  },
  {
    value: "офлайн",
    label: "только вживую",
    desc: "Никаких трансляций: разбор задач, обратная связь и помощь за плечом работают только в одной комнате.",
  },
  {
    value: "1 тема",
    label: "на встречу",
    desc: "Не обзор всего подряд, а один инструмент, разобранный до состояния «могу применить завтра».",
  },
];

const topics = [
  {
    tag: "тема_01",
    title: "Создание ИИ-агентов",
    points: [
      "Собираем агента, который сам выполняет рутинную задачу",
      "Подключаем инструменты и источники данных",
      "Автоматизация без программирования",
      "Где агент реально нужен, а где хватит обычного запроса",
    ],
  },
  {
    tag: "тема_02",
    title: "Промпт-инжиниринг",
    points: [
      "Из чего состоит запрос, который даёт нужный результат",
      "Работа с контекстом: почему ИИ отвечает не то",
      "Свои шаблоны под повторяющиеся задачи",
      "Разбор ваших реальных запросов на месте",
    ],
  },
  {
    tag: "тема_03",
    title: "ИИ для маркетинга",
    points: [
      "Тексты, креативы и визуал за минуты",
      "Контент-план и стратегия с помощью нейросетей",
      "Анализ конкурентов и трендов",
      "Быстрая проверка рекламных гипотез",
    ],
  },
  {
    tag: "тема_04",
    title: "Вайб-кодинг",
    points: [
      "Собираем рабочий продукт без опыта разработки",
      "От идеи до готового сайта за одну встречу",
      "Инструменты, которые пишут код за вас",
      "Как довести проект до публикации в интернете",
    ],
  },
];

const agenda = [
  {
    time: "00:00 — 00:20",
    title: "С чем пришли",
    desc: "Знакомство и сбор задач участников. Дальше вся практика идёт именно на них, а не на выдуманных примерах.",
  },
  {
    time: "00:20 — 01:00",
    title: "Разбор инструмента",
    desc: "Как он устроен, что умеет и где ломается. Минимум теории — ровно столько, чтобы дальше делать осознанно.",
  },
  {
    time: "01:00 — 01:15",
    title: "Перерыв",
    desc: "Кофе и общение с участниками. Часто именно здесь находятся идеи для своих задач.",
  },
  {
    time: "01:15 — 02:30",
    title: "Практика",
    desc: "Главная часть. Вы работаете за своим ноутбуком над своей задачей, я хожу по залу и помогаю каждому.",
  },
  {
    time: "02:30 — 03:00",
    title: "Результаты и вопросы",
    desc: "Показываем, у кого что получилось, разбираем ошибки и записываем, что делать дальше самостоятельно.",
  },
];

const gallery = [
  {
    src: "/gallery/h-2.JPG",
    caption: "Групповая дискуссия",
    alt: "Участники воркшопа по ИИ обсуждают задачи в группе",
    wide: true,
  },
  {
    src: "/gallery/v-2.JPG",
    caption: "Работа в группах",
    alt: "Командная работа участников на воркшопе по нейросетям",
  },
  {
    src: "/gallery/v-1.JPG",
    caption: "Практика за ноутбуком",
    alt: "Участник воркшопа практикуется с ИИ-инструментами за ноутбуком",
  },
  {
    src: "/gallery/v-3.JPG",
    caption: "Разбор результатов",
    alt: "Презентация результатов практического задания на воркшопе",
  },
  {
    src: "/gallery/v-4.JPG",
    caption: "Нетворкинг",
    alt: "Нетворкинг участников офлайн-воркшопа по искусственному интеллекту",
  },
  {
    src: "/gallery/h-1.JPG",
    caption: "Воркшоп по ИИ",
    alt: "Групповое фото участников воркшопа по ИИ",
    wide: true,
  },
];

const fitYes = [
  "Хотите разобраться в одном инструменте до практического уровня, а не послушать обзор",
  "Готовы работать руками все три часа, а не смотреть презентацию",
  "Есть своя задача, которую хочется закрыть с помощью ИИ",
  "Можете приехать на встречу вживую — воркшопы проходят только офлайн",
  "Хотите познакомиться с людьми, которые уже применяют ИИ в работе",
];

const fitNo = [
  "Нужен формат «включу фоном и послушаю» — здесь так не получится",
  "Ищете онлайн-запись: трансляций и записей практики нет",
  "Нужна программа под конкретную компанию и отделы — это корпоративный формат",
  "Хотите личную работу в своём темпе — тогда подойдёт наставничество 1:1",
  "Не готовы взять с собой ноутбук: без него практики не будет",
];

const faq = [
  {
    q: "Сколько длится воркшоп и сколько он стоит?",
    a: "Три часа с одним перерывом. Стоимость зависит от темы и площадки — актуальная цена всегда указана в анонсе конкретного воркшопа в блоге.",
  },
  {
    q: "Можно ли поучаствовать онлайн?",
    a: "Нет, воркшопы проходят только офлайн. Весь смысл формата — в практике под присмотром: я хожу по залу и помогаю каждому участнику с его задачей. В трансляции это не работает. Если нужен онлайн — это формат корпоративного обучения или наставничества 1:1.",
  },
  {
    q: "Нужна ли подготовка и технические навыки?",
    a: "Нет. Мы работаем с готовыми инструментами, программировать не нужно. Достаточно уверенно пользоваться компьютером. Темы вроде вайб-кодинга специально устроены так, чтобы результат получился и без опыта разработки.",
  },
  {
    q: "Что взять с собой?",
    a: "Ноутбук с зарядкой и свою реальную рабочую задачу. Всё остальное — аккаунты, доступы и шаблоны — разберём на месте.",
  },
  {
    q: "Как узнать о ближайшем воркшопе?",
    a: "Анонсы всех воркшопов выходят в блоге: там дата, тема, место и условия участия. Также можно написать мне в Telegram — подскажу, что будет ближайшим, и забронирую место.",
  },
  {
    q: "Можно заказать воркшоп для своей команды?",
    a: "Да, но это уже другой формат: программа собирается под задачи ваших отделов и может идти дольше трёх часов. Подробности — на странице корпоративного обучения.",
  },
];

const TELEGRAM = "https://t.me/leonovmax";

/* ── PAGE ── */

export default function WorkshopsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Воркшопы по искусственному интеллекту",
        serviceType: "Офлайн-воркшоп по ИИ",
        description:
          "Офлайн-воркшопы по ИИ длительностью 3 часа. Одна тема на встречу: создание ИИ-агентов, промпт-инжиниринг, ИИ для маркетинга или вайб-кодинг. Практика на собственных задачах участников.",
        url: "https://neprostomaksim.com/workshops",
        provider: {
          "@type": "Person",
          name: "Максим Леонов",
          jobTitle: "AI-наставник",
          url: "https://neprostomaksim.com",
        },
        areaServed: { "@type": "Country", name: "Беларусь" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Темы воркшопов",
          itemListElement: topics.map((t) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Воркшоп «${t.title}»`,
              description: t.points.join(". "),
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
          <span className="section-label">{"// воркшопы"}</span>
          <h1>
            Три часа офлайн — и <em>ИИ в работе</em>
          </h1>
          <p className="corp-hero-sub">
            Воркшоп — это одна тема, разобранная до практики. Три часа вживую:
            вы приходите со своей задачей и ноутбуком, а уходите с готовым
            результатом и понятным планом, что делать дальше.
          </p>
          <div className="corp-hero-buttons">
            <Link href="/blog" className="btn btn-cta">
              Анонсы ближайших воркшопов
            </Link>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              Записаться в Telegram
            </a>
          </div>
          <div className="corp-hero-meta">
            <span>3 часа практики</span>
            <span>только офлайн</span>
            <span>одна тема на встречу</span>
            <span>нужен свой ноутбук</span>
          </div>
        </div>
      </header>

      <main>
        {/* ── FORMAT ── */}
        <section className="corp-stats" aria-label="Формат воркшопа">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// формат"}</span>
              <h2>Как устроен воркшоп</h2>
            </div>
            <div className="corp-stats-grid">
              {format.map((f) => (
                <div className="corp-stat" key={f.label}>
                  <div className="corp-stat-value">{f.value}</div>
                  <div className="corp-stat-label">{f.label}</div>
                  <p className="corp-stat-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOPICS ── */}
        <section className="corp-depts" id="topics">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// темы"}</span>
              <h2>Темы воркшопов</h2>
              <p>
                Каждая встреча посвящена одной теме. Что будет ближайшим —
                смотрите в анонсах в блоге.
              </p>
            </div>
            <div className="corp-dept-grid">
              {topics.map((t) => (
                <article className="corp-dept" key={t.title}>
                  <span className="corp-dept-tag">{t.tag}</span>
                  <h3>{t.title}</h3>
                  <ul>
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="corp-note">
              Интересна тема, которой нет в списке?{" "}
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

        {/* ── AGENDA ── */}
        <section className="corp-process">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// расписание"}</span>
              <h2>Как проходят эти три часа</h2>
              <p>
                Тайминг примерный и подстраивается под группу, но пропорция
                всегда одна: практики больше, чем разговоров.
              </p>
            </div>
            <div className="corp-agenda">
              {agenda.map((a) => (
                <div className="corp-slot" key={a.time}>
                  <div className="corp-slot-time">{a.time}</div>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="corp-gallery" aria-label="Фото с воркшопов">
          <div className="container">
            <div className="corp-head corp-head--dark">
              <span className="section-label">{"// атмосфера"}</span>
              <h2>Как это выглядит</h2>
              <p>
                Небольшие группы, живое общение и работа руками — а не лекция
                под запись.
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

        {/* ── FIT / NOT FIT ── */}
        <section className="corp-fit">
          <div className="container">
            <div className="corp-head corp-head--dark">
              <span className="section-label">{"// для_кого"}</span>
              <h2>Подойдёт ли вам этот формат?</h2>
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

        {/* ── HOW TO JOIN ── */}
        <section className="corp-reviews" id="join">
          <div className="container">
            <div className="corp-head">
              <span className="section-label">{"// как_попасть"}</span>
              <h2>Как попасть на воркшоп</h2>
              <p>
                Два пути — оба ведут к одному и тому же месту в зале.
              </p>
            </div>
            <div className="corp-routes">
              <article className="corp-route">
                <span className="corp-route-tag">способ_01</span>
                <h3>Следить за анонсами</h3>
                <p>
                  Каждый воркшоп анонсируется отдельной статьёй в блоге: тема,
                  дата, место, программа и условия участия. Там же — разборы
                  прошедших встреч, чтобы заранее понять формат.
                </p>
                <Link href="/blog" className="btn btn-primary">
                  Смотреть анонсы в блоге
                </Link>
              </article>
              <article className="corp-route">
                <span className="corp-route-tag">способ_02</span>
                <h3>Написать мне напрямую</h3>
                <p>
                  Если хотите занять место на ближайшем воркшопе или не нашли
                  нужную тему — напишите в Telegram. Отвечу лично, подскажу
                  ближайшую дату и забронирую место.
                </p>
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  Написать в Telegram
                </a>
              </article>
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
              Нужна программа под команду?{" "}
              <Link href="/corporate">Посмотрите корпоративное обучение</Link> —
              там формат собирается под задачи ваших отделов.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section" id="cta">
          <div>
            <h2>
              Хотите на
              <br />
              ближайший воркшоп?
            </h2>
            <p>
              Напишите мне в Telegram — расскажу, какая тема будет следующей, и
              оставлю за вами место.
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
              <Link href="/blog" className="btn btn-ghost">
                Анонсы в блоге
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
