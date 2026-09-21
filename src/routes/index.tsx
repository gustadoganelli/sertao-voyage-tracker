import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { brazilStates, projectBrazil } from "../data/brazilPaths";
import logoAsset from "../assets/logo-amigos-do-bem.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jornada da Carreta | Amigos do Bem" },
      { name: "description", content: "KPI executivo da jornada logística entre São Paulo e Catimbau, Pernambuco." },
      { property: "og:title", content: "Jornada da Carreta | Amigos do Bem" },
      { property: "og:description", content: "Acompanhe o progresso da carreta dos Amigos do Bem rumo ao sertão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

declare global {
  interface Window {
    updateCarreta: (diasDecorridos: number, diasTotais: number) => void;
  }
}

const origin = projectBrazil(-46.6333, -23.5505);
const destination = projectBrazil(-37.155, -8.617);
const routePath = `M ${origin.x} ${origin.y} C 405 375, 405 335, 439 307 C 472 279, 480 238, ${destination.x} ${destination.y}`;

function Index() {
  const [day, setDay] = useState(4);
  const [total, setTotal] = useState(7);
  const routeRef = useRef<SVGPathElement>(null);
  const [truck, setTruck] = useState({ x: origin.x, y: origin.y, angle: -42 });
  const progress = Math.min(1, Math.max(0, total ? day / total : 0));
  const percent = Math.round(progress * 100);

  useEffect(() => {
    window.updateCarreta = (diasDecorridos, diasTotais) => {
      const safeTotal = Math.max(1, Number(diasTotais) || 7);
      setTotal(safeTotal);
      setDay(Math.min(safeTotal, Math.max(0, Number(diasDecorridos) || 0)));
    };
    return () => {
      delete (window as Partial<Window>).updateCarreta;
    };
  }, []);

  useEffect(() => {
    const path = routeRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * progress);
    const ahead = path.getPointAtLength(Math.min(length, length * progress + 2));
    const behind = path.getPointAtLength(Math.max(0, length * progress - 2));
    setTruck({ x: point.x, y: point.y, angle: Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI });
  }, [progress]);

  const arrived = progress >= 1;
  const status = arrived ? "Chegada no sertão" : progress >= 0.7 ? "Chegando a Pernambuco" : progress > 0 ? "Em trânsito" : "Partida programada";

  return (
    <main className="dashboard-shell">
      <section className="journey-card" aria-label="Jornada da carreta dos Amigos do Bem">
        <header className="card-header">
          <div className="brand-lockup">
            <img src={logoAsset.url} alt="Amigos do Bem" />
            <div>
              <p className="eyebrow">Jornada da carreta</p>
              <h1>São Paulo <span>• SP</span> <b aria-hidden="true">→</b> Catimbau <span>• PE</span></h1>
            </div>
          </div>
          <div className="day-counter" aria-live="polite"><span>Dia</span><strong>{day}/{total}</strong></div>
        </header>

        <div className="map-stage">
          <svg className="brazil-map" viewBox="0 0 560 560" role="img" aria-label={`Mapa do Brasil, viagem ${percent}% concluída`}>
            <defs>
              <filter id="truck-shadow" x="-50%" y="-50%" width="200%" height="220%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity=".22" />
              </filter>
            </defs>
            <g className="states">
              {brazilStates.map((state) => <path key={state.name} d={state.d}><title>{state.name}</title></path>)}
            </g>
            <path className="route-track" d={routePath} pathLength="100" />
            <path ref={routeRef} className="route-progress" d={routePath} pathLength="100" style={{ strokeDasharray: `${percent} 100` }} />

            <g className="map-point origin-point" transform={`translate(${origin.x} ${origin.y})`}>
              <circle className="point-ring" r="11" /><circle r="5" />
            </g>
            <g className={`map-point destination-point ${arrived ? "arrived" : ""}`} transform={`translate(${destination.x} ${destination.y})`}>
              <circle className="point-ring" r="12" /><circle r="5" />
            </g>
            <g className="place-label origin-label" transform={`translate(${origin.x - 13} ${origin.y + 28})`}>
              <text textAnchor="end"><tspan>São Paulo</tspan><tspan x="0" dy="13">SP</tspan></text>
            </g>
            <g className="place-label destination-label" transform={`translate(${destination.x - 14} ${destination.y - 21})`}>
              <text textAnchor="end"><tspan>Catimbau</tspan><tspan x="0" dy="13">PE</tspan></text>
            </g>

            <g className="truck" transform={`translate(${truck.x} ${truck.y}) rotate(${truck.angle})`} filter="url(#truck-shadow)">
              <g transform="translate(-45 -31)">
                <rect className="trailer" x="2" y="4" width="61" height="35" rx="4" />
                <rect className="truck-cab" x="64" y="13" width="29" height="26" rx="4" />
                <path className="truck-cab" d="M75 13h10l8 10H75z" />
                <path className="truck-window" d="M78 16h6l5 7H78z" />
                <rect className="truck-bumper" x="91" y="32" width="6" height="5" rx="1" />
                <image href={logoAsset.url} x="15" y="8" width="34" height="27" preserveAspectRatio="xMidYMid meet" />
                <circle className="wheel" cx="20" cy="41" r="6" /><circle className="hub" cx="20" cy="41" r="2.3" />
                <circle className="wheel" cx="74" cy="41" r="6" /><circle className="hub" cx="74" cy="41" r="2.3" />
                <circle className="wheel" cx="87" cy="41" r="6" /><circle className="hub" cx="87" cy="41" r="2.3" />
              </g>
            </g>
          </svg>
          <div className="route-legend" aria-hidden="true"><i /> SP <span>→</span> PE</div>
        </div>

        <footer className="card-footer">
          <div className="status-copy">
            <span className={arrived ? "status-dot arrived" : "status-dot"} />
            <div><strong>{status}</strong><small>{arrived ? "Catimbau, PE" : `${percent}% da jornada`}</small></div>
          </div>
          <div className="progress-block">
            <div className="progress-meta"><span>Progresso da rota</span><strong>{percent}%</strong></div>
            <div className="progress-rail"><span style={{ width: `${percent}%` }} /></div>
          </div>
        </footer>

        <div className="day-selector" aria-label="Simular dia da viagem">
          {Array.from({ length: total + 1 }, (_, index) => (
            <button key={index} type="button" className={index === day ? "active" : ""} onClick={() => setDay(index)} aria-label={`Dia ${index}`}>{index}</button>
          ))}
        </div>
      </section>
    </main>
  );
}
