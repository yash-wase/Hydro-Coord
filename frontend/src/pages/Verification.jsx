import { useState } from 'react'
import './Verification.css'

const initialVerifications = [
  { id: 'V-001', taskId: 'T-004', name: 'Adjust Pressure Valve', sector: 'E – Solapur', priority: 'Warning', operator: 'A. Das', submitted: '30 min ago', status: 'pending' },
  { id: 'V-002', taskId: 'T-005', name: 'Replace Meter Unit', sector: 'A – Nashik', priority: 'Normal', operator: 'P. Roy', submitted: '1 hr ago', status: 'pending' },
  { id: 'V-003', taskId: 'T-006', name: 'Clean Filter Station', sector: 'D – Pune', priority: 'Normal', operator: 'K. Joshi', submitted: '2 hr ago', status: 'approved' },
  { id: 'V-004', taskId: 'T-003', name: 'Inspect Pipeline Joint', sector: 'B – Aurangabad', priority: 'Warning', operator: 'M. Singh', submitted: '3 hr ago', status: 'pending' },
]

export default function Verification() {
  const [verifications, setVerifications] = useState(initialVerifications)
  const [selected, setSelected] = useState(initialVerifications[0])
  const [filterSector, setFilterSector] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = () => {
    const updated = verifications.map(v =>
      v.id === selected.id ? { ...v, status: 'approved' } : v
    )
    setVerifications(updated)
    setSelected({ ...selected, status: 'approved' })
    showToast(`Task "${selected.name}" approved and marked complete.`, 'success')
    // Auto-select next pending
    const nextPending = updated.find(v => v.id !== selected.id && v.status === 'pending')
    if (nextPending) setTimeout(() => setSelected(nextPending), 400)
  }

  const handleReject = () => {
    const updated = verifications.map(v =>
      v.id === selected.id ? { ...v, status: 'rejected' } : v
    )
    setVerifications(updated)
    setSelected({ ...selected, status: 'rejected' })
    showToast(`Task "${selected.name}" rejected — sent back to operator.`, 'error')
    const nextPending = updated.find(v => v.id !== selected.id && v.status === 'pending')
    if (nextPending) setTimeout(() => setSelected(nextPending), 400)
  }

  const filtered = verifications.filter(v => {
    if (filterSector !== 'All' && !v.sector.startsWith(filterSector)) return false
    if (filterPriority !== 'All' && v.priority !== filterPriority) return false
    return true
  })

  const pendingCount = verifications.filter(v => v.status === 'pending').length
  const approvedCount = verifications.filter(v => v.status === 'approved').length
  const rejectedCount = verifications.filter(v => v.status === 'rejected').length

  return (
    <div className="page-content">
      {/* Toast */}
      {toast && (
        <div className={`verify-toast verify-toast--${toast.type}`}>
          {toast.type === 'success'
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div className="stats-row" style={{ marginBottom: 16 }}>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__label">Pending Review</div>
          <div className="stat-card__value">{pendingCount}</div>
        </div>
        <div className="stat-card stat-card--normal">
          <div className="stat-card__label">Approved</div>
          <div className="stat-card__value">{approvedCount}</div>
        </div>
        <div className="stat-card stat-card--critical">
          <div className="stat-card__label">Rejected</div>
          <div className="stat-card__value">{rejectedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Total</div>
          <div className="stat-card__value">{verifications.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <select className="filter-input" value={filterSector} onChange={e => setFilterSector(e.target.value)}>
          <option value="All">All Sectors</option>
          <option value="A">A – Nashik</option>
          <option value="B">B – Aurangabad</option>
          <option value="C">C – Latur</option>
          <option value="D">D – Pune</option>
          <option value="E">E – Solapur</option>
        </select>
        <select className="filter-input" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option>All</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Normal</option>
        </select>
      </div>

      <div className="split-layout--even split-layout" id="verification-panel">
        {/* Left: Evidence Preview */}
        <div className="card verify-evidence">
          <div className="panel-header">
            <span className="panel-title">Evidence Preview</span>
            <span className="badge badge--primary">{selected.taskId}</span>
          </div>
          <div className="verify-image-area">
            <div className="verify-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span>Field evidence photo</span>
              <span className="verify-image-sub">Uploaded by {selected.operator} · {selected.submitted}</span>
            </div>
          </div>
        </div>

        {/* Right: Task Details + Actions */}
        <div>
          <div className="card verify-details">
            <div className="panel-header">
              <span className="panel-title">Task Details</span>
            </div>
            <div className="verify-detail-grid">
              <div className="verify-detail-row">
                <span className="verify-detail-label">Task</span>
                <span className="verify-detail-value">{selected.name}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Sector</span>
                <span className="verify-detail-value">{selected.sector}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Priority</span>
                <span className={`badge ${selected.priority === 'Critical' ? 'badge--critical' : selected.priority === 'Warning' ? 'badge--warning' : 'badge--normal'}`}>
                  {selected.priority}
                </span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Operator</span>
                <span className="verify-detail-value">{selected.operator}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Submitted</span>
                <span className="verify-detail-value">{selected.submitted}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Status</span>
                <span className={`badge ${
                  selected.status === 'approved' ? 'badge--normal' :
                  selected.status === 'rejected' ? 'badge--critical' : 'badge--warning'
                }`}>
                  {selected.status === 'pending' ? 'Pending Review' :
                   selected.status === 'approved' ? 'Approved' : 'Rejected'}
                </span>
              </div>
            </div>

            {selected.status === 'pending' && (
              <div className="verify-actions">
                <button className="btn btn--success" onClick={handleApprove}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                  Approve
                </button>
                <button className="btn btn--danger" onClick={handleReject}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  Reject
                </button>
              </div>
            )}

            {selected.status === 'approved' && (
              <div className="verify-result verify-result--approved">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                Task approved and marked as completed.
              </div>
            )}

            {selected.status === 'rejected' && (
              <div className="verify-result verify-result--rejected">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                Task rejected — sent back to operator for rework.
              </div>
            )}
          </div>

          {/* Queue */}
          <div className="card" style={{ marginTop: 12 }}>
            <div className="panel-header">
              <span className="panel-title">Pending Queue</span>
              <span className="badge badge--warning">{filtered.filter(v => v.status === 'pending').length}</span>
            </div>
            {filtered.map(v => (
              <div
                key={v.id}
                className={`verify-queue-item ${selected.id === v.id ? 'verify-queue-item--active' : ''}`}
                onClick={() => setSelected(v)}
              >
                <div>
                  <div className="verify-queue-item__name">{v.name}</div>
                  <div className="verify-queue-item__sub">{v.sector} · {v.operator}</div>
                </div>
                <span className={`badge ${
                  v.status === 'pending' ? 'badge--warning' :
                  v.status === 'approved' ? 'badge--normal' : 'badge--critical'
                }`}>
                  {v.status === 'pending' ? 'Pending' : v.status === 'approved' ? 'Approved' : 'Rejected'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
