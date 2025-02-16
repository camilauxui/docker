import express from "express";  

const app = express();  

// Middleware para configurar la cabecera 'X-Frame-Options' en todas las respuestas  
app.use((req, res, next) => {  
    res.setHeader("X-Frame-Options", "DENY"); // Evita que tu web sea cargada en iframes  
    next();  
});  

// Ruta principal  
app.get("/", (req, res) => {  
    res.send("Bienvenido a la web del hospital. Protección contra clickjacking está activa.");  
});  

// Iniciar el servidor en el puerto 3000  
const PORT = 3000;  
app.listen(PORT, () => {  
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});