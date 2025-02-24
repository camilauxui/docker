import React, { createContext, useState, useEffect, useContext } from 'react';  

export interface AuthContextProps { // Exporta la interfaz  
    token: string | null;  
    setToken: (token: string | null) => void;  
    isLoggedIn: boolean;  
    login: (token: string) => void;  
    logout: () => void;  
    user: any; // Puedes definir un tipo User si tienes la información del usuario  
}  

const AuthContext = createContext<AuthContextProps>({  
    token: null,  
    setToken: () => { },  
    isLoggedIn: false,  
    login: () => { },  
    logout: () => { },  
    user: null,  
});  

interface AuthProviderProps {  
    children: React.ReactNode;  
}  

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {  
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('token') || null);  
    const [user, setUser] = useState<any>(null); // Estado para la información del usuario  
    const isLoggedIn = !!token;  

    useEffect(() => {  
        if (token) {  
            localStorage.setItem('token', token);  
            // Aquí podrías decodificar el token y guardar la info del usuario en el estado `user`  
            try {  
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el token (no usar en producción sin validación)  
                setUser(decodedToken);  
            } catch (error) {  
                console.error("Error al decodificar el token:", error);  
                setUser(null);  
            }  

        } else {  
            localStorage.removeItem('token');  
            setUser(null);  
        }  
    }, [token]);  

    const setToken = (newToken: string | null) => {  
        setTokenState(newToken);  
    };  

    const login = (token: string) => {  
        setTokenState(token);  
    };  

    const logout = () => {  
        setTokenState(null);  
    };  

    const value: AuthContextProps = {  
        token,  
        setToken,  
        isLoggedIn,  
        login,  
        logout,  
        user,  
    };  

    return (  
        <AuthContext.Provider value={value}>  
            {children}  
        </AuthContext.Provider>  
    );  
};  

export const useAuth = () => useContext(AuthContext);  

export default AuthContext; // Exporta AuthContext