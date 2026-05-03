import { useNavigate } from 'react-router-dom'
import './Login.css'

const roles = [
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Monitor sectors, manage alerts, assign tasks, verify field work.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    key: 'operator',
    label: 'Operator',
    desc: 'View assigned tasks, update status, upload field evidence.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  {
    key: 'public',
    label: 'Public',
    desc: 'Submit water complaints, report emergencies, track request status.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
]

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = (role) => {
    sessionStorage.setItem('hc_role', role)
    if (role === 'public') {
      navigate('/requests')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      {/* Background image with blur overlay */}
      <div className="login-bg" />
      <div className="login-overlay" />

      <div className="login-container">
        {/* Logo */}
        <div className="login-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#2563EB" strokeWidth="2"/>
            <path d="M14 8c0 0-4 5-4 8a4 4 0 008 0c0-3-4-8-4-8z" fill="#2563EB"/>
          </svg>
          <span>HydroCoord</span>
        </div>

        <div className="login-card">
          <div className="login-card__header">
            <h1 className="login-card__title">Welcome back</h1>
            <p className="login-card__sub">Select your role to continue to the dashboard</p>
          </div>

          <div className="login-roles">
            {roles.map((r) => (
              <button
                key={r.key}
                className="login-role-btn"
                style={{ '--role-color': r.color, '--role-bg': r.bg, '--role-border': r.border }}
                onClick={() => handleLogin(r.key)}
              >
                <div className="login-role-btn__icon" style={{ background: r.bg, color: r.color, border: `1px solid ${r.border}` }}>
                  {r.icon}
                </div>
                <div className="login-role-btn__content">
                  <div className="login-role-btn__label">{r.label}</div>
                  <div className="login-role-btn__desc">{r.desc}</div>
                </div>
                <svg className="login-role-btn__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>

          <p className="login-card__note">
            This is a demonstration system. No credentials required.
          </p>
        </div>

        <p className="login-back">
          <button onClick={() => navigate('/')} className="login-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to home
          </button>
        </p>
      </div>
    </div>
  )
}
