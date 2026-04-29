import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import About from './pages/About'
import Contactus from './pages/Contactus'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashbord from './pages/Dashbord'
import WebAnalytics from './pages/WebAnalytics'
import UpdateWebsite from './pages/UpdateWebsite'
import LandingPage from './pages/LandingPage'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import LoadingComponent from './components/Loadingcomponent'
import apiClient from './api/axiosapiinstance'
import Header from './components/Header'
import Footer from './components/Footer'
import Pricing from './pages/Pricing'
import Feature from './pages/Feature'
const App = () => {

  const { User, setUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

const location = useLocation();

const isDashboard = location.pathname.startsWith("/dashboard");
  if (isCheckingAuth) {
    return <LoadingComponent />
  }


  return (
    <>
     {isDashboard?"":<Header />}
      <div className={isDashboard?"pt-0":"pt-16"}>
        <Routes>
          {/* <Route path='/home' element={User?<Home />:<Navigate to="/login" />} /> */}
          <Route path='/aboutus' element={<About />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/features' element={<Feature />} />


          <Route path='/contactus' element={<Contactus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={User ? <Dashbord /> : <Navigate to="/login" />} />
          <Route path='/dashboard/webanalytics' element={User ? <WebAnalytics /> : <Navigate to="/login" />} />
          <Route path='/dashboard/updateWebsite' element={User ? <UpdateWebsite /> : <Navigate to="/login" />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
   {isDashboard ?"":  <Footer />}
    </>
  )
}


export default App