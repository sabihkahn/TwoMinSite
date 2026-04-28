import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Contactus from './pages/Contactus'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashbord from './pages/Dashbord'
import WebAnalytics from './pages/WebAnalytics'
import UpdateWebsite from './pages/UpdateWebsite'
import LandingPage from './pages/LandingPage'

const App = () => {

  

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/aboutus' element={<About />} />
      <Route path='/contactus' element={<Contactus />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashbord' element={<Dashbord />} />
      <Route path='/webanalytics' element={<WebAnalytics />} />
      <Route path='/updateWebsite' element={<UpdateWebsite />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
  )
}


export default App