import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import  Register  from "./pages/Register"
import './App.css'
import Login from "./pages/Login"
import Profile from "./components/Profile"
function App() {


  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App