# Usar una imagen base de Node  
FROM node:18 AS build  

# Establecer el directorio de trabajo  
WORKDIR /usr/src/app  

# Copiar package.json y package-lock.json al contenedor  
COPY package*.json ./  

# Instalar las dependencias  
RUN npm install  

# Copiar el resto de la aplicación al contenedor  
COPY . .  

# Construir la aplicación  
RUN npm run build  

# Usar Nginx para servir la aplicación  
FROM nginx:alpine  

# Copiar los archivos generados al contenedor de Nginx  
COPY --from=build /usr/src/app/dist /usr/share/nginx/html  

# Exponer el puerto en el que el servidor Nginx escuchará  
EXPOSE 80  

# Comando para ejecutar Nginx  
CMD ["nginx", "-g", "daemon off;"]