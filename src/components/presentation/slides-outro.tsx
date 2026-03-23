import Icon from "@/components/ui/icon";

/* ── 9. РЕКОМЕНДАЦИИ ───────────────────────────────── */
export function SlideRecs() {
  const recs = [
    { num: "01", icon: "Timer",         title: "Цифровой детокс",       text: "Выделяйте 1–2 часа в день без телефона. Практикуйте «тихий час» перед сном." },
    { num: "02", icon: "Shield",        title: "Настройки приватности", text: "Закрытые аккаунты, осознанный выбор подписок, блокировка токсичного контента." },
    { num: "03", icon: "MessageCircle", title: "Открытый диалог",       text: "Родители и дети — разговаривайте о том, что вы читаете и смотрите в соцсетях." },
    { num: "04", icon: "Activity",      title: "Офлайн-активность",     text: "Спорт, хобби, живое общение — равновесие между онлайн и реальной жизнью." },
  ];
  return (
    <div className="slide slide-recs">
      <div className="slide-header">
        <span className="slide-num">09</span>
        <h2>Рекомендации</h2>
      </div>
      <div className="recs-grid">
        {recs.map((r, i) => (
          <div className="rec-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="rec-num">{r.num}</div>
            <div className="rec-icon">
              <Icon name={r.icon as Parameters<typeof Icon>[0]["name"]} size={24} />
            </div>
            <div className="rec-title">{r.title}</div>
            <div className="rec-text">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 10. ЗАКЛЮЧЕНИЕ ────────────────────────────────── */
export function SlideConclusion() {
  return (
    <div className="slide slide-conclusion">
      <div className="concl-bg" />
      <div className="concl-content">
        <div className="concl-tag">💡 Выводы</div>
        <h2 className="concl-title">
          Соцсети — это инструмент.<br />
          <span className="concl-accent">Важно, как мы их используем.</span>
        </h2>
        <div className="concl-points">
          {[
            "Соцсети — неотъемлемая часть жизни подростка, отрицать это бессмысленно",
            "Они открывают возможности для обучения, общения и самовыражения",
            "Осознанное использование снижает риски и усиливает позитивные эффекты",
            "Цифровая грамотность — ключевой навык XXI века для каждого подростка",
          ].map((p, i) => (
            <div className="concl-point" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <Icon name="CheckCircle2" size={20} />
              <span>{p}</span>
            </div>
          ))}
        </div>
        <div className="concl-quote">
          «Технологии не хорошие и не плохие — всё зависит от того, кто и зачем их использует»
        </div>
      </div>
    </div>
  );
}
