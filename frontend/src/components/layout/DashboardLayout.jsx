import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const PRESSURE_URL = 'https://adaptable-mercy-production.up.railway.app/pressure'

export default function DashboardLayout() {
  const [pressureData, setPressureData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('FETCH START')
        const res = await fetch(PRESSURE_URL)
        console.log('STATUS:', res.status)
        const data = await res.json()
        console.log('DATA RECEIVED:', data)
        setPressureData(data)
        setLoading(false)
      } catch (err) {
        console.error('FETCH ERROR:', err)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  console.log('PRESSURE STATE:', pressureData)

  if (loading) return <div style={{ padding: 40, fontSize: 16 }}>Loading...</div>

  if (!pressureData || Object.keys(pressureData).length === 0) {
    return <div style={{ padding: 40, fontSize: 16 }}>No Data Loaded</div>
  }

  return (
    <div className="dashboard-layout">
      <Sidebar pressureData={pressureData} />
      <Topbar pressureData={pressureData} />
      <main className="dashboard-main">
        <Outlet context={{ pressureData }} />
      </main>
    </div>
  )
}
