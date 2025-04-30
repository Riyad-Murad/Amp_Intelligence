import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      {/* <Route element={<ProtectedRoute />}>

      </Route> */}
    </Routes>
  )
}

export default App
