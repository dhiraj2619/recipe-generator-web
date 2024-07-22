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
        // const googleUserId = localStorage.getItem('googleUserId');

        if ((token && userId)|| (googleToken)) {
            setIsAuthenticated(true);
        }
    }, []);


    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
        navigate('/');
    }

    const googleLogin=(googleToken,googleUserId)=>{
        localStorage.setItem('googleToken',googleToken);
        // localStorage.setItem('googleUserId',googleUserId);
        setIsAuthenticated(true);
        navigate('/');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('googleToken');
        // localStorage.removeItem('googleUserId');
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