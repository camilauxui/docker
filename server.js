import express from "express"; // Importar express como módulo ES6  
import CryptoJS from "crypto-js"; // Importar crypto-js como módulo ES6  

const app = express();  

// Middleware para interpretar JSON  
app.use(express.json());  

// Simulación de datos de usuario  
const mockUser = {  
    username: "admin",  
    password: "123456",  
};  

// Ruta principal (GET /)  
app.get("/", (req, res) => {  
    res.send("¡Bienvenido a la página principal!");  
});  

// Ruta de autenticación  
app.post("/api/login", (req, res) => {  
    const { username, password } = req.body;  

    // Verificar usuario  
    if (username !== mockUser.username) {  
        return res.status(401).json({ success: false, message: "Usuario no encontrado." });  
    }  

    // Desencriptar contraseña  
    const secretKey = "clave_secreta";  
    const bytes = CryptoJS.AES.decrypt(password, secretKey);  
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);  

    console.log("Contraseña desencriptada:", decryptedPassword);  

    // Comparar contraseñas  
    if (decryptedPassword === mockUser.password) {  
        return res.json({ success: true, message: "Inicio de sesión exitoso." });  
    }  

    return res.status(401).json({ success: false, message: "Contraseña inválida." });  
});  

// Inicio del servidor  
const PORT = 3000;  
app.listen(PORT, () => {  
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});