import React, { useContext } from 'react'
import { AuthContext } from './context/Authcontext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

  const {isAuthenticated} = useContext(AuthContext);

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }
  return children;
  
}

export default PrivateRoute