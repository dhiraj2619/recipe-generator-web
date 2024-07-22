import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import GoogleRedirecthandler from './GoogleRedirecthandler'

const AllRoute = () => {
  const location = useLocation();

  const noNavbarComponent = ['/login','/signup'];
  return (
    <>
      {!noNavbarComponent.includes(location.pathname) && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/auth/google/callback' element={<GoogleRedirecthandler/>}/>
      </Routes>
    </>
  )
}

export default AllRoute