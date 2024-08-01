import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import GoogleRedirecthandler from './GoogleRedirecthandler'
import MainLayout from './components/MainLayout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeContext } from './context/ThemeContext'
import GeneratedRecipes from './pages/GeneratedRecipes'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'


const AllRoute = () => {
  const location = useLocation();
  const { theme } = useContext(themeContext);

  const noLayoutRoutes = ['/login', '/signup'];

  return (
    <>

      <Routes>
        <Route path='/' element={!noLayoutRoutes.includes(location.pathname) ?
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout><Home /></MainLayout>
          </ThemeProvider> : <Home />} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path='/auth/google/callback' element={<GoogleRedirecthandler />} />
        <Route path='/generatedRecipes' element={<PrivateRoute>
          <ThemeProvider theme={theme}> <CssBaseline /><MainLayout> <GeneratedRecipes /></MainLayout>  </ThemeProvider>
        </PrivateRoute>} />
      </Routes>
    </>
  )
}

export default AllRoute