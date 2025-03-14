// src/components/contexts/AuthContext.tsx  
import React, { createContext, useState, useContext, useEffect } from 'react';  
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode  

interface AuthContextProps {  
  user: any | null;  
  login: (token: string) => void;  
  logout: () => void;  
  isLoggedIn: boolean;  
}  

const AuthContext = createContext<AuthContextProps>({  
  user: null,  
  login: () => {},  
  logout: () => {},  
  isLoggedIn: false,  
});  

interface AuthProviderProps {  
  children: React.ReactNode;  
}  

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {  
  const [user, setUser] = useState<any | null>(() => {  
    // Inicializa el estado 'user' al cargar el componente  
    const token = localStorage.getItem('token');  
    if (token) {  
      try {  
        const decodedToken = jwtDecode(token);  
        return decodedToken;  
      } catch (error) {  
        console.error("Error al decodificar el token inicial:", error);  
        return null;  
      }  
    }  
    return null;  
  });  

  const isLoggedIn = !!user; // Deriva el estado 'isLoggedIn' del estado 'user'  

  useEffect(() => {  
    console.log("User state changed:", user);  
  }, [user]);  

  const login = (token: string) => {  
    try {  
      const decodedToken = jwtDecode(token);  
      localStorage.setItem('token', token);  
      setUser(decodedToken);  
    } catch (error) {  
      console.error("Error al decodificar el token:", error);  
    }  
  };  

  const logout = () => {  
    localStorage.removeItem('token');  
    setUser(null);  
  };  

  const value: AuthContextProps = {  
    user,  
    login,  
    logout,  
    isLoggedIn,  
  };  

  return (  
    <AuthContext.Provider value={value}>  
      {children}  
    </AuthContext.Provider>  
  );  
};  

export const useAuth = () => {  
  return useContext(AuthContext);  
};