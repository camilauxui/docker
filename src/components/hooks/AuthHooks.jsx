import { useContext } from 'react';  
import { AuthContext } from '../contexts/AuthContext';  

export function useAuth() {  
    return useContext(AuthContext);  
}

export const AuthProvider = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [user, setUser] = useState(null);  

    const login = (username, password) => {  
        if (username === 'usuario' && password === 'secret123') {  
            setIsAuthenticated(true);  
            setUser({ username: 'usuario', name: 'Usuario' });  
        }  
    };  

    const logout = () => {  
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