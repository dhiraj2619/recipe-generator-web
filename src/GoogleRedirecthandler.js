import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from './context/Authcontext';

const GoogleRedirecthandler = () => {
    const navigate = useNavigate();
    const {googleLogin} = useContext(AuthContext);

    useEffect(()=>{
       const urlParams = new URLSearchParams(window.location.search);

      //  here token is from backend url
       const googleToken = urlParams.get('token');
      

       if(googleToken){
        googleLogin(googleToken);
         navigate('/');
       }
       else{
        toast.error('Login failed');
        navigate('/login');
       }
    },[googleLogin,navigate])
  return (
    <div>
        <h2>Logging in..</h2>
    </div>
  )
}

export default GoogleRedirecthandler