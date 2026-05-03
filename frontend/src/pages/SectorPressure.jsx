import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import LeafletMap from '../components/map/LeafletMap'
import './SectorPressure.css'

function getColor(p) {
  if (p < 30) return 'var(--critical)'
  if (p < 70) return 'var(--warning)'
  return 'var(--normal)'
}

export default function SectorPressure() {
  const { pressureData = {} } = useOutletContext() || {}
  const [selectedSector, setSelectedSector] = useState(null)

  const sectors = Object.entries(pressureData)
  const loading = sectors.length === 0
  const avg = sectors.length
    ? Math.round(sectors.reduce((a, [, v]) => a + v.pressure, 0) / sectors.length)
    : '--'
  const activeAlerts = sectors.filter(([, v]) => v.alert || v.pressure < 30)
  const criticalCount = sectors.filter(([, v]) => v.pressure < 30).length
  const normalCount = sectors.filter(([, v]) => v.pressure >= 70).length

  return (
    <div className="page-content">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card__label">Avg Pressure</div>
          <div className="stat-card__value">
            {loading ? '...' : avg}
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}> PSI</span>
          </div>
          <div className="stat-card__sub">Across {sectors.length} sectors</div>
        </div>
        <div className={`stat-card ${activeAlerts.length > 0 ? 'stat-card--critical' : ''}`}>
          <div className="stat-card__label">Active Alerts</div>
          <div className="stat-card__value">{loading ? '...' : activeAlerts.length}</div>
          <div className="stat-card__sub">{criticalCount} critical</div>
        </div>
        <div className="stat-card stat-card--normal">
          <div className="stat-card__label">Sectors Normal</div>
          <div className="stat-card__value">{loading ? '...' : `${normalCount}/${sectors.length}`}</div>
          <div className="stat-card__sub">System health</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Data Source</div>
          <div className="stat-card__value" style={{ fontSize: 14 }}>Python Model</div>
          <div className="stat-card__sub">Refreshes every 30s</div>
        </div>
      </div>

      <div className="split-layout">
        <div className="card sp-map-card">
          <div className="sp-map-header">
            <span className="panel-title">Sector Pressure Map</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="badge badge--primary">Live</span>
            </div>
          </div>
          <div className="sp-map-legend">
            <span className="sp-legend-item">
              <span className="sp-legend-dot" style={{ background: '#22C55E' }} />Normal (70+)
            </span>
            <span className="sp-legend-item">
              <span className="sp-legend-dot" style={{ background: '#F59E0B' }} />Warning (30-69)
            </span>
            <span className="sp-legend-item">
              <span className="sp-legend-dot" style={{ background: '#EF4444' }} />Critical (&lt;30)
            </span>
          </div>
          <LeafletMap onSectorClick={setSelectedSector} pressureData={pressureData} />
        </div>

        <div className="sp-right-panel">
          {selectedSector && (
            <div className="card sp-sector-detail" style={{ marginBottom: 12 }}>
              <div className="panel-header">
                <span className="panel-title">Sector {selectedSector.id}</span>
                <button className="btn btn--sm" onClick={() => setSelectedSector(null)}>x</button>
              </div>
              <div className="sp-detail-name">{selectedSector.name}</div>
              <div className="sp-detail-pressure" style={{ color: getColor(selectedSector.pressure) }}>
                {selectedSector.pressure} PSI
              </div>
              {selectedSector.alert && (
                <div className="badge badge--critical" style={{ marginTop: 8 }}>
                  Alert: {selectedSector.alert}
                </div>
              )}
            </div>
          )}

          <div className="card">
            <div className="panel-header">
              <span className="panel-title">Active Alerts</span>
              <span className="badge badge--critical">{activeAlerts.length}</span>
            </div>
            {activeAlerts.length === 0 && !loading && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '8px 0' }}>
                No active alerts
              </div>
            )}
            {activeAlerts.map(([id, v]) => (
              <div className="alert-item" key={id}>
                <span className="alert-dot alert-dot--critical" />
                <div>
                  <div className="alert-item__text">Sector {id} - {v.alert || 'LOW_PRESSURE'}</div>
                  <div className="alert-item__sub">{v.pressure} PSI</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <div className="panel-header">
              <span className="panel-title">All Sectors</span>
            </div>
            {loading ? (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Loading...</div>
            ) : (
              sectors.map(([id, v]) => (
                <div
                  key={id}
                  className="sp-sector-row"
                  onClick={() => setSelectedSector({ id, ...v })}
                >
                  <span className="sp-sector-row__id">{id}</span>
                  <div style={{ flex: 1, margin: '0 8px' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 3 }}>
                      {v.name ? v.name.replace(/^Sector\s+\w+\s*[–-]\s*/i, '') : id}
                    </div>
                    <div className="sp-pressure-bar">
                      <div
                        className="sp-pressure-fill"
                        style={{ width: `${v.pressure}%`, background: getColor(v.pressure) }}
                      />
                    </div>
                  </div>
                  <span className="sp-pressure-val" style={{ color: getColor(v.pressure) }}>
                    {v.pressure}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
