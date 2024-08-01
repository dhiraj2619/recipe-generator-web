import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/Authcontext'

const PublicRoute = ({children}) => {

    const {isAuthenticated} = useContext(AuthContext);

    if(isAuthenticated){
         <Navigate to="/"/>
    }

  return (
    children
  )
}

export default PublicRoute