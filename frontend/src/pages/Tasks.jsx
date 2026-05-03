import { useState } from 'react'
import { getRole } from '../context/AuthContext'
import './Tasks.css'

const OPERATORS = ['R. Kumar', 'S. Patel', 'M. Singh', 'A. Das', 'P. Roy', 'K. Joshi']
const SECTORS = ['A – Nashik', 'B – Aurangabad', 'C – Latur', 'D – Pune', 'E – Solapur',
  'F – Konkan North', 'G – Konkan South', 'H – Nagpur', 'I – Sangli', 'J – Kolhapur',
  'K – Osmanabad', 'L – Nanded']

const initialTasks = [
  {
    id: 'T-001', name: 'Fix Leak – Main Valve', sector: 'C – Latur', priority: 'Critical',
    operator: 'R. Kumar', status: 'In Progress',
    desc: 'Main valve at junction point 3C is leaking. Pressure dropped to 22 PSI. Shut off supply, replace valve seal, restore and test pressure.',
    evidence: null,
  },
  {
    id: 'T-002', name: 'Restore Supply Line', sector: 'G – Konkan South', priority: 'Critical',
    operator: 'S. Patel', status: 'Assigned',
    desc: 'Supply line blocked after pipe burst near coastal road. Clear blockage, inspect pipe integrity, restore flow.',
    evidence: null,
  },
  {
    id: 'T-003', name: 'Inspect Pipeline Joint', sector: 'B – Aurangabad', priority: 'Warning',
    operator: 'M. Singh', status: 'In Progress',
    desc: 'Joint at sector B distribution node showing signs of wear. Inspect, tighten fittings, report condition.',
    evidence: null,
  },
  {
    id: 'T-004', name: 'Adjust Pressure Valve', sector: 'E – Solapur', priority: 'Warning',
    operator: 'A. Das', status: 'Awaiting Verification',
    desc: 'Pressure valve at E-7 needs calibration. Current reading 65 PSI, target 75–80 PSI.',
    evidence: 'proof_T004.jpg',
  },
  {
    id: 'T-005', name: 'Replace Meter Unit', sector: 'A – Nashik', priority: 'Normal',
    operator: 'P. Roy', status: 'Completed',
    desc: 'Old meter unit at A-12 replaced with new digital unit. Calibrated and tested.',
    evidence: 'proof_T005.jpg',
  },
  {
    id: 'T-006', name: 'Clean Filter Station', sector: 'D – Pune', priority: 'Normal',
    operator: 'K. Joshi', status: 'Completed',
    desc: 'Filter station D-2 cleaned. Replaced filter mesh, flushed sediment, restored flow.',
    evidence: 'proof_T006.jpg',
  },
  {
    id: 'T-007', name: 'Emergency Shutoff Test', sector: 'G – Konkan South', priority: 'Critical',
    operator: 'R. Kumar', status: 'Assigned',
    desc: 'Test emergency shutoff valve at G-main. Verify response time < 30 seconds. Document results.',
    evidence: null,
  },
]

function priorityBadge(p) {
  const cls = p === 'Critical' ? 'badge--critical' : p === 'Warning' ? 'badge--warning' : 'badge--normal'
  return <span className={`badge ${cls}`}>{p}</span>
}

function statusColor(s) {
  if (s === 'In Progress') return 'var(--primary)'
  if (s === 'Assigned') return 'var(--warning)'
  if (s === 'Awaiting Verification') return '#8B5CF6'
  if (s === 'Completed') return 'var(--normal)'
  return 'var(--text-secondary)'
}

// ── Admin view ──────────────────────────────────────────────
function AdminTasks({ tasks, setTasks }) {
  const [showNew, setShowNew] = useState(false)
  const [detailTask, setDetailTask] = useState(null)
  const [form, setForm] = useState({ name: '', sector: SECTORS[0], priority: 'Normal', operator: OPERATORS[0], desc: '' })

  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const awaiting = tasks.filter(t => t.status === 'Awaiting Verification').length
  const completed = tasks.filter(t => t.status === 'Completed').length

  const handleCreate = (e) => {
    e.preventDefault()
    const t = { ...form, id: `T-${String(tasks.length + 1).padStart(3, '0')}`, status: 'Assigned', evidence: null }
    setTasks([t, ...tasks])
    setShowNew(false)
    setForm({ name: '', sector: SECTORS[0], priority: 'Normal', operator: OPERATORS[0], desc: '' })
  }

  const handleVerify = (id, action) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: action === 'approve' ? 'Completed' : 'In Progress' } : t))
    setDetailTask(null)
  }

  return (
    <div className="page-content">
      <div className="stats-row">
        <div className="stat-card"><div className="stat-card__label">Total Tasks</div><div className="stat-card__value">{total}</div></div>
        <div className="stat-card"><div className="stat-card__label">In Progress</div><div className="stat-card__value" style={{color:'var(--primary)'}}>{inProgress}</div></div>
        <div className="stat-card"><div className="stat-card__label">Awaiting Verification</div><div className="stat-card__value" style={{color:'#8B5CF6'}}>{awaiting}</div></div>
        <div className="stat-card stat-card--normal"><div className="stat-card__label">Completed</div><div className="stat-card__value">{completed}</div></div>
      </div>

      <div className="card">
        <div className="panel-header">
          <span className="panel-title">All Tasks</span>
          <button className="btn btn--primary btn--sm" onClick={() => setShowNew(!showNew)}>
            {showNew ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showNew && (
          <form className="task-form" onSubmit={handleCreate}>
            <div className="task-form__row">
              <div className="task-form__field">
                <label>Task Name</label>
                <input className="filter-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Fix Leak – Valve 3C" required />
              </div>
              <div className="task-form__field">
                <label>Sector</label>
                <select className="filter-input" value={form.sector} onChange={e => setForm({...form, sector: e.target.value})}>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="task-form__row">
              <div className="task-form__field">
                <label>Priority</label>
                <select className="filter-input" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                  <option>Critical</option><option>Warning</option><option>Normal</option>
                </select>
              </div>
              <div className="task-form__field">
                <label>Assign To</label>
                <select className="filter-input" value={form.operator} onChange={e => setForm({...form, operator: e.target.value})}>
                  {OPERATORS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="task-form__field">
              <label>Description / Instructions</label>
              <textarea className="filter-input task-form__textarea" rows={3} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Describe the problem and steps to resolve..." required />
            </div>
            <div style={{display:'flex',gap:8,marginTop:4}}>
              <button type="submit" className="btn btn--primary">Create & Assign</button>
              <button type="button" className="btn" onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div style={{overflowX:'auto',marginTop: showNew ? 16 : 0}}>
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Task</th><th>Sector</th><th>Priority</th><th>Operator</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td style={{fontWeight:600,color:'var(--text-secondary)',fontSize:12}}>{t.id}</td>
                  <td style={{fontWeight:500}}>{t.name}</td>
                  <td style={{fontSize:12}}>{t.sector}</td>
                  <td>{priorityBadge(t.priority)}</td>
                  <td>{t.operator}</td>
                  <td><span style={{fontWeight:600,color:statusColor(t.status)}}>{t.status}</span></td>
                  <td>
                    <button className="btn btn--sm" onClick={() => setDetailTask(t)}>
                      {t.status === 'Awaiting Verification' ? 'Verify' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task detail / verify modal */}
      {detailTask && (
        <div className="task-modal-backdrop" onClick={() => setDetailTask(null)}>
          <div className="task-modal" onClick={e => e.stopPropagation()}>
            <div className="task-modal__header">
              <div>
                <div className="task-modal__id">{detailTask.id}</div>
                <div className="task-modal__name">{detailTask.name}</div>
              </div>
              <button className="btn btn--sm" onClick={() => setDetailTask(null)}>✕</button>
            </div>
            <div className="task-modal__meta">
              {priorityBadge(detailTask.priority)}
              <span style={{fontSize:12,color:'var(--text-secondary)'}}>{detailTask.sector}</span>
              <span style={{fontSize:12,color:'var(--text-secondary)'}}>→ {detailTask.operator}</span>
            </div>
            <div className="task-modal__desc">{detailTask.desc}</div>
            {detailTask.evidence && (
              <div className="task-modal__evidence">
                <div className="task-modal__evidence-label">Evidence submitted</div>
                <div className="task-modal__evidence-file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  {detailTask.evidence}
                </div>
              </div>
            )}
            {detailTask.status === 'Awaiting Verification' && (
              <div className="task-modal__actions">
                <button className="btn btn--success" onClick={() => handleVerify(detailTask.id, 'approve')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                  Approve & Complete
                </button>
                <button className="btn btn--danger" onClick={() => handleVerify(detailTask.id, 'reject')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  Reject – Send Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Operator view ────────────────────────────────────────────
function OperatorTasks({ tasks, setTasks }) {
  const currentOperator = 'R. Kumar' // in real app from session
  const myTasks = tasks.filter(t => t.operator === currentOperator && t.status !== 'Completed')
  const [detailTask, setDetailTask] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleStart = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'In Progress' } : t))
    setDetailTask(prev => prev?.id === id ? { ...prev, status: 'In Progress' } : prev)
  }

  const handleUpload = (id) => {
    setUploading(true)
    setTimeout(() => {
      const filename = `proof_${id}_${Date.now()}.jpg`
      setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Awaiting Verification', evidence: filename } : t))
      setDetailTask(prev => prev?.id === id ? { ...prev, status: 'Awaiting Verification', evidence: filename } : prev)
      setUploading(false)
    }, 1200)
  }

  const inProgress = myTasks.filter(t => t.status === 'In Progress').length
  const assigned = myTasks.filter(t => t.status === 'Assigned').length
  const awaiting = myTasks.filter(t => t.status === 'Awaiting Verification').length

  return (
    <div className="page-content">
      <div className="stats-row">
        <div className="stat-card"><div className="stat-card__label">My Tasks</div><div className="stat-card__value">{myTasks.length}</div></div>
        <div className="stat-card"><div className="stat-card__label">Assigned</div><div className="stat-card__value" style={{color:'var(--warning)'}}>{assigned}</div></div>
        <div className="stat-card"><div className="stat-card__label">In Progress</div><div className="stat-card__value" style={{color:'var(--primary)'}}>{inProgress}</div></div>
        <div className="stat-card"><div className="stat-card__label">Awaiting Verify</div><div className="stat-card__value" style={{color:'#8B5CF6'}}>{awaiting}</div></div>
      </div>

      <div className="card">
        <div className="panel-header">
          <span className="panel-title">My Assigned Tasks</span>
        </div>
        {myTasks.length === 0 && (
          <div style={{fontSize:13,color:'var(--text-secondary)',padding:'16px 0'}}>No active tasks assigned to you.</div>
        )}
        <div className="op-task-list">
          {myTasks.map(t => (
            <div key={t.id} className={`op-task-card op-task-card--${t.priority.toLowerCase()}`}>
              <div className="op-task-card__top">
                <span style={{fontSize:12,fontWeight:700,color:'var(--text-secondary)'}}>{t.id}</span>
                {priorityBadge(t.priority)}
                <span style={{fontSize:12,fontWeight:600,color:statusColor(t.status),marginLeft:'auto'}}>{t.status}</span>
              </div>
              <div className="op-task-card__name">{t.name}</div>
              <div className="op-task-card__sector">{t.sector}</div>
              <div className="op-task-card__actions">
                <button className="btn btn--sm" onClick={() => setDetailTask(t)}>View Details</button>
                {t.status === 'Assigned' && (
                  <button className="btn btn--primary btn--sm" onClick={() => handleStart(t.id)}>
                    Start Task
                  </button>
                )}
                {t.status === 'In Progress' && (
                  <button className="btn btn--sm" style={{background:'#8B5CF6',color:'#fff',border:'none'}} onClick={() => handleUpload(t.id)} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Proof'}
                  </button>
                )}
                {t.status === 'Awaiting Verification' && (
                  <span style={{fontSize:12,color:'#8B5CF6',fontWeight:500}}>Submitted — awaiting admin review</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task detail modal */}
      {detailTask && (
        <div className="task-modal-backdrop" onClick={() => setDetailTask(null)}>
          <div className="task-modal" onClick={e => e.stopPropagation()}>
            <div className="task-modal__header">
              <div>
                <div className="task-modal__id">{detailTask.id}</div>
                <div className="task-modal__name">{detailTask.name}</div>
              </div>
              <button className="btn btn--sm" onClick={() => setDetailTask(null)}>✕</button>
            </div>
            <div className="task-modal__meta">
              {priorityBadge(detailTask.priority)}
              <span style={{fontSize:12,color:'var(--text-secondary)'}}>{detailTask.sector}</span>
            </div>
            <div className="task-modal__section-label">Problem Description</div>
            <div className="task-modal__desc">{detailTask.desc}</div>
            <div className="task-modal__section-label" style={{marginTop:12}}>Current Status</div>
            <div style={{fontWeight:600,color:statusColor(detailTask.status),fontSize:14}}>{detailTask.status}</div>
            <div className="task-modal__actions">
              {detailTask.status === 'Assigned' && (
                <button className="btn btn--primary" onClick={() => handleStart(detailTask.id)}>
                  Start Task — Notify Admin
                </button>
              )}
              {detailTask.status === 'In Progress' && (
                <button className="btn btn--sm" style={{background:'#8B5CF6',color:'#fff',border:'none',padding:'10px 20px',fontSize:13}} onClick={() => handleUpload(detailTask.id)} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Proof of Completion'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Root export ──────────────────────────────────────────────
export default function Tasks() {
  const role = getRole()
  const [tasks, setTasks] = useState(initialTasks)
  return role === 'operator'
    ? <OperatorTasks tasks={tasks} setTasks={setTasks} />
    : <AdminTasks tasks={tasks} setTasks={setTasks} />
}
