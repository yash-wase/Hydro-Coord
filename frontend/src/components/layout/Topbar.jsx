import { useLocation, useNavigate } from 'react-router-dom'
import { getRole } from '../../context/AuthContext'
import './Topbar.css'

const pageTitles = {
  '/dashboard': 'Sector Pressure Dashboard',
  '/tasks': 'Task Management',
  '/alerts': 'Alert Center',
  '/verification': 'Verification Panel',
  '/requests': 'Public Requests',
  '/tankers': 'Tanker Fleet Directory',
}

const roleLabels = { admin: 'Admin', operator: 'Operator', public: 'Public' }
const roleColors = { admin: '#2563EB', operator: '#059669', public: '#D97706' }

const STATE_LABELS = { MH: 'Maharashtra', RJ: 'Rajasthan', TN: 'Tamil Nadu', KA: 'Karnataka', UP: 'Uttar Pradesh' }

export default function Topbar({ pressureData = {}, selectedState, setSelectedState }) {
  const location = useLocation()
  const navigate = useNavigate()
  const title = pageTitles[location.pathname] || 'Dashboard'
  const role = getRole()

  const sectors = Object.values(pressureData).filter(s => !selectedState || s.state === selectedState)
  const avgPSI = sectors.length > 0
    ? (sectors.reduce((sum, s) => sum + (s.pressure || 0), 0) / sectors.length).toFixed(1)
    : null
  const activeAlerts = sectors.filter(s => s.alert).length

  const handleLogout = () => {
    sessionStorage.removeItem('hc_role')
    navigate('/login')
  }

  return (
    <header className="topbar" id="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">{title}</h1>
      </div>
      <div className="topbar__right">
        {avgPSI !== null && (
          <>
            <div className="topbar__stat">
              <span className="topbar__stat-label">Avg PSI</span>
              <span className="topbar__stat-value">{avgPSI}</span>
            </div>
            <div className="topbar__divider" />
            <div className="topbar__stat">
              <span className="topbar__stat-label">Alerts</span>
              <span className="topbar__stat-value" style={{ color: activeAlerts > 0 ? '#EF4444' : 'var(--normal)' }}>
                {activeAlerts}
              </span>
            </div>
            <div className="topbar__divider" />
          </>
        )}
        <div className="topbar__weather">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <span>28°C</span>
          <span className="topbar__weather-label">Clear</span>
        </div>
        <div className="topbar__divider" />
        {setSelectedState && (
          <>
            <select
              className="topbar__state-select"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
            >
              {Object.entries(STATE_LABELS).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
            <div className="topbar__divider" />
          </>
        )}
        {role && (
          <div className="topbar__role" style={{ color: roleColors[role] }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {roleLabels[role]}
          </div>
        )}
        <div className="topbar__divider" />
        <button className="topbar__logout" onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Logout
        </button>
      </div>
    </header>
  )
}
