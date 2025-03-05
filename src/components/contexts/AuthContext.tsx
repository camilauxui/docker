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
    // Esto se ejecutará cada vez que el estado 'user' cambie  
    console.log("User state changed:", user);  
  }, [user]);  

  const login = (token: string) => {  
    try {  
      // Decodifica el token para obtener la información del usuario  
      const decodedToken = jwtDecode(token);  

      // Guarda el token en localStorage (o en una cookie, según tu preferencia)  
      localStorage.setItem('token', token);  

      // Actualiza el estado 'user' con la información del usuario decodificada  
      setUser(decodedToken);  
    } catch (error) {  
      console.error("Error al decodificar el token:", error);  
    }  
  };  

  const logout = () => {  
    // Elimina el token de localStorage  
    localStorage.removeItem('token');  

    // Actualiza el estado 'user' a null  
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