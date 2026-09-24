export default function Header() {
  return (
    <header className="site-header show">
      <div className="header-bar">
        <a className="logo" href="#top" aria-label="/ai мастерская — в начало">
          <span className="brand-mark mono">/ai</span> мастерская<span className="logo-dot">.</span>
        </a>
        <nav className="header-nav" aria-label="Навигация по странице">
          <a href="#agents">Агенты</a>
          <a href="#program">Программа</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a className="btn btn-secondary" href="#register" data-analytics-event="cta_clicked" data-analytics-location="header">
          Забронировать <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
