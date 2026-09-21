import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Clock3, PackageCheck, Route as RouteIcon, UsersRound } from "lucide-react";
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
const milestones = ["São Paulo", "Vale do Paraíba", "Minas Gerais", "Norte de Minas", "Bahia", "Sertão baiano", "Pernambuco", "Catimbau"];

function Index() {
  const [day, setDay] = useState(4);
  const [total, setTotal] = useState(7);
  const routeRef = useRef<SVGPathElement>(null);
  const [truck, setTruck] = useState({ x: origin.x, y: origin.y, angle: -42 });
  const [intro, setIntro] = useState(true);
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
    const timer = window.setTimeout(() => setIntro(false), 3100);
    return () => window.clearTimeout(timer);
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
  const distance = Math.round(2140 * progress);
  const remaining = Math.max(0, total - day);
  const cargo = Math.round(18.4 * progress * 10) / 10;
  const families = Math.round(2400 * progress);
  const kpis = [
    { label: "Distância percorrida", value: distance.toLocaleString("pt-BR"), unit: "km", icon: RouteIcon },
    { label: "Carga em movimento", value: cargo.toLocaleString("pt-BR", { minimumFractionDigits: 1 }), unit: "t", icon: PackageCheck },
    { label: "Famílias alcançadas", value: families.toLocaleString("pt-BR"), unit: "", icon: UsersRound },
    { label: arrived ? "Viagem concluída" : "Previsão de chegada", value: arrived ? "Hoje" : `${remaining}`, unit: arrived ? "" : remaining === 1 ? "dia" : "dias", icon: Clock3 },
  ];

  return (
    <main className="dashboard-shell">
      <div className={`globe-intro ${intro ? "is-visible" : ""}`} aria-hidden={!intro}>
        <div className="globe-scene">
          <div className="globe-orbit" />
          <svg viewBox="0 0 560 560" className="intro-globe" aria-hidden="true">
            <circle cx="280" cy="280" r="245" className="ocean" />
            <ellipse cx="280" cy="280" rx="245" ry="94" className="globe-line" />
            <ellipse cx="280" cy="280" rx="105" ry="245" className="globe-line" />
            <path d="M35 280h490M68 165h424M68 395h424" className="globe-line" />
            <g className="intro-brazil" transform="translate(-8 3)">
              {brazilStates.map((state) => <path key={state.name} d={state.d} />)}
            </g>
          </svg>
          <img src={logoAsset.url} alt="" />
          <p>Conectando São Paulo ao sertão</p>
        </div>
      </div>

      <section className={`dashboard-panel ${intro ? "is-waiting" : ""}`} aria-label="Painel logístico Amigos do Bem">
        <div className="panel-heading">
          <div className="brand-lockup">
            <img src={logoAsset.url} alt="Amigos do Bem" />
            <div><p className="eyebrow">Operação logística</p><h1>Jornada de impacto</h1></div>
          </div>
          <div className="live-chip"><i /> Atualização da viagem</div>
        </div>

        <div className="kpi-grid">
          {kpis.map(({ label, value, unit, icon: Icon }) => (
            <article className="metric-card" key={label}>
              <div className="metric-icon"><Icon size={18} strokeWidth={1.8} /></div>
              <div><p>{label}</p><strong>{value} <small>{unit}</small></strong></div>
              <span className="metric-progress" style={{ width: `${percent}%` }} />
            </article>
          ))}
        </div>

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
                <rect className="trailer" x="2" y="4" width="61" height="35" rx="3" />
                <path className="trailer-ribs" d="M8 7v29M13 7v29M18 7v29M23 7v29M28 7v29M33 7v29M38 7v29M43 7v29M48 7v29M53 7v29M58 7v29" />
                <rect className="truck-cab" x="64" y="13" width="29" height="26" rx="4" />
                <path className="truck-cab" d="M75 13h10l8 10H75z" />
                <path className="truck-window" d="M78 16h6l5 7H78z" />
                <rect className="truck-bumper" x="91" y="32" width="6" height="5" rx="1" />
                <image href={logoAsset.url} x="21" y="10" width="26" height="24" preserveAspectRatio="xMidYMid meet" />
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

        </section>

        <section className="timeline-card" aria-label="Linha do tempo da viagem">
          <div className="timeline-heading"><div><p className="eyebrow">Linha da jornada</p><h2>{milestones[Math.min(day, 7)]}</h2></div><strong>{percent}%</strong></div>
          <div className="timeline-track"><span style={{ width: `${percent}%` }} /></div>
          <div className="timeline-days">
            {Array.from({ length: total + 1 }, (_, index) => (
              <button key={index} type="button" className={index === day ? "active" : index < day ? "complete" : ""} onClick={() => setDay(index)} aria-label={`Selecionar dia ${index}`}>
                <i>{index < day ? "✓" : index}</i><span>Dia {index}</span><small>{milestones[Math.min(index, 7)]}</small>
              </button>
            ))}
          </div>
        </section>
        <p className="demo-note">Indicadores demonstrativos, sincronizados ao progresso da viagem.</p>
      </section>
    </main>
  );
}
