import consultaIcono from '/src/assets/consulta_icono.png';  
import urgenciaIcono from '/src/assets/urgencia_icono.png';  
import especialidadesIcono from '/src/assets/especialidades_icono.png';  

interface ServiceData {  
  id: number;  
  title: string;  
  description: string;  
  image: string;  
}  

const servicesData: ServiceData[] = [  
  { id: 1, title: "Consultas", description: "Nuestro equipo de profesionales capacitados está disponible para proporcionar atención médica rápida y efectiva.", image: consultaIcono },  
  { id: 2, title: "Urgencias", description: "Nuestra unidad de urgencias está diseñada para atender situaciones médicas críticas.", image: urgenciaIcono },  
  { id: 3, title: "Especialidades", description: "Contamos con un equipo de especialistas en diferentes áreas incluyendo cardiología, pediatría, entre otros.", image: especialidadesIcono }  
];  

export default servicesData;