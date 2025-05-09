import './App.css'
import Home from './Pages/CommonPages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import ClientDashboard from './Pages/ClientPages/Dashboard/ClientDashboard'
import ClientPowerPlan from './Pages/ClientPages/PowerPlan/ClientPowerPlan'
import ClientProfile from './Pages/ClientPages/ClientProfile/ClientProfile'
// import ProtectedRoute from './Components/CommonComponents/ProtectedRoutes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path='/client-dashboard' element={<ClientDashboard />} />
        <Route path='/client-power-plan' element={<ClientPowerPlan />} />
        <Route path='/client-profile' element={<ClientProfile />} />
      {/* </Route> */}
    </Routes>
  )
}

export default App
