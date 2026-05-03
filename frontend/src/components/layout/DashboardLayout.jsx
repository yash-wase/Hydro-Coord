import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function DashboardLayout() {
  const [pressureData, setPressureData] = useState({})

  useEffect(() => {
    const fetch = () => {
      axios
        .get(`${API_URL}/api/pressure`)
        .then(res => {
          console.log('GLOBAL DATA:', res.data)
          setPressureData(res.data)
        })
        .catch(err => console.error('DashboardLayout fetch error:', err))
    }
    fetch()
    const interval = setInterval(fetch, 30000)
    return () => clearInterval(interval)
  }, [])

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
