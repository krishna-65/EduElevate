
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/dashboard/Sidebar"
import Navbar from "../components/common/Nav"
import Loader from "../components/common/Loader"



function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loader/>
      </div>
    )
  }

  return (

 
<div className="pt-[3.5rem]">
  {/* Navbar height is 3.5rem, so add equivalent padding to content */}
  <Navbar />
  <div className="relative flex"> 
    <Sidebar />
    <div className="flex-1 overflow-auto">
      <div className="mx-auto    py-10">
        <Outlet />
      </div>
    </div>
  </div>
</div>

  
  )
}

export default Dashboard
