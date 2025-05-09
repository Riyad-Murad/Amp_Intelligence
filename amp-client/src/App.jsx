import './App.css'
import Home from './Pages/CommonPages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import ClientDashboard from './Pages/ClientPages/Dashboard/ClientDashboard'
// import ProtectedRoute from './Components/CommonComponents/ProtectedRoutes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path='/client-dashboard' element={<ClientDashboard />} />
      {/* </Route> */}
    </Routes>
  )
}

export default App
