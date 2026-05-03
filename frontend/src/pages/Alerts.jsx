import { useState } from 'react'
import './Alerts.css'

const alertsData = [
  { id: 1, sector: 'C', severity: 'Critical', desc: 'Pressure below 20 PSI – possible pipe burst', status: 'Active', time: '2 min ago' },
  { id: 2, sector: 'G', severity: 'Critical', desc: 'Sudden pressure drop from 65 to 18 PSI', status: 'Active', time: '5 min ago' },
  { id: 3, sector: 'B', severity: 'Warning', desc: 'Pressure declining – 42 PSI and falling', status: 'Active', time: '12 min ago' },
  { id: 4, sector: 'E', severity: 'Warning', desc: 'Demand spike detected in central zone', status: 'Investigating', time: '18 min ago' },
  { id: 5, sector: 'A', severity: 'Warning', desc: 'Minor fluctuation detected', status: 'Resolved', time: '1 hr ago' },
  { id: 6, sector: 'D', severity: 'Critical', desc: 'Valve malfunction – supply interrupted', status: 'Resolved', time: '2 hr ago' },
  { id: 7, sector: 'F', severity: 'Warning', desc: 'Scheduled maintenance reminder', status: 'Resolved', time: '3 hr ago' },
  { id: 8, sector: 'H', severity: 'Critical', desc: 'Contamination risk – low flow detected', status: 'Resolved', time: '5 hr ago' },
]

export default function Alerts() {
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = alertsData.filter(a => {
    if (search && !a.desc.toLowerCase().includes(search.toLowerCase()) && !a.sector.toLowerCase().includes(search.toLowerCase())) return false
    if (severity !== 'All' && a.severity !== severity) return false
    if (status !== 'All' && a.status !== status) return false
    return true
  })

  const active = alertsData.filter(a => a.status === 'Active').length
  const critical = alertsData.filter(a => a.severity === 'Critical' && a.status !== 'Resolved').length
  const warnings = alertsData.filter(a => a.severity === 'Warning' && a.status !== 'Resolved').length
  const resolved = alertsData.filter(a => a.status === 'Resolved').length

  return (
    <div className="page-content">
      <div className="stats-row">
        <div className="stat-card stat-card--critical">
          <div className="stat-card__label">Active Alerts</div>
          <div className="stat-card__value">{active}</div>
        </div>
        <div className="stat-card stat-card--critical">
          <div className="stat-card__label">Critical</div>
          <div className="stat-card__value">{critical}</div>
        </div>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__label">Warnings</div>
          <div className="stat-card__value">{warnings}</div>
        </div>
        <div className="stat-card stat-card--normal">
          <div className="stat-card__label">Resolved</div>
          <div className="stat-card__value">{resolved}</div>
        </div>
      </div>

      <div className="card" id="alerts-table">
        <div className="panel-header">
          <span className="panel-title">Alert Log</span>
        </div>
        <div className="filters-bar">
          <input className="filter-input" placeholder="Search alerts..." value={search} onChange={e=>setSearch(e.target.value)} id="alert-search" />
          <select className="filter-input" value={severity} onChange={e=>setSeverity(e.target.value)} id="severity-filter">
            <option>All</option>
            <option>Critical</option>
            <option>Warning</option>
          </select>
          <select className="filter-input" value={status} onChange={e=>setStatus(e.target.value)} id="status-filter">
            <option>All</option>
            <option>Active</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td style={{fontWeight:600}}>Sector {a.sector}</td>
                  <td><span className={`badge ${a.severity==='Critical'?'badge--critical':'badge--warning'}`}>{a.severity}</span></td>
                  <td>{a.desc}</td>
                  <td><span className={`alerts-status alerts-status--${a.status.toLowerCase()}`}>{a.status}</span></td>
                  <td style={{color:'var(--text-secondary)',fontSize:12}}>{a.time}</td>
                  <td>
                    {a.status !== 'Resolved' ? (
                      <button className="btn btn--sm">Acknowledge</button>
                    ) : (
                      <span style={{fontSize:12,color:'var(--text-secondary)'}}>Closed</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{textAlign:'center',color:'var(--text-secondary)',padding:24}}>No alerts match filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
