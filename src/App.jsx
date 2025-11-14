
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Editevent from './pages/Editevent'
import Home from './pages/Home'
import Addevent from './pages/Addevent'
import Register from './pages/Register'
import Login from './pages/Login'
import  Dashboard  from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'







function App() {


  return (
    <>
      
      <Routes>

        

        {/* login register */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>



        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/edit-event/:id' element={<Editevent/>}/>
        <Route path='/add-event' element={<Addevent/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
