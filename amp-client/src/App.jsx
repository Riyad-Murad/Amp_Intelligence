import './App.css'
import Home from './Pages/CommonPages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import ClientDashboard from './Pages/ClientPages/Dashboard/ClientDashboard'
import ClientPowerPlan from './Pages/ClientPages/PowerPlan/ClientPowerPlan'
import ClientProfile from './Pages/ClientPages/ClientProfile/ClientProfile'

import ProviderUsers from './Pages/ProviderPages/ProviderUsers/ProviderUsers'
import ProviderProfile from './Pages/ProviderPages/ProviderProfile/ProviderProfile'
import ProviderDashboard from './Pages/ProviderPages/ProviderDashboard/ProviderDashboard'
import ProviderPowerPrediction from './Pages/ProviderPages/ProviderPowerPrediction/ProviderPowerPrediction' 

import AdminEditProvider from './Pages/AdminPages/AdminEditProvider/AdminEditProvider'
import AdminViewProviders from './Pages/AdminPages/AdminViewProviders/AdminViewProviders'

// import ProtectedRoute from './Components/CommonComponents/ProtectedRoutes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path='/client-dashboard' element={<ClientDashboard />} />
        <Route path='/client-power-plan' element={<ClientPowerPlan />} />
        <Route path='/client-profile' element={<ClientProfile />} />

        <Route path='/provider-users' element={<ProviderUsers />} />
        <Route path='/provider-profile' element={<ProviderProfile />} />
        <Route path='/provider-dashboard' element={<ProviderDashboard />} />
        <Route path='/provider-power-prediction' element={<ProviderPowerPrediction />} />

        <Route path='/admin-edit-provider' element={<AdminEditProvider />} />
        <Route path='/admin-view-providers' element={<AdminViewProviders />} />

      {/* </Route> */}
    </Routes>
  )
}

export default App
