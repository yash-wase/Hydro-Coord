import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Topbar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  )
}
