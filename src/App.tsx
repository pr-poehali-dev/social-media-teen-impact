import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import "./App.css";

const HERO_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/d841e864-1f65-4a36-ba77-a0c4085146b4.jpg";
const POSITIVE_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/19e9f187-f287-4497-8c3d-12b217b2ae13.jpg";

const TOTAL = 6;

const slides = [
  { id: 0, label: "Обложка" },
  { id: 1, label: "Статистика" },
  { id: 2, label: "Позитив" },
  { id: 3, label: "Проблемы" },
  { id: 4, label: "Рекомендации" },
  { id: 5, label: "Заключение" },
];

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
        {current === 0 && <SlideHero />}
        {current === 1 && <SlideStats />}
        {current === 2 && <SlidePositive />}
        {current === 3 && <SlideProblems />}
        {current === 4 && <SlideRecs />}
        {current === 5 && <SlideConclusion />}
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

function SlideHero() {
  return (
    <div className="slide slide-hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">📱 Telegram · Исследование 2026</div>
        <h1 className="hero-title">
          Влияние<br />
          <span className="hero-accent">соцсетей</span><br />
          на подростков
        </h1>
        <p className="hero-sub">
          Как мессенджеры и социальные сети<br />
          меняют жизнь молодого поколения
        </p>
        <div className="hero-scroll">
          <Icon name="ChevronsDown" size={20} />
          <span>Листайте стрелками или кнопками</span>
        </div>
      </div>
    </div>
  );
}

function SlideStats() {
  return (
    <div className="slide slide-stats">
      <div className="slide-header">
        <span className="slide-num">01</span>
        <h2>Статистика использования</h2>
      </div>
      <div className="stats-grid">
        {[
          { val: 87, suf: "%", label: "подростков используют Telegram ежедневно", cl: "sc1" },
          { val: 4, suf: "ч", label: "среднее время в соцсетях в день", cl: "sc2" },
          { val: 12, suf: "", label: "лет — средний возраст начала использования", cl: "sc3" },
          { val: 63, suf: "%", label: "сообщают о тревоге без телефона", cl: "sc4" },
        ].map((s, i) => (
          <div className={`stat-card ${s.cl}`} key={i}>
            <div className="stat-big"><AnimatedNumber target={s.val} suffix={s.suf} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="tg-bar">
        <span>📨 Telegram в России среди 12–17 лет</span>
        <div className="bar-track">
          <div className="bar-fill"><span>87%</span></div>
        </div>
      </div>
    </div>
  );
}

function SlidePositive() {
  const items = [
    { icon: "Users", title: "Коммуникация", text: "Telegram позволяет общаться с друзьями, семьёй, одноклассниками в любое время — без барьеров." },
    { icon: "BookOpen", title: "Обучение", text: "Каналы и боты помогают учиться: готовиться к ЕГЭ, изучать языки, следить за наукой." },
    { icon: "Heart", title: "Поддержка", text: "Группы по интересам дают ощущение принадлежности, помогают найти единомышленников." },
    { icon: "Zap", title: "Самовыражение", text: "Создание контента, стикеров, ботов развивает творческие и технические навыки." },
  ];
  return (
    <div className="slide slide-positive">
      <div className="slide-header">
        <span className="slide-num">02</span>
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
        <span className="slide-num">03</span>
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

function SlideRecs() {
  const recs = [
    { num: "01", icon: "Timer", title: "Цифровой детокс", text: "Выделяйте 1–2 часа в день без телефона. Практикуйте «тихий час» перед сном." },
    { num: "02", icon: "Shield", title: "Настройки приватности", text: "Закрытые аккаунты, осознанный выбор подписок, блокировка токсичного контента." },
    { num: "03", icon: "MessageCircle", title: "Открытый диалог", text: "Родители и дети — говорите о том, что вы читаете и смотрите в Telegram." },
    { num: "04", icon: "Activity", title: "Офлайн-активность", text: "Спорт, хобби, живое общение — равновесие между онлайн и реальной жизнью." },
  ];
  return (
    <div className="slide slide-recs">
      <div className="slide-header">
        <span className="slide-num">04</span>
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

function SlideConclusion() {
  return (
    <div className="slide slide-conclusion">
      <div className="concl-bg" />
      <div className="concl-content">
        <div className="concl-tag">💡 Итог</div>
        <h2 className="concl-title">
          Telegram — инструмент.<br />
          <span className="concl-accent">Важно, как мы его используем.</span>
        </h2>
        <div className="concl-points">
          {[
            "Соцсети открывают новые возможности для обучения и общения",
            "Осознанное использование снижает негативные эффекты",
            "Цифровая грамотность — навык XXI века для каждого подростка",
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
