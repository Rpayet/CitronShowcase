import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../services/server/callerService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [displayAuthBtn, setDisplayAuthBtn] = useState(false);
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await Axios.post('/api/v1/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                navigate('/');

                return { success: true }
            }
        } catch (error) {
            return { success: false, error: error.response.data.errors }
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    }

    const registerAction = async (data) => {

        try {
            await Axios.post('api/v1/auth/register', data);
            return { success: true }

        } catch (error) {
            if (error.response.status === 422) {
                return { error: error.response.data.errors }
            } else {
                return { error: 'Une erreur est survenue' }
            }
        }

    };

    useEffect(() => {

        if (token) {
            Axios.get('/api/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data.user);
                setDisplayAuthBtn(true);
            }).catch(error => {
                console.log(error);
            });
        } else {
            setUser(null);
            setDisplayAuthBtn(true);
        }

    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, displayAuthBtn, loginAction, registerAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hooks
export const useAuth = () => {
    return useContext(AuthContext);
}

