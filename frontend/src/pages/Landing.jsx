import { useNavigate } from 'react-router-dom'
import './Landing.css'

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Real-Time Pressure Monitoring',
    desc: 'Sector-wise pressure values computed by Python models, visualized live on an interactive Leaflet map.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Intelligent Alert System',
    desc: 'Anomaly detection triggers severity-based alerts automatically when pressure drops below threshold.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h4"/>
      </svg>
    ),
    title: 'Task Management',
    desc: 'Full workflow from alert to task creation, operator assignment, field execution, and admin verification.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Verification Workflow',
    desc: 'Operators upload field evidence. Admins approve or reject with a full audit trail per task.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title: 'Interactive Sector Map',
    desc: 'GeoJSON-powered Leaflet map with color-coded sectors. Click any sector for pressure details and alerts.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Python Model Engine',
    desc: 'Two-layer computation: baseline pressure via Model 1, event-based adjustment and predictions via Model 2.',
  },
]

const stats = [
  { value: '72', label: 'Monitored Sectors' },
  { value: '9', label: 'States Covered' },
  { value: '<2s', label: 'Response Time' },
  { value: '99%', label: 'System Uptime' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      {/* ── NAV ── */}
      <nav className="landing-nav">
        <div className="landing-nav__logo">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#2563EB" strokeWidth="2"/>
            <path d="M14 8c0 0-4 5-4 8a4 4 0 008 0c0-3-4-8-4-8z" fill="#2563EB"/>
          </svg>
          <span>HydroCoord</span>
        </div>
        <div className="landing-nav__links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#stats">System</a>
          <button className="btn btn--primary" onClick={() => navigate('/login')}>
            Launch Dashboard
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="landing-hero">
        {/* Background image with blur */}
        <div className="landing-hero__bg" />
        <div className="landing-hero__bg-overlay" />

        <div className="landing-hero__inner">
          <div className="landing-hero__left">
            <div className="landing-hero__tag">
              <span className="landing-hero__tag-dot" />
              Water Infrastructure Intelligence
            </div>
            <h1 className="landing-hero__title">
              <span className="landing-hero__title--hydro">Hydro</span>-Coord<br />
              <span className="landing-hero__title--accent"></span>
            </h1>
            <p className="landing-hero__desc">
              HydroCoord gives water departments a real-time control dashboard —
              pressure maps, anomaly alerts, task workflows, and field verification
              in one unified system.
            </p>
            <div className="landing-hero__actions">
              <button className="btn btn--primary btn--lg" onClick={() => navigate('/login')}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2l10 6-10 6V2z"/></svg>
                Open Dashboard
              </button>
              <a href="#features" className="btn btn--lg btn--outline-white">See Features</a>
            </div>
            <div className="landing-hero__trust">
              <span className="landing-hero__trust-label">Powered by</span>
              <span className="landing-hero__trust-badge">React + Leaflet</span>
              <span className="landing-hero__trust-badge">Node.js</span>
              <span className="landing-hero__trust-badge">FastAPI</span>
            </div>
          </div>

          {/* Floating dashboard preview */}
          <div className="landing-hero__right">
            <div className="hero-visual">
            {/* Main dashboard card */}
            <div className="hero-card hero-card--main float-1">
              <div className="hero-card__header">
                <span className="hero-card__dot hero-card__dot--red" />
                <span className="hero-card__dot hero-card__dot--yellow" />
                <span className="hero-card__dot hero-card__dot--green" />
                <span className="hero-card__title">Sector Pressure Dashboard</span>
                <span className="hero-badge hero-badge--live">Live</span>
              </div>
              <div className="hero-map-mock">
                <div className="hero-map-grid">
                  {[
                    { id: 'A', p: 78, c: 'normal' },
                    { id: 'B', p: 42, c: 'warning' },
                    { id: 'C', p: 22, c: 'critical' },
                    { id: 'D', p: 85, c: 'normal' },
                    { id: 'E', p: 65, c: 'warning' },
                    { id: 'F', p: 91, c: 'normal' },
                  ].map(s => (
                    <div key={s.id} className={`hero-sector hero-sector--${s.c}`}>
                      <span className="hero-sector__id">{s.id}</span>
                      <div className="hero-sector__bar">
                        <div className="hero-sector__fill" style={{ width: `${s.p}%` }} />
                      </div>
                      <span className="hero-sector__val">{s.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alert card — floats top right */}
            <div className="hero-card hero-card--alert float-2">
              <div className="hero-alert-row hero-alert-row--critical">
                <span className="hero-alert-dot" />
                <div>
                  <div className="hero-alert-title">Sector C — PIPE_BURST</div>
                  <div className="hero-alert-sub">22 PSI · 2 min ago</div>
                </div>
              </div>
              <div className="hero-alert-row hero-alert-row--warning">
                <span className="hero-alert-dot hero-alert-dot--warning" />
                <div>
                  <div className="hero-alert-title">Sector B — LOW_PRESSURE</div>
                  <div className="hero-alert-sub">42 PSI · 5 min ago</div>
                </div>
              </div>
            </div>

            {/* Stats card — floats bottom left */}
            <div className="hero-card hero-card--stats float-3">
              <div className="hero-stat-row">
                <span className="hero-stat-label">Avg Pressure</span>
                <span className="hero-stat-value">63 PSI</span>
              </div>
              <div className="hero-stat-row">
                <span className="hero-stat-label">Active Alerts</span>
                <span className="hero-stat-value hero-stat-value--red">3</span>
              </div>
              <div className="hero-stat-row">
                <span className="hero-stat-label">Open Tasks</span>
                <span className="hero-stat-value">7</span>
              </div>
            </div>

            {/* Task pill — floats bottom right */}
            <div className="hero-card hero-card--task float-4">
              <div className="hero-task-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <div className="hero-task-name">Fix Leak — Sector C</div>
                <div className="hero-task-sub">Assigned to R. Kumar</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="landing-stats" id="stats">
        {stats.map((s, i) => (
          <div className="landing-stat" key={i}>
            <span className="landing-stat__value">{s.value}</span>
            <span className="landing-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="landing-how" id="how">
        <div className="landing-section-label">How it works</div>
        <h2 className="landing-section-title">From raw data to field action</h2>
        <div className="landing-how__steps">
          {[
            { num: '01', title: 'Python models compute pressure', desc: 'Model 1 generates baseline pressure per sector. Model 2 adjusts for complaints, rainfall, and events.' },
            { num: '02', title: 'Node.js backend aggregates data', desc: 'Express API proxies model output to the frontend, handling routing and data formatting.' },
            { num: '03', title: 'Leaflet map visualizes sectors', desc: 'GeoJSON sectors are color-coded in real time — green, orange, or red based on pressure thresholds.' },
            { num: '04', title: 'Alerts trigger tasks', desc: 'Anomalies auto-generate alerts. Admins create tasks, assign operators, and track progress end-to-end.' },
          ].map((s, i) => (
            <div className="how-step" key={i}>
              <div className="how-step__num">{s.num}</div>
              <div className="how-step__content">
                <div className="how-step__title">{s.title}</div>
                <div className="how-step__desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="landing-features" id="features">
        <div className="landing-section-label">Features</div>
        <h2 className="landing-section-title">Everything ops teams need</h2>
        <div className="landing-features__grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing-cta">
        <div className="landing-cta__bg" />
        <div className="landing-cta__overlay" />
        <div className="landing-cta__content">
          <h2 className="landing-cta__title">Ready to take control of your water network?</h2>
          <p className="landing-cta__desc">Open the dashboard and see live pressure data across all sectors.</p>
          <button className="btn btn--primary btn--lg" onClick={() => navigate('/login')}>
            Launch Dashboard
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="landing-footer__left">
          <div className="landing-footer__logo">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#2563EB" strokeWidth="2"/>
              <path d="M14 8c0 0-4 5-4 8a4 4 0 008 0c0-3-4-8-4-8z" fill="#2563EB"/>
            </svg>
            HydroCoord
          </div>
          <div className="landing-footer__by">by YashTechs</div>
        </div>
        <div className="landing-footer__right">
          <span className="landing-footer__copy">© 2026 HydroCoord — Smart Water Infrastructure</span>
          <div className="landing-footer__authors">
            <span className="landing-footer__author-label">Authors —</span>
            <span className="landing-footer__author-name">Yash Wase</span>
            <a href="https://www.linkedin.com/in/yash-wase/" target="_blank" rel="noopener noreferrer" className="landing-footer__social" aria-label="Yash Wase LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://github.com/yash-wase" target="_blank" rel="noopener noreferrer" className="landing-footer__social" aria-label="Yash Wase GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </a>
            <span className="landing-footer__author-divider">|</span>
            <span className="landing-footer__author-name">Pranesh Shelke</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
