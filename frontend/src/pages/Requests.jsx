import { useState } from 'react'
import { getRole } from '../context/AuthContext'
import './Requests.css'

const SECTORS = ['A – Nashik','B – Aurangabad','C – Latur','D – Pune','E – Solapur',
  'F – Konkan North','G – Konkan South','H – Nagpur','I – Sangli','J – Kolhapur',
  'K – Osmanabad','L – Nanded']

const initialRequests = [
  { id: 'REQ-001', type: 'Emergency', sector: 'C – Latur', name: 'Ramesh Patil', contact: '9876543210', desc: 'No water supply for 3 days. Taps completely dry.', status: 'Pending', submitted: '10 min ago', assignedTo: null },
  { id: 'REQ-002', type: 'Emergency', sector: 'G – Konkan South', name: 'Sunita More', contact: '9823456781', desc: 'Pipe burst near main road, water flooding street.', status: 'Assigned', submitted: '25 min ago', assignedTo: 'R. Kumar' },
  { id: 'REQ-003', type: 'Suggestion', sector: 'D – Pune', name: 'Anil Deshmukh', contact: '9765432109', desc: 'Water pressure is low every morning between 6–8 AM.', status: 'Under Review', submitted: '1 hr ago', assignedTo: null },
  { id: 'REQ-004', type: 'Suggestion', sector: 'B – Aurangabad', name: 'Priya Kulkarni', contact: '9812345670', desc: 'Suggest installing a pressure gauge at the junction near market.', status: 'Pending', submitted: '2 hr ago', assignedTo: null },
  { id: 'REQ-005', type: 'Emergency', sector: 'E – Solapur', name: 'Vijay Shinde', contact: '9900112233', desc: 'Contaminated water coming from taps. Smells bad.', status: 'Resolved', submitted: '5 hr ago', assignedTo: 'S. Patel' },
]

const operators = ['R. Kumar', 'S. Patel', 'M. Singh', 'A. Das', 'P. Roy']

function statusClass(s) {
  if (s === 'Pending') return 'req-status--pending'
  if (s === 'Assigned') return 'req-status--assigned'
  if (s === 'Under Review') return 'req-status--review'
  if (s === 'Resolved') return 'req-status--resolved'
  return ''
}

export default function Requests() {
  const role = getRole()
  const [requests, setRequests] = useState(initialRequests)
  const [showForm, setShowForm] = useState(false)
  const [assignModal, setAssignModal] = useState(null) // { reqId }
  const [selectedOp, setSelectedOp] = useState(operators[0])
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [form, setForm] = useState({ type: 'Emergency', sector: SECTORS[0], name: '', contact: '', desc: '' })
  const [submitted, setSubmitted] = useState(false)

  const filtered = requests.filter(r => {
    if (filterType !== 'All' && r.type !== filterType) return false
    if (filterStatus !== 'All' && r.status !== filterStatus) return false
    return true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReq = {
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      ...form,
      status: 'Pending',
      submitted: 'Just now',
      assignedTo: null,
    }
    setRequests([newReq, ...requests])
    setShowForm(false)
    setSubmitted(true)
    setForm({ type: 'Emergency', sector: SECTORS[0], name: '', contact: '', desc: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleAssign = (reqId) => {
    setRequests(requests.map(r =>
      r.id === reqId ? { ...r, status: 'Assigned', assignedTo: selectedOp } : r
    ))
    setAssignModal(null)
  }

  const emergencyCount = requests.filter(r => r.type === 'Emergency' && r.status === 'Pending').length
  const pendingCount = requests.filter(r => r.status === 'Pending').length
  const resolvedCount = requests.filter(r => r.status === 'Resolved').length

  return (
    <div className="page-content">
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card stat-card--critical">
          <div className="stat-card__label">Emergency Pending</div>
          <div className="stat-card__value">{emergencyCount}</div>
          <div className="stat-card__sub">Needs immediate action</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Total Pending</div>
          <div className="stat-card__value">{pendingCount}</div>
          <div className="stat-card__sub">Awaiting assignment</div>
        </div>
        <div className="stat-card stat-card--normal">
          <div className="stat-card__label">Resolved</div>
          <div className="stat-card__value">{resolvedCount}</div>
          <div className="stat-card__sub">Closed requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Total Requests</div>
          <div className="stat-card__value">{requests.length}</div>
        </div>
      </div>

      {/* Public: submit form */}
      {role === 'public' && (
        <div className="card req-public-section">
          <div className="panel-header">
            <span className="panel-title">Submit a Request</span>
            <button className="btn btn--primary btn--sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ New Request'}
            </button>
          </div>

          {submitted && (
            <div className="req-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              Request submitted successfully. Our team will review it shortly.
            </div>
          )}

          {showForm && (
            <form className="req-form" onSubmit={handleSubmit}>
              <div className="req-form__row">
                <div className="req-form__field">
                  <label>Request Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="filter-input" required>
                    <option value="Emergency">Emergency – Urgent action needed</option>
                    <option value="Suggestion">Suggestion – General feedback</option>
                  </select>
                </div>
                <div className="req-form__field">
                  <label>Sector / Area</label>
                  <select value={form.sector} onChange={e => setForm({...form, sector: e.target.value})} className="filter-input" required>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="req-form__row">
                <div className="req-form__field">
                  <label>Your Name</label>
                  <input className="filter-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="req-form__field">
                  <label>Contact Number</label>
                  <input className="filter-input" placeholder="10-digit mobile" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required />
                </div>
              </div>
              <div className="req-form__field">
                <label>Description</label>
                <textarea className="filter-input req-form__textarea" placeholder="Describe the issue in detail..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required rows={3} />
              </div>
              {form.type === 'Emergency' && (
                <div className="req-form__notice">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Emergency requests are flagged immediately to the admin team.
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" className="btn btn--primary">Submit Request</button>
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}

          {/* Public: view own submitted requests */}
          <div style={{ marginTop: 20 }}>
            <div className="panel-title" style={{ marginBottom: 12 }}>Your Submitted Requests</div>
            {requests.filter(r => r.status !== undefined).length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>No requests submitted yet.</p>
            ) : (
              <div className="req-list">
                {requests.map(r => (
                  <div key={r.id} className={`req-card req-card--${r.type.toLowerCase()}`}>
                    <div className="req-card__top">
                      <span className={`badge ${r.type === 'Emergency' ? 'badge--critical' : 'badge--warning'}`}>{r.type}</span>
                      <span className={`req-status ${statusClass(r.status)}`}>{r.status}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 'auto' }}>{r.submitted}</span>
                    </div>
                    <div className="req-card__sector">Sector {r.sector}</div>
                    <div className="req-card__desc">{r.desc}</div>
                    {r.assignedTo && <div className="req-card__assigned">Assigned to: {r.assignedTo}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin: view all requests */}
      {role === 'admin' && (
        <div className="card">
          <div className="panel-header">
            <span className="panel-title">All Public Requests</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <select className="filter-input" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option>All</option>
                <option>Emergency</option>
                <option>Suggestion</option>
              </select>
              <select className="filter-input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option>All</option>
                <option>Pending</option>
                <option>Assigned</option>
                <option>Under Review</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Sector</th>
                  <th>Submitted By</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-secondary)' }}>{r.id}</td>
                    <td>
                      <span className={`badge ${r.type === 'Emergency' ? 'badge--critical' : 'badge--warning'}`}>{r.type}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{r.sector}</td>
                    <td>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{r.contact}</div>
                    </td>
                    <td style={{ maxWidth: 240, fontSize: 12, color: 'var(--text-secondary)' }}>{r.desc}</td>
                    <td><span className={`req-status ${statusClass(r.status)}`}>{r.status}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.submitted}</td>
                    <td>
                      {r.status === 'Pending' || r.status === 'Under Review' ? (
                        <button className="btn btn--primary btn--sm" onClick={() => { setAssignModal(r.id); setSelectedOp(operators[0]) }}>
                          Assign Task
                        </button>
                      ) : r.assignedTo ? (
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.assignedTo}</span>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--normal)' }}>Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 24 }}>No requests match filters</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign modal */}
      {assignModal && (
        <div className="req-modal-backdrop" onClick={() => setAssignModal(null)}>
          <div className="req-modal" onClick={e => e.stopPropagation()}>
            <div className="req-modal__title">Assign Task to Operator</div>
            <p className="req-modal__sub">Request {assignModal} will be converted to a task and assigned.</p>
            <div className="req-form__field" style={{ marginBottom: 16 }}>
              <label>Select Operator</label>
              <select className="filter-input" value={selectedOp} onChange={e => setSelectedOp(e.target.value)}>
                {operators.map(op => <option key={op}>{op}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn--primary" onClick={() => handleAssign(assignModal)}>Confirm Assignment</button>
              <button className="btn" onClick={() => setAssignModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
