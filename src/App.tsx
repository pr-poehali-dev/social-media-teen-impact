import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import "./App.css";

import { SlideHero, SlideRelevance, SlideGoals, SlideProblem, SlideObject } from "@/components/presentation/slides-intro";
import { SlideStats, SlidePlatforms, SlidePositive, SlideProblems } from "@/components/presentation/slides-data";
import { SlideRecs, SlideConclusion } from "@/components/presentation/slides-outro";

const slides = [
  { id: 0,  label: "Обложка" },
  { id: 1,  label: "Актуальность" },
  { id: 2,  label: "Цель и задачи" },
  { id: 3,  label: "Проблема" },
  { id: 4,  label: "Объект" },
  { id: 5,  label: "Статистика" },
  { id: 6,  label: "Платформы" },
  { id: 7,  label: "Позитив" },
  { id: 8,  label: "Риски" },
  { id: 9,  label: "Рекомендации" },
  { id: 10, label: "Заключение" },
];

const TOTAL = slides.length;

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
        {current === 6  && <SlidePlatforms />}
        {current === 7  && <SlidePositive />}
        {current === 8  && <SlideProblems />}
        {current === 9  && <SlideRecs />}
        {current === 10 && <SlideConclusion />}
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
