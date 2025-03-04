// src/components/contexts/LanguageContext.tsx  
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';  

interface LanguageContextType {  
    language: string;  
    changeLanguage: (lang: string) => void;  
}  

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);  

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [language, setLanguage] = useState<string>(() => {  
        // Cargar el idioma desde localStorage  
        return localStorage.getItem('language') || 'es'; // Idioma por defecto  
    });  

    const changeLanguage = (lang: string) => {  
        setLanguage(lang);  
        localStorage.setItem('language', lang); // Guardar en localStorage  
    };  

    return (  
        <LanguageContext.Provider value={{ language, changeLanguage }}>  
            {children}  
        </LanguageContext.Provider>  
    );  
};  

export const useLanguage = () => {  
    const context = useContext(LanguageContext);  
    if (context === undefined) {  
        throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');  
    }  
    return context;  
};