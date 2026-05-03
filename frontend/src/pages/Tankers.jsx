import { useState } from 'react'
import { getRole } from '../context/AuthContext'
import './Tankers.css'

const STATES = ['Maharashtra']
const SECTORS = [
  'All Sectors',
  'A – Nashik', 'B – Aurangabad', 'C – Latur', 'D – Pune',
  'E – Solapur', 'F – Konkan North', 'G – Konkan South', 'H – Nagpur',
  'I – Sangli', 'J – Kolhapur', 'K – Osmanabad', 'L – Nanded',
]

const allDrivers = [
  { id: 'TK-01', name: 'Mahesh Jadhav',   phone: '9823001122', sector: 'A – Nashik',        capacity: '10,000 L', status: 'Available',   vehicle: 'MH-15-AB-1234' },
  { id: 'TK-02', name: 'Suresh Patil',    phone: '9812334455', sector: 'A – Nashik',        capacity: '8,000 L',  status: 'On Route',    vehicle: 'MH-15-CD-5678' },
  { id: 'TK-03', name: 'Raju Shinde',     phone: '9900112233', sector: 'B – Aurangabad',    capacity: '12,000 L', status: 'Available',   vehicle: 'MH-20-EF-9012' },
  { id: 'TK-04', name: 'Vijay More',      phone: '9765443322', sector: 'B – Aurangabad',    capacity: '10,000 L', status: 'Dispatched',  vehicle: 'MH-20-GH-3456' },
  { id: 'TK-05', name: 'Anil Deshmukh',   phone: '9876501234', sector: 'C – Latur',         capacity: '8,000 L',  status: 'Available',   vehicle: 'MH-24-IJ-7890' },
  { id: 'TK-06', name: 'Prakash Kulkarni',phone: '9823456789', sector: 'C – Latur',         capacity: '15,000 L', status: 'On Route',    vehicle: 'MH-24-KL-1234' },
  { id: 'TK-07', name: 'Santosh Gaikwad', phone: '9812009988', sector: 'D – Pune',          capacity: '10,000 L', status: 'Available',   vehicle: 'MH-12-MN-5678' },
  { id: 'TK-08', name: 'Deepak Pawar',    phone: '9900887766', sector: 'D – Pune',          capacity: '12,000 L', status: 'Available',   vehicle: 'MH-12-OP-9012' },
  { id: 'TK-09', name: 'Ramesh Salve',    phone: '9765112233', sector: 'E – Solapur',       capacity: '8,000 L',  status: 'Dispatched',  vehicle: 'MH-13-QR-3456' },
  { id: 'TK-10', name: 'Ganesh Bhosale',  phone: '9876123456', sector: 'E – Solapur',       capacity: '10,000 L', status: 'Available',   vehicle: 'MH-13-ST-7890' },
  { id: 'TK-11', name: 'Nitin Kamble',    phone: '9823567890', sector: 'F – Konkan North',  capacity: '8,000 L',  status: 'Available',   vehicle: 'MH-04-UV-1234' },
  { id: 'TK-12', name: 'Sanjay Naik',     phone: '9812445566', sector: 'F – Konkan North',  capacity: '10,000 L', status: 'On Route',    vehicle: 'MH-04-WX-5678' },
  { id: 'TK-13', name: 'Pradeep Sawant',  phone: '9900334455', sector: 'G – Konkan South',  capacity: '12,000 L', status: 'Available',   vehicle: 'MH-03-YZ-9012' },
  { id: 'TK-14', name: 'Kiran Mestry',    phone: '9765223344', sector: 'G – Konkan South',  capacity: '8,000 L',  status: 'Dispatched',  vehicle: 'MH-03-AA-3456' },
  { id: 'TK-15', name: 'Ashok Wankhede',  phone: '9876234567', sector: 'H – Nagpur',        capacity: '15,000 L', status: 'Available',   vehicle: 'MH-31-BB-7890' },
  { id: 'TK-16', name: 'Dinesh Thakre',   phone: '9823678901', sector: 'H – Nagpur',        capacity: '10,000 L', status: 'On Route',    vehicle: 'MH-31-CC-1234' },
  { id: 'TK-17', name: 'Sunil Mane',      phone: '9812556677', sector: 'I – Sangli',        capacity: '8,000 L',  status: 'Available',   vehicle: 'MH-42-DD-5678' },
  { id: 'TK-18', name: 'Rajendra Patil',  phone: '9900556677', sector: 'I – Sangli',        capacity: '10,000 L', status: 'Available',   vehicle: 'MH-42-EE-9012' },
  { id: 'TK-19', name: 'Hemant Chavan',   phone: '9765334455', sector: 'J – Kolhapur',      capacity: '12,000 L', status: 'Dispatched',  vehicle: 'MH-09-FF-3456' },
  { id: 'TK-20', name: 'Vishal Jadhav',   phone: '9876345678', sector: 'J – Kolhapur',      capacity: '8,000 L',  status: 'Available',   vehicle: 'MH-09-GG-7890' },
  { id: 'TK-21', name: 'Manoj Shinde',    phone: '9823789012', sector: 'K – Osmanabad',     capacity: '10,000 L', status: 'Available',   vehicle: 'MH-28-HH-1234' },
  { id: 'TK-22', name: 'Pravin Kale',     phone: '9812667788', sector: 'K – Osmanabad',     capacity: '8,000 L',  status: 'On Route',    vehicle: 'MH-28-II-5678' },
  { id: 'TK-23', name: 'Sachin Dhole',    phone: '9900667788', sector: 'L – Nanded',        capacity: '12,000 L', status: 'Available',   vehicle: 'MH-16-JJ-9012' },
  { id: 'TK-24', name: 'Amol Rathod',     phone: '9765445566', sector: 'L – Nanded',        capacity: '10,000 L', status: 'Dispatched',  vehicle: 'MH-16-KK-3456' },
]

function statusClass(s) {
  if (s === 'Available')  return 'tanker-status--available'
  if (s === 'On Route')   return 'tanker-status--route'
  if (s === 'Dispatched') return 'tanker-status--dispatched'
  return ''
}

export default function Tankers() {
  const role = getRole()
  const [selectedState, setSelectedState] = useState('Maharashtra')
  const [selectedSector, setSelectedSector] = useState('All Sectors')
  const [alertModal, setAlertModal] = useState(null)
  const [alertMsg, setAlertMsg] = useState('')
  const [sentAlerts, setSentAlerts] = useState([])

  const filtered = allDrivers.filter(d =>
    selectedSector === 'All Sectors' || d.sector === selectedSector
  )

  const available = filtered.filter(d => d.status === 'Available').length
  const onRoute   = filtered.filter(d => d.status === 'On Route').length
  const dispatched = filtered.filter(d => d.status === 'Dispatched').length

  const handleSendAlert = () => {
    setSentAlerts([...sentAlerts, { driver: alertModal.name, sector: alertModal.sector, msg: alertMsg, time: 'Just now' }])
    setAlertModal(null)
    setAlertMsg('')
  }

  return (
    <div className="page-content">
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card stat-card--normal">
          <div className="stat-card__label">Available</div>
          <div className="stat-card__value">{available}</div>
          <div className="stat-card__sub">Ready to dispatch</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">On Route</div>
          <div className="stat-card__value" style={{color:'var(--primary)'}}>{onRoute}</div>
        </div>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__label">Dispatched</div>
          <div className="stat-card__value">{dispatched}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Total Drivers</div>
          <div className="stat-card__value">{filtered.length}</div>
          <div className="stat-card__sub">{selectedSector}</div>
        </div>
      </div>

      <div className="card">
        <div className="panel-header">
          <span className="panel-title">Tanker Driver Directory</span>
          {role === 'admin' && sentAlerts.length > 0 && (
            <span className="badge badge--primary">{sentAlerts.length} alert{sentAlerts.length > 1 ? 's' : ''} sent</span>
          )}
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <select className="filter-input" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="filter-input" value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
            {SECTORS.map(s => <option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:12,color:'var(--text-secondary)',marginLeft:'auto'}}>
            {filtered.length} driver{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Driver Name</th>
                <th>Phone</th>
                <th>Sector</th>
                <th>Vehicle No.</th>
                <th>Capacity</th>
                <th>Status</th>
                {role === 'admin' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td style={{fontWeight:600,fontSize:12,color:'var(--text-secondary)'}}>{d.id}</td>
                  <td style={{fontWeight:600}}>{d.name}</td>
                  <td>
                    <a href={`tel:${d.phone}`} style={{color:'var(--primary)',fontWeight:500,fontSize:13}}>
                      {d.phone}
                    </a>
                  </td>
                  <td style={{fontSize:12}}>{d.sector}</td>
                  <td style={{fontSize:12,fontFamily:'monospace'}}>{d.vehicle}</td>
                  <td style={{fontSize:12}}>{d.capacity}</td>
                  <td>
                    <span className={`tanker-status ${statusClass(d.status)}`}>{d.status}</span>
                  </td>
                  {role === 'admin' && (
                    <td>
                      <button
                        className="btn btn--sm"
                        style={{background: d.status === 'Available' ? 'var(--primary)' : undefined, color: d.status === 'Available' ? '#fff' : undefined, borderColor: d.status === 'Available' ? 'var(--primary)' : undefined}}
                        onClick={() => { setAlertModal(d); setAlertMsg(`Pre-alert: Low pressure detected in ${d.sector}. Please prepare tanker for possible dispatch.`) }}
                      >
                        Send Pre-Alert
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" style={{textAlign:'center',color:'var(--text-secondary)',padding:24}}>No drivers found for selected sector</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sent alerts log — admin only */}
      {role === 'admin' && sentAlerts.length > 0 && (
        <div className="card" style={{marginTop:16}}>
          <div className="panel-header">
            <span className="panel-title">Sent Pre-Alerts</span>
            <span className="badge badge--warning">{sentAlerts.length}</span>
          </div>
          {sentAlerts.map((a, i) => (
            <div key={i} className="alert-item">
              <span className="alert-dot alert-dot--warning" />
              <div>
                <div className="alert-item__text">{a.driver} — {a.sector}</div>
                <div className="alert-item__sub">{a.msg} · {a.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pre-alert modal */}
      {alertModal && (
        <div className="task-modal-backdrop" onClick={() => setAlertModal(null)}>
          <div className="task-modal" onClick={e => e.stopPropagation()}>
            <div className="task-modal__header">
              <div>
                <div className="task-modal__id">Pre-Alert</div>
                <div className="task-modal__name">{alertModal.name}</div>
              </div>
              <button className="btn btn--sm" onClick={() => setAlertModal(null)}>✕</button>
            </div>
            <div style={{fontSize:12,color:'var(--text-secondary)',marginBottom:14}}>
              {alertModal.sector} · {alertModal.phone} · {alertModal.vehicle}
            </div>
            <div className="task-form__field" style={{marginBottom:16}}>
              <label>Alert Message</label>
              <textarea
                className="filter-input task-form__textarea"
                rows={4}
                value={alertMsg}
                onChange={e => setAlertMsg(e.target.value)}
              />
            </div>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn--primary" onClick={handleSendAlert}>Send Alert</button>
              <button className="btn" onClick={() => setAlertModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
