import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const POSITIVE_IMG = "https://cdn.poehali.dev/projects/fefbc50d-f8a7-422e-9600-e241191f5018/files/19e9f187-f287-4497-8c3d-12b217b2ae13.jpg";

export function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
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

/* ── 5. СТАТИСТИКА ─────────────────────────────────── */
export function SlideStats() {
  return (
    <div className="slide slide-stats">
      <div className="slide-header">
        <span className="slide-num">05</span>
        <h2>Статистика использования</h2>
      </div>
      <div className="stats-grid">
        {[
          { val: 80, suf: "%", label: "подростков используют соцсети ежедневно", cl: "sc1" },
          { val: 4,  suf: "ч", label: "среднее экранное время в день", cl: "sc2" },
          { val: 12, suf: "",  label: "лет — средний возраст начала использования", cl: "sc3" },
          { val: 63, suf: "%", label: "сообщают о тревоге без телефона", cl: "sc4" },
        ].map((s, i) => (
          <div className={`stat-card ${s.cl}`} key={i}>
            <div className="stat-big"><AnimatedNumber target={s.val} suffix={s.suf} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-bars">
        {[
          { label: "Смотрят видео", pct: 91, color: "#f87171" },
          { label: "Общаются в чатах", pct: 87, color: "#a78bfa" },
          { label: "Листают ленту", pct: 79, color: "#60a5fa" },
          { label: "Создают контент", pct: 54, color: "#34d399" },
        ].map((b, i) => (
          <div className="tg-bar" key={i} style={{ padding: "10px 20px" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", minWidth: 150 }}>{b.label}</span>
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

/* ── 6. ПЛАТФОРМЫ ──────────────────────────────────── */
export function SlidePlatforms() {
  return (
    <div className="slide slide-platforms">
      <div className="slide-header">
        <span className="slide-num">06</span>
        <h2>Популярные платформы</h2>
      </div>
      <p className="platforms-intro">
        Среди российских подростков наиболее распространены несколько платформ.
        Каждая имеет свою специфику и по-своему влияет на пользователя.
      </p>
      <div className="platforms-grid">
        <div className="platform-card pc-vk">
          <div className="pc-header">
            <div className="pc-emoji">💬</div>
            <div>
              <div className="pc-name">ВКонтакте</div>
              <div className="pc-reach">~72% подростков</div>
            </div>
          </div>
          <div className="pc-desc">
            Главная социальная сеть для общения, музыки и сообществ по интересам.
            Формирует социальную идентичность — профиль, группы, репосты учат
            подростка выстраивать публичный образ и находить «своих».
          </div>
          <div className="pc-tags">
            <span>Сообщества</span><span>Музыка</span><span>Новости</span>
          </div>
        </div>

        <div className="platform-card pc-tg">
          <div className="pc-header">
            <div className="pc-emoji">✈️</div>
            <div>
              <div className="pc-name">Telegram</div>
              <div className="pc-reach">~87% подростков</div>
            </div>
          </div>
          <div className="pc-desc">
            Быстрый мессенджер с каналами и ботами. Стал основным источником
            информации для поколения Z: образовательный контент, новости,
            подготовка к экзаменам — всё в одном приложении.
          </div>
          <div className="pc-tags">
            <span>Чаты</span><span>Каналы</span><span>Боты</span>
          </div>
        </div>

        <div className="platform-card pc-yt">
          <div className="pc-header">
            <div className="pc-emoji">▶️</div>
            <div>
              <div className="pc-name">Видеоплатформы</div>
              <div className="pc-reach">~91% подростков</div>
            </div>
          </div>
          <div className="pc-desc">
            Видео — главный формат контента для подростков. Короткие ролики
            формируют клиповое мышление, алгоритмы затягивают в бесконечную
            ленту рекомендаций.
          </div>
          <div className="pc-tags">
            <span>Шортсы</span><span>Стримы</span><span>Обучение</span>
          </div>
        </div>

        <div className="platform-card pc-other">
          <div className="pc-header">
            <div className="pc-emoji">🌐</div>
            <div>
              <div className="pc-name">Другие сети</div>
              <div className="pc-reach">TikTok, Pinterest, Discord</div>
            </div>
          </div>
          <div className="pc-desc">
            Узкоспециализированные платформы — для геймеров, творческих людей,
            фанатов. Создают плотные субкультурные сообщества с высоким
            уровнем вовлечённости.
          </div>
          <div className="pc-tags">
            <span>Субкультуры</span><span>Геймеры</span><span>Творчество</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. ПОЗИТИВ ────────────────────────────────────── */
export function SlidePositive() {
  const items = [
    { icon: "Users", title: "Коммуникация", text: "Соцсети позволяют общаться с друзьями и одноклассниками в любое время — без барьеров расстояния." },
    { icon: "BookOpen", title: "Обучение", text: "Образовательные каналы и сообщества помогают готовиться к ЕГЭ, изучать языки, следить за наукой." },
    { icon: "Heart", title: "Поддержка", text: "Группы по интересам дают ощущение принадлежности и помогают найти единомышленников по всей стране." },
    { icon: "Zap", title: "Самовыражение", text: "Создание контента, постов, ботов развивает творческие и технические навыки подростка." },
  ];
  return (
    <div className="slide slide-positive">
      <div className="slide-header">
        <span className="slide-num">07</span>
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

/* ── 8. РИСКИ ──────────────────────────────────────── */
export function SlideProblems() {
  const problems = [
    { icon: "Moon",         label: "Нарушение сна",              pct: 78, color: "#ff6b6b" },
    { icon: "Brain",        label: "Снижение концентрации",       pct: 65, color: "#ffa94d" },
    { icon: "ShieldOff",    label: "Кибербуллинг",                pct: 42, color: "#ff6b6b" },
    { icon: "Eye",          label: "Информационная зависимость",  pct: 71, color: "#da77f2" },
    { icon: "TrendingDown", label: "Снижение самооценки",         pct: 58, color: "#ffa94d" },
    { icon: "Clock",        label: "Прокрастинация",              pct: 83, color: "#da77f2" },
  ];
  return (
    <div className="slide slide-problems">
      <div className="slide-header">
        <span className="slide-num">08</span>
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
