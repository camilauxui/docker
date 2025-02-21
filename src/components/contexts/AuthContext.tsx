import React, { createContext, useContext, useState, ReactNode } from "react";  

// Definir la interfaz para el contexto  
interface AuthContextType {  
    isAuthenticated: boolean;  
    user: { username: string; name: string } | null; // Definir los tipos para el usuario  
    login: (username: string, password: string) => Promise<boolean>;  
    logout: () => void;  
}  

// Crear el contexto con un valor inicial indefinido  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);  // Exportación con `export const`  

// Hook personalizado para usar el contexto  
export const useAuth = (): AuthContextType => {  
    const context = useContext(AuthContext);  
    if (!context) {  
        throw new Error("useAuth must be used within an AuthProvider");  
    }  
    return context;  
};  

// Proveedor del contexto  
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  
    const [user, setUser] = useState<{ username: string; name: string } | null>(null);  

    const login = async (username: string, password: string): Promise<boolean> => {  
        if (username === "usuario" && password === "secret123") {  
            setIsAuthenticated(true);  
            setUser({ username: "usuario", name: "Camila Peña" });  
            return true;  
        } else {  
            setIsAuthenticated(false);  
            setUser(null);  
            return false;  
        }  
    };  

    const logout = (): void => {  
        setIsAuthenticated(false);  
        setUser(null);  
    };  

    return (  
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>  
            {children}  
        </AuthContext.Provider>  
    );  
};  

export default AuthProvider;