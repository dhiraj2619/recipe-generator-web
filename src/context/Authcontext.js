import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const googleToken = localStorage.getItem('googleToken');
        
        if ((token && userId)|| (googleToken)) {
            setIsAuthenticated(true);
            fetchUserData(token,userId);
        }
    }, []);

    const fetchUserData=async(token,userId)=>{
          try { 
              const response = await axios.get(`https://recipegenerate-backend.onrender.com/api/users/user/${userId}`,{
                headers:{Authorization:`Bearer ${token}`}
              });
              setUser(response.data.user);
              console.log(response.data.user);
          } catch (error) {
            console.error("Error fetching the user data:", error.response ? error.response.data : error.message);
          }
    }

    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
        navigate('/');
    }

    const googleLogin=(googleToken,googleUserId)=>{
        localStorage.setItem('googleToken',googleToken);
        setIsAuthenticated(true);
        navigate('/');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('googleToken');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/')
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login,googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }