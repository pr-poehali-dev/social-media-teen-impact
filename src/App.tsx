import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import "./App.css";

const HERO_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/d841e864-1f65-4a36-ba77-a0c4085146b4.jpg";
const POSITIVE_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/19e9f187-f287-4497-8c3d-12b217b2ae13.jpg";

const slides = [
  { id: 0,  label: "Обложка" },
  { id: 1,  label: "Актуальность" },
  { id: 2,  label: "Цель и задачи" },
  { id: 3,  label: "Проблема" },
  { id: 4,  label: "Объект" },
  { id: 5,  label: "Статистика" },
  { id: 6,  label: "ВКонтакте" },
  { id: 7,  label: "Telegram" },
  { id: 8,  label: "Позитив" },
  { id: 9,  label: "Риски" },
  { id: 10, label: "Рекомендации" },
  { id: 11, label: "Заключение" },
];

const TOTAL = slides.length;

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val}{suffix}</span>;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = (idx: number) => {
    if (idx === current) return;
    setDirection(idx > current ? "next" : "prev");
    setAnimKey(k => k + 1);
    setCurrent(idx);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent(c => { const n = Math.min(c + 1, TOTAL - 1); setAnimKey(k => k + 1); setDirection("next"); return n; });
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent(c => { const n = Math.max(c - 1, 0); setAnimKey(k => k + 1); setDirection("prev"); return n; });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="presentation-root">
      <nav className="slide-nav">
        {slides.map(s => (
          <button
            key={s.id}
            className={`nav-dot ${current === s.id ? "active" : ""}`}
            onClick={() => goTo(s.id)}
            title={s.label}
          >
            <span className="nav-dot-label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div className={`slide-wrapper slide-anim-${direction}`} key={animKey}>
        {current === 0  && <SlideHero />}
        {current === 1  && <SlideRelevance />}
        {current === 2  && <SlideGoals />}
        {current === 3  && <SlideProblem />}
        {current === 4  && <SlideObject />}
        {current === 5  && <SlideStats />}
        {current === 6  && <SlideVK />}
        {current === 7  && <SlideTelegram />}
        {current === 8  && <SlidePositive />}
        {current === 9  && <SlideProblems />}
        {current === 10 && <SlideRecs />}
        {current === 11 && <SlideConclusion />}
      </div>

      <div className="nav-arrows">
        <button className="arrow-btn" onClick={() => goTo(Math.max(current - 1, 0))} disabled={current === 0}>
          <Icon name="ChevronLeft" size={28} />
        </button>
        <span className="slide-counter">{current + 1} / {TOTAL}</span>
        <button className="arrow-btn" onClick={() => goTo(Math.min(current + 1, TOTAL - 1))} disabled={current === TOTAL - 1}>
          <Icon name="ChevronRight" size={28} />
        </button>
      </div>
    </div>
  );
}

/* ── 0. ОБЛОЖКА ────────────────────────────────────── */
function SlideHero() {
  return (
    <div className="slide slide-hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">📱 ВКонтакте · Telegram · Исследование 2026</div>
        <h1 className="hero-title">
          Влияние<br />
          <span className="hero-accent">соцсетей</span><br />
          на подростков
        </h1>
        <p className="hero-sub">
          Как ВКонтакте и Telegram формируют поведение,<br />
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
function SlideRelevance() {
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
function SlideGoals() {
  const tasks = [
    "Изучить характер и интенсивность использования ВКонтакте и Telegram среди подростков 12–17 лет",
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
          Изучить влияние социальных сетей ВКонтакте и Telegram на психологическое состояние,
          поведение и развитие подростков, и сформулировать рекомендации по осознанному использованию.
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
function SlideProblem() {
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
function SlideObject() {
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
            находящаяся в период активного формирования личности и социальных навыков.
          </div>
        </div>
        <div className="obj-card obj-subject">
          <div className="obj-badge">Предмет</div>
          <div className="obj-icon-wrap">🔍</div>
          <div className="obj-title">Влияние ВКонтакте и Telegram</div>
          <div className="obj-desc">
            Характер, интенсивность и последствия использования двух крупнейших
            российских платформ для психологического развития подростков.
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
            анализ психологических исследований 2022–2025 гг.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 5. СТАТИСТИКА ─────────────────────────────────── */
function SlideStats() {
  return (
    <div className="slide slide-stats">
      <div className="slide-header">
        <span className="slide-num">05</span>
        <h2>Статистика использования</h2>
      </div>
      <div className="stats-grid">
        {[
          { val: 87, suf: "%", label: "подростков в Telegram ежедневно", cl: "sc1" },
          { val: 72, suf: "%", label: "подростков активны ВКонтакте", cl: "sc2" },
          { val: 4, suf: "ч", label: "среднее экранное время в день", cl: "sc3" },
          { val: 12, suf: "", label: "лет — средний возраст начала", cl: "sc4" },
        ].map((s, i) => (
          <div className={`stat-card ${s.cl}`} key={i}>
            <div className="stat-big"><AnimatedNumber target={s.val} suffix={s.suf} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-bars">
        {[
          { label: "Telegram", pct: 87, color: "#a78bfa" },
          { label: "ВКонтакте", pct: 72, color: "#60a5fa" },
          { label: "YouTube", pct: 91, color: "#f87171" },
          { label: "TikTok", pct: 54, color: "#34d399" },
        ].map((b, i) => (
          <div className="tg-bar" key={i} style={{ padding: "10px 20px" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", minWidth: 90 }}>{b.label}</span>
            <div className="bar-track" style={{ flex: 1 }}>
              <div className="bar-fill" style={{ width: `${b.pct}%`, background: `linear-gradient(90deg, ${b.color}88, ${b.color})`, animationDelay: `${i * 0.1}s` }}>
                <span>{b.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 6. ВКОНТАКТЕ ──────────────────────────────────── */
function SlideVK() {
  const features = [
    { icon: "Users", title: "Сообщества", text: "Миллионы групп по интересам — от учёбы до хобби. Подростки находят «своих» и формируют идентичность." },
    { icon: "Music", title: "Музыка и видео", text: "ВКонтакте — главная музыкальная платформа для молодёжи. Формирует вкусы и культурный код поколения." },
    { icon: "MessageSquare", title: "Общение", text: "Переписки, звонки, стены — ВК остаётся основной площадкой для неформального общения школьников." },
    { icon: "Image", title: "Самопрезентация", text: "Профиль, фото, репосты — подростки учатся формировать публичный образ и управлять впечатлением." },
  ];
  const risks = [
    "Алгоритмическая лента создаёт «информационный пузырь»",
    "Сравнение с чужими «идеальными» жизнями снижает самооценку",
    "Лайки и реакции формируют зависимость от чужого одобрения",
    "Высокий риск кибербуллинга в открытых сообществах",
  ];
  return (
    <div className="slide slide-vk">
      <div className="slide-header">
        <span className="slide-num">06</span>
        <h2>ВКонтакте и подростки</h2>
        <span className="platform-tag vk-tag">VK</span>
      </div>
      <div className="platform-layout">
        <div className="platform-features">
          {features.map((f, i) => (
            <div className="plat-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="plat-icon vk-icon">
                <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
              </div>
              <div>
                <div className="plat-title">{f.title}</div>
                <div className="plat-text">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="platform-risks">
          <div className="risks-title">⚠️ Риски платформы</div>
          {risks.map((r, i) => (
            <div className="risk-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="risk-dot vk-dot" />
              <span>{r}</span>
            </div>
          ))}
          <div className="vk-stat-box">
            <div className="vk-stat-num">72%</div>
            <div className="vk-stat-text">подростков используют ВК для поиска развлечений и общения ежедневно</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. TELEGRAM ───────────────────────────────────── */
function SlideTelegram() {
  const features = [
    { icon: "Send", title: "Мессенджер", text: "Быстрые личные и групповые чаты. Подростки общаются с классом, друзьями и семьёй в одном месте." },
    { icon: "Rss", title: "Каналы", text: "Образовательный контент, новости, хобби. Telegram — главный источник информации для поколения Z." },
    { icon: "Bot", title: "Боты", text: "Боты для учёбы, переводов, расписания. Формируют технологическую грамотность с раннего возраста." },
    { icon: "Lock", title: "Приватность", text: "Закрытые группы, секретные чаты — подростки ценят ощущение безопасности и контроля над данными." },
  ];
  const risks = [
    "Неконтролируемый доступ к взрослому и опасному контенту",
    "Закрытые чаты скрывают общение от родителей",
    "Распространение фейков через непроверенные каналы",
    "Вербовка в деструктивные сообщества через боты",
  ];
  return (
    <div className="slide slide-telegram">
      <div className="slide-header">
        <span className="slide-num">07</span>
        <h2>Telegram и подростки</h2>
        <span className="platform-tag tg-tag">TG</span>
      </div>
      <div className="platform-layout">
        <div className="platform-features">
          {features.map((f, i) => (
            <div className="plat-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="plat-icon tg-icon">
                <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
              </div>
              <div>
                <div className="plat-title">{f.title}</div>
                <div className="plat-text">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="platform-risks">
          <div className="risks-title">⚠️ Риски платформы</div>
          {risks.map((r, i) => (
            <div className="risk-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="risk-dot tg-dot" />
              <span>{r}</span>
            </div>
          ))}
          <div className="tg-stat-box">
            <div className="tg-stat-num">87%</div>
            <div className="tg-stat-text">подростков используют Telegram ежедневно — это самый быстрорастущий мессенджер среди 12–17 лет</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 8. ПОЗИТИВ ────────────────────────────────────── */
function SlidePositive() {
  const items = [
    { icon: "Users", title: "Коммуникация", text: "ВКонтакте и Telegram позволяют общаться без барьеров — подростки поддерживают отношения на расстоянии." },
    { icon: "BookOpen", title: "Обучение", text: "Образовательные каналы Telegram и сообщества ВКонтакте помогают готовиться к ЕГЭ и изучать языки." },
    { icon: "Heart", title: "Поддержка", text: "Группы по интересам дают ощущение принадлежности и помогают найти единомышленников по всей стране." },
    { icon: "Zap", title: "Самовыражение", text: "Создание контента, стикеров, ботов, постов — развивает творческие и технические навыки." },
  ];
  return (
    <div className="slide slide-positive">
      <div className="slide-header">
        <span className="slide-num">08</span>
        <h2>Позитивное влияние</h2>
      </div>
      <div className="pos-layout">
        <div className="pos-img-wrap">
          <img src={POSITIVE_IMG} alt="Подростки и телефоны" className="pos-img" />
          <div className="pos-img-badge">✨ Возможности</div>
        </div>
        <div className="pos-grid">
          {items.map((item, i) => (
            <div className="pos-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="pos-icon">
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={20} />
              </div>
              <div>
                <div className="pos-title">{item.title}</div>
                <div className="pos-text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 9. ПРОБЛЕМЫ ───────────────────────────────────── */
function SlideProblems() {
  const problems = [
    { icon: "Moon", label: "Нарушение сна", pct: 78, color: "#ff6b6b" },
    { icon: "Brain", label: "Снижение концентрации", pct: 65, color: "#ffa94d" },
    { icon: "ShieldOff", label: "Кибербуллинг", pct: 42, color: "#ff6b6b" },
    { icon: "Eye", label: "Информационная зависимость", pct: 71, color: "#da77f2" },
    { icon: "TrendingDown", label: "Снижение самооценки", pct: 58, color: "#ffa94d" },
    { icon: "Clock", label: "Прокрастинация", pct: 83, color: "#da77f2" },
  ];
  return (
    <div className="slide slide-problems">
      <div className="slide-header">
        <span className="slide-num">09</span>
        <h2>Проблемы и риски</h2>
      </div>
      <div className="prob-grid">
        {problems.map((p, i) => (
          <div className="prob-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="prob-header">
              <Icon name={p.icon as Parameters<typeof Icon>[0]["name"]} size={16} />
              <span>{p.label}</span>
              <span className="prob-pct" style={{ color: p.color }}>{p.pct}%</span>
            </div>
            <div className="prob-bar-track">
              <div className="prob-bar-fill" style={{ width: `${p.pct}%`, background: p.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="prob-note">* данные исследований РАН и ВШЭ, 2024–2025</div>
    </div>
  );
}

/* ── 10. РЕКОМЕНДАЦИИ ──────────────────────────────── */
function SlideRecs() {
  const recs = [
    { num: "01", icon: "Timer", title: "Цифровой детокс", text: "Выделяйте 1–2 часа в день без телефона. Практикуйте «тихий час» перед сном." },
    { num: "02", icon: "Shield", title: "Настройки приватности", text: "Закрытые аккаунты, осознанный выбор подписок, блокировка токсичного контента." },
    { num: "03", icon: "MessageCircle", title: "Открытый диалог", text: "Родители и дети — говорите о том, что вы читаете в ВКонтакте и Telegram." },
    { num: "04", icon: "Activity", title: "Офлайн-активность", text: "Спорт, хобби, живое общение — равновесие между онлайн и реальной жизнью." },
  ];
  return (
    <div className="slide slide-recs">
      <div className="slide-header">
        <span className="slide-num">10</span>
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

/* ── 11. ЗАКЛЮЧЕНИЕ ────────────────────────────────── */
function SlideConclusion() {
  return (
    <div className="slide slide-conclusion">
      <div className="concl-bg" />
      <div className="concl-content">
        <div className="concl-tag">💡 Выводы</div>
        <h2 className="concl-title">
          ВКонтакте и Telegram — инструменты.<br />
          <span className="concl-accent">Важно, как мы их используем.</span>
        </h2>
        <div className="concl-points">
          {[
            "Соцсети — неотъемлемая часть жизни подростка, отрицать это бессмысленно",
            "ВКонтакте формирует социальную идентичность, Telegram развивает информационную культуру",
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
