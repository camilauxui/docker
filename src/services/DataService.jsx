// src/components/services/DataService.jsx  
const DataService = {  
  get: async (url, token) => {  
      try {  
          const response = await fetch(url, {  
              method: 'GET',  
              headers: {  
                  Authorization: `Bearer ${token}`,  
                  'Content-Type': 'application/json',  
              },  
          });  

          if (!response.ok) {  
              throw new Error('Error al realizar la solicitud');  
          }  

          return await response.json();  
      } catch (error) {  
          console.error('Error en la petición:', error);  
          throw error;  
      }  
  },  
};  

export default DataService;