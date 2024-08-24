import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../services/server/callerService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await Axios.post('/api/v1/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    }


    useEffect(() => {

        if (token) {
            Axios.get('/api/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data.user);
            }).catch(error => {
                console.log(error);
            });
        } else {
            setUser(null);
        }

    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, loginAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hooks
export const useAuth = () => {
    return useContext(AuthContext);
}

