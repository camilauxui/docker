
//src/components/context/LanguageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';  

interface LanguageContextType {  
    language: string;  
    changeLanguage: (lang: string) => void;  
}  

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);  

export const LanguageProvider = ({ children }: { children: ReactNode }) => {  
    const [language, setLanguage] = useState<string>(() => {  
        const storedLanguage = localStorage.getItem('language');  
        return storedLanguage || 'es';  
    });  

    const changeLanguage = (lang: string) => {  
        setLanguage(lang);  
        localStorage.setItem('language', lang);  
        window.location.reload(); // Recargar la página para aplicar los cambios  
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
        throw new Error('useLanguage debe ser utilizado dentro de un LanguageProvider');  
    }  
    return context;  
};