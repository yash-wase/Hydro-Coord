import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const PRESSURE_URL = 'https://adaptable-mercy-production.up.railway.app/pressure'

// Map old API keys → new GeoJSON sector IDs + state
const OLD_KEY_MAP = {
  A: { id: 'MH_Nashik',      name: 'Nashik',       state: 'MH' },
  B: { id: 'MH_Aurangabad',  name: 'Aurangabad',   state: 'MH' },
  C: { id: 'MH_Latur',       name: 'Latur',        state: 'MH' },
  D: { id: 'MH_Pune',        name: 'Pune',         state: 'MH' },
  E: { id: 'MH_Solapur',     name: 'Solapur',      state: 'MH' },
  F: { id: 'MH_KonkanNorth', name: 'Konkan North', state: 'MH' },
  G: { id: 'MH_KonkanSouth', name: 'Konkan South', state: 'MH' },
  H: { id: 'MH_Nagpur',      name: 'Nagpur',       state: 'MH' },
  I: { id: 'MH_Sangli',      name: 'Sangli',       state: 'MH' },
  J: { id: 'MH_Kolhapur',    name: 'Kolhapur',     state: 'MH' },
  K: { id: 'MH_Osmanabad',   name: 'Osmanabad',    state: 'MH' },
  L: { id: 'MH_Nanded',      name: 'Nanded',       state: 'MH' },
}

// Local pressure model — mirrors python model1 + model2
function computePressure(base, distance, demand) {
  const p = base - distance * 2 - demand * 5
  return Math.max(0, Math.min(100, p))
}
function adjustPressure(pressure, complaints) {
  let alert = null
  if (pressure < 30 && complaints > 2) { pressure -= 20; alert = 'PIPE_BURST' }
  return { pressure: Math.max(0, Math.round(pressure * 10) / 10), alert }
}

// Sectors for states not yet on the live API — computed locally
const LOCAL_SECTORS = [
  // Rajasthan
  { id: 'RJ_Bikaner',   name: 'Bikaner',   state: 'RJ', base: 100, distance: 4,  demand: 3, complaints: 0 },
  { id: 'RJ_Jodhpur',   name: 'Jodhpur',   state: 'RJ', base: 100, distance: 6,  demand: 5, complaints: 1 },
  { id: 'RJ_Jaipur',    name: 'Jaipur',    state: 'RJ', base: 100, distance: 3,  demand: 4, complaints: 0 },
  { id: 'RJ_Alwar',     name: 'Alwar',     state: 'RJ', base: 100, distance: 5,  demand: 4, complaints: 1 },
  { id: 'RJ_Bharatpur', name: 'Bharatpur', state: 'RJ', base: 100, distance: 7,  demand: 5, complaints: 1 },
  { id: 'RJ_Ajmer',     name: 'Ajmer',     state: 'RJ', base: 100, distance: 8,  demand: 6, complaints: 2 },
  { id: 'RJ_Udaipur',   name: 'Udaipur',   state: 'RJ', base: 100, distance: 10, demand: 7, complaints: 2 },
  { id: 'RJ_Kota',      name: 'Kota',      state: 'RJ', base: 100, distance: 9,  demand: 6, complaints: 2 },
  // Tamil Nadu
  { id: 'TN_Vellore',         name: 'Vellore',         state: 'TN', base: 100, distance: 5,  demand: 4, complaints: 0 },
  { id: 'TN_Chennai',         name: 'Chennai',         state: 'TN', base: 100, distance: 2,  demand: 6, complaints: 1 },
  { id: 'TN_Coimbatore',      name: 'Coimbatore',      state: 'TN', base: 100, distance: 8,  demand: 7, complaints: 2 },
  { id: 'TN_Salem',           name: 'Salem',           state: 'TN', base: 100, distance: 6,  demand: 5, complaints: 1 },
  { id: 'TN_Tiruchirappalli', name: 'Tiruchirappalli', state: 'TN', base: 100, distance: 9,  demand: 6, complaints: 2 },
  { id: 'TN_Madurai',         name: 'Madurai',         state: 'TN', base: 100, distance: 11, demand: 7, complaints: 3 },
  { id: 'TN_Thoothukudi',     name: 'Thoothukudi',     state: 'TN', base: 100, distance: 13, demand: 8, complaints: 3 },
  { id: 'TN_Tirunelveli',     name: 'Tirunelveli',     state: 'TN', base: 100, distance: 12, demand: 7, complaints: 2 },
  // Karnataka
  { id: 'KA_Belagavi',   name: 'Belagavi',   state: 'KA', base: 100, distance: 5,  demand: 4, complaints: 0 },
  { id: 'KA_Hubballi',   name: 'Hubballi',   state: 'KA', base: 100, distance: 7,  demand: 5, complaints: 1 },
  { id: 'KA_Kalaburagi', name: 'Kalaburagi', state: 'KA', base: 100, distance: 9,  demand: 6, complaints: 2 },
  { id: 'KA_Mangaluru',  name: 'Mangaluru',  state: 'KA', base: 100, distance: 4,  demand: 4, complaints: 0 },
  { id: 'KA_Shivamogga', name: 'Shivamogga', state: 'KA', base: 100, distance: 8,  demand: 5, complaints: 1 },
  { id: 'KA_Bengaluru',  name: 'Bengaluru',  state: 'KA', base: 100, distance: 3,  demand: 7, complaints: 1 },
  { id: 'KA_Mysuru',     name: 'Mysuru',     state: 'KA', base: 100, distance: 6,  demand: 5, complaints: 1 },
  { id: 'KA_Ballari',    name: 'Ballari',    state: 'KA', base: 100, distance: 10, demand: 6, complaints: 2 },
  // Uttar Pradesh
  { id: 'UP_Saharanpur', name: 'Saharanpur', state: 'UP', base: 100, distance: 6,  demand: 5, complaints: 1 },
  { id: 'UP_Meerut',     name: 'Meerut',     state: 'UP', base: 100, distance: 4,  demand: 6, complaints: 1 },
  { id: 'UP_Agra',       name: 'Agra',       state: 'UP', base: 100, distance: 5,  demand: 5, complaints: 1 },
  { id: 'UP_Lucknow',    name: 'Lucknow',    state: 'UP', base: 100, distance: 3,  demand: 6, complaints: 0 },
  { id: 'UP_Kanpur',     name: 'Kanpur',     state: 'UP', base: 100, distance: 7,  demand: 7, complaints: 2 },
  { id: 'UP_Prayagraj',  name: 'Prayagraj',  state: 'UP', base: 100, distance: 9,  demand: 6, complaints: 2 },
  { id: 'UP_Varanasi',   name: 'Varanasi',   state: 'UP', base: 100, distance: 11, demand: 7, complaints: 3 },
  { id: 'UP_Gorakhpur',  name: 'Gorakhpur',  state: 'UP', base: 100, distance: 8,  demand: 5, complaints: 1 },
]

// Build local pressure entries for non-MH states
function buildLocalPressure() {
  const result = {}
  LOCAL_SECTORS.forEach(s => {
    const raw = computePressure(s.base, s.distance, s.demand)
    const { pressure, alert } = adjustPressure(raw, s.complaints)
    result[s.id] = { pressure, alert, name: s.name, state: s.state }
  })
  return result
}

// Transform API response: remap old keys → new GeoJSON IDs, add state field
function transformApiData(raw) {
  const result = {}
  Object.entries(raw).forEach(([oldKey, val]) => {
    const mapping = OLD_KEY_MAP[oldKey]
    if (mapping) {
      result[mapping.id] = {
        pressure: val.pressure,
        alert: val.alert,
        name: mapping.name,
        state: mapping.state,
      }
    } else if (val.state) {
      // Already new format (future-proof once Railway is updated)
      result[oldKey] = val
    }
  })
  return result
}

export default function DashboardLayout() {
  const [pressureData, setPressureData] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState('MH')

  useEffect(() => {
    const localData = buildLocalPressure()

    const fetchData = async () => {
      try {
        const res = await fetch(PRESSURE_URL)
        const raw = await res.json()
        const mhData = transformApiData(raw)
        // Merge: live MH data + locally computed other states
        setPressureData({ ...localData, ...mhData })
        setLoading(false)
      } catch (err) {
        console.error('FETCH ERROR:', err)
        // On error, still show locally computed data
        setPressureData(localData)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div style={{ padding: 40, fontSize: 16 }}>Loading...</div>

  return (
    <div className="dashboard-layout">
      <Sidebar pressureData={pressureData} selectedState={selectedState} />
      <Topbar pressureData={pressureData} selectedState={selectedState} setSelectedState={setSelectedState} />
      <main className="dashboard-main">
        <Outlet context={{ pressureData, selectedState, setSelectedState }} />
      </main>
    </div>
  )
}
