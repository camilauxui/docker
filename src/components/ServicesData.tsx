import translations from '../translations';  
import { useLanguage } from '../components/contexts/LanguageContext';  

interface ServiceData {  
  id: number;  
  title: string;  
  description: string;  
  image: string;  
}  

export const getServicesData = (language: string): ServiceData[] => {  
    const t = translations[language] || translations['es'];  
    
    return [  
        {  
            id: 1,  
            title: t.home.servicesList[0],  
            description: t.home.serviceDetails[0],  
            image: '/src/assets/consulta_icono.png'  
        },  
        {  
            id: 2,  
            title: t.home.servicesList[1],  
            description: t.home.serviceDetails[1],  
            image: '/src/assets/urgencia_icono.png'  
        },  
        {  
            id: 3,  
            title: t.home.servicesList[2],  
            description: t.home.serviceDetails[2],  
            image: '/src/assets/especialidades_icono.png'  
        }  
    ];  
};