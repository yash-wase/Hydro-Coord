import { NavLink, useNavigate } from 'react-router-dom'
import { getRole } from '../../context/AuthContext'
import sidebarImg from '../../assets/sidebar_img.png'
import './Sidebar.css'

const allNavItems = [
  {
    path: '/dashboard', label: 'Dashboard',
    icon: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z',
    roles: ['admin', 'operator', 'public'],
  },
  {
    path: '/tasks', label: 'Tasks',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    roles: ['admin', 'operator'],
  },
  {
    path: '/alerts', label: 'Alerts',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0',
    roles: ['admin'],
  },
  {
    path: '/requests', label: 'Requests',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    roles: ['admin', 'public'],
  },
  {
    path: '/verification', label: 'Verification',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    roles: ['admin'],
  },
  {
    path: '/tankers', label: 'Tankers',
    icon: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
    roles: ['admin', 'operator', 'public'],
  },
]

const roleLabels = { admin: 'Admin', operator: 'Operator', public: 'Public' }
const roleColors = { admin: '#2563EB', operator: '#059669', public: '#D97706' }

function getColor(p) {
  if (p < 30) return '#EF4444'
  if (p < 70) return '#F59E0B'
  return '#22C55E'
}

export default function Sidebar({ pressureData = {} }) {
  const navigate = useNavigate()
  const role = getRole()
  const navItems = allNavItems.filter(item => !role || item.roles.includes(role))
  const sectorList = Object.entries(pressureData)

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar__brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="#2563EB" strokeWidth="2"/>
          <path d="M14 8c0 0-4 5-4 8a4 4 0 008 0c0-3-4-8-4-8z" fill="#2563EB"/>
        </svg>
        <span>HydroCoord</span>
      </div>

      {role && (
        <div className="sidebar__role-badge" style={{ borderColor: roleColors[role], color: roleColors[role] }}>
          {roleLabels[role]}
        </div>
      )}

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Live sector pressure mini-list */}
      {sectorList.length > 0 && (
        <div className="sidebar__sectors">
          <div className="sidebar__sectors-title">Live Pressure</div>
          {sectorList.map(([id, v]) => (
            <div key={id} className="sidebar__sector-row">
              <span className="sidebar__sector-id">{id}</span>
              <div className="sidebar__sector-bar">
                <div
                  className="sidebar__sector-fill"
                  style={{ width: `${v.pressure}%`, background: getColor(v.pressure) }}
                />
              </div>
              <span className="sidebar__sector-val" style={{ color: getColor(v.pressure) }}>
                {v.pressure}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="sidebar__image">
        <img src={sidebarImg} alt="Water delivery" />
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__status">
          <span className="sidebar__status-dot" />
          Grid Online
        </div>
        <div className="sidebar__version">v1.0.0</div>
      </div>
    </aside>
  )
}
