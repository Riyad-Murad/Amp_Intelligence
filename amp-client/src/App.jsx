import './App.css'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route element={<ProtectedRoute />}>

      </Route> */}
    </Routes>
  )
}

export default App
