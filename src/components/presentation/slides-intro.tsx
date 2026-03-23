import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/d841e864-1f65-4a36-ba77-a0c4085146b4.jpg";

/* ── 0. ОБЛОЖКА ────────────────────────────────────── */
export function SlideHero() {
  return (
    <div className="slide slide-hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">📱 Исследование · 2026</div>
        <h1 className="hero-title">
          Влияние<br />
          <span className="hero-accent">соцсетей</span><br />
          на подростков
        </h1>
        <p className="hero-sub">
          Как социальные сети формируют поведение,<br />
          психику и ценности молодого поколения
        </p>
        <div className="hero-scroll">
          <Icon name="ChevronsDown" size={20} />
          <span>Листайте стрелками или кнопками</span>
        </div>
      </div>
    </div>
  );
}

/* ── 1. АКТУАЛЬНОСТЬ ───────────────────────────────── */
export function SlideRelevance() {
  const facts = [
    { icon: "TrendingUp", text: "Более 80% российских подростков ежедневно проводят время в соцсетях — это больше, чем за книгами и живым общением вместе взятыми." },
    { icon: "Clock", text: "Среднее экранное время у детей 12–17 лет выросло с 2 до 4+ часов в сутки за последние пять лет." },
    { icon: "AlertCircle", text: "Исследования ВОЗ фиксируют рост тревожных расстройств среди подростков, напрямую связанный с интенсивностью использования соцсетей." },
    { icon: "Globe", text: "Соцсети стали главным источником информации для поколения Z, вытеснив СМИ, школу и родителей." },
  ];
  return (
    <div className="slide slide-relevance">
      <div className="slide-header">
        <span className="slide-num">01</span>
        <h2>Актуальность темы</h2>
      </div>
      <div className="rel-quote">
        «Мы первое поколение, которое растит детей в условиях постоянного присутствия соцсетей —
        и последнее, кто ещё помнит жизнь без них»
        <span>— Джонатан Хайдт, психолог</span>
      </div>
      <div className="rel-grid">
        {facts.map((f, i) => (
          <div className="rel-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="rel-icon">
              <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={20} />
            </div>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 2. ЦЕЛЬ И ЗАДАЧИ ──────────────────────────────── */
export function SlideGoals() {
  const tasks = [
    "Изучить характер и интенсивность использования социальных сетей среди подростков 12–17 лет",
    "Выявить позитивные эффекты: развитие коммуникации, доступ к информации, самовыражение",
    "Проанализировать негативные последствия: зависимость, кибербуллинг, нарушение сна",
    "Разработать практические рекомендации для подростков, родителей и педагогов",
  ];
  return (
    <div className="slide slide-goals">
      <div className="slide-header">
        <span className="slide-num">02</span>
        <h2>Цель и задачи исследования</h2>
      </div>
      <div className="goal-box">
        <div className="goal-label">🎯 Цель</div>
        <div className="goal-text">
          Изучить влияние социальных сетей на психологическое состояние,
          поведение и развитие подростков, и сформулировать рекомендации
          по осознанному их использованию.
        </div>
      </div>
      <div className="tasks-label">📋 Задачи</div>
      <div className="tasks-list">
        {tasks.map((t, i) => (
          <div className="task-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="task-num">{i + 1}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3. ПРОБЛЕМА ───────────────────────────────────── */
export function SlideProblem() {
  return (
    <div className="slide slide-problem">
      <div className="slide-header">
        <span className="slide-num">03</span>
        <h2>Проблема исследования</h2>
      </div>
      <div className="problem-hero">
        <div className="problem-icon-big">⚠️</div>
        <div className="problem-statement">
          Социальные сети стали неотъемлемой частью жизни подростков,
          однако их влияние на развитие личности, психическое здоровье и
          социализацию остаётся противоречивым и недостаточно изученным
          в контексте российских реалий.
        </div>
      </div>
      <div className="problem-tension">
        <div className="tension-side tension-pos">
          <div className="tension-title">Родители и педагоги видят угрозу</div>
          <div className="tension-text">Зависимость, агрессия, снижение успеваемости, изоляция от реального мира</div>
        </div>
        <div className="tension-vs">VS</div>
        <div className="tension-side tension-neg">
          <div className="tension-title">Подростки видят возможности</div>
          <div className="tension-text">Общение, творчество, самовыражение, доступ к информации и знаниям</div>
        </div>
      </div>
      <div className="problem-question">
        Где истина? Как найти баланс? Каковы реальные последствия?
      </div>
    </div>
  );
}

/* ── 4. ОБЪЕКТ ИССЛЕДОВАНИЯ ────────────────────────── */
export function SlideObject() {
  return (
    <div className="slide slide-object">
      <div className="slide-header">
        <span className="slide-num">04</span>
        <h2>Объект и предмет исследования</h2>
      </div>
      <div className="obj-grid">
        <div className="obj-card obj-main">
          <div className="obj-badge">Объект</div>
          <div className="obj-icon-wrap">🎓</div>
          <div className="obj-title">Подростки 12–17 лет</div>
          <div className="obj-desc">
            Учащиеся средней и старшей школы — активная аудитория социальных сетей,
            находящаяся в периоде формирования личности и социальных навыков.
          </div>
        </div>
        <div className="obj-card obj-subject">
          <div className="obj-badge">Предмет</div>
          <div className="obj-icon-wrap">🔍</div>
          <div className="obj-title">Влияние социальных сетей</div>
          <div className="obj-desc">
            Характер, интенсивность и последствия использования популярных
            платформ для психологического развития подростков.
          </div>
        </div>
        <div className="obj-card obj-hyp">
          <div className="obj-badge">Гипотеза</div>
          <div className="obj-icon-wrap">💡</div>
          <div className="obj-title">Двойственный эффект</div>
          <div className="obj-desc">
            Соцсети оказывают как позитивное, так и негативное влияние;
            ключевым фактором является осознанность и контроль времени использования.
          </div>
        </div>
        <div className="obj-card obj-method">
          <div className="obj-badge">Методы</div>
          <div className="obj-icon-wrap">📊</div>
          <div className="obj-title">Анализ и опрос</div>
          <div className="obj-desc">
            Анализ научных источников, статистики платформ, анкетирование учащихся,
            изучение психологических исследований 2022–2025 гг.
          </div>
        </div>
      </div>
    </div>
  );
}
