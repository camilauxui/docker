import express from 'express';  
import jwt from 'jsonwebtoken';  
import bcrypt from 'bcryptjs';  
import cors from 'cors';  
import fs from 'fs';  
import dotenv from 'dotenv'; // Importa dotenv  

dotenv.config(); // Carga las variables de entorno desde .env  

const app = express();  
const port = 3000;  

app.use(cors());  
app.use(express.json());  

// Clave secreta para JWT (¡IMPORTANTE: usar variable de entorno en producción!)  
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_muy_segura'; // Usa la variable de entorno o un valor por defecto  

// Función para leer y escribir en db.json (¡CONSIDERA USAR UNA BASE DE DATOS REAL!)  
const readDB = () => {  
    try {  
        const data = fs.readFileSync('db.json', 'utf8');  
        return JSON.parse(data);  
    } catch (err) {  
        console.error('Error al leer db.json:', err);  
        return { users: [], doctors: [], appointments: [] };  
    }  
};  

const writeDB = (data) => {  
    try {  
        fs.writeFileSync('db.json', JSON.stringify(data, null, 2));  
    } catch (err) {  
        console.error('Error al escribir db.json:', err);  
    }  
};  

// Rutas de autenticación  
app.post('/register', async (req, res) => {  
    const { username, password, name } = req.body;  

    if (!username || !password || !name) {  
        return res.status(400).json({ message: 'Se requieren usuario, contraseña y nombre' });  
    }  

    const db = readDB();  
    const existingUser = db.users.find(user => user.username === username);  
    if (existingUser) {  
        return res.status(400).json({ message: 'El usuario ya existe' });  
    }  

    const hashedPassword = await bcrypt.hash(password, 10);  
    const newUser = { id: db.users.length + 1, username, password: hashedPassword, name }; // Usa la contraseña hasheada  
    db.users.push(newUser);  

    writeDB(db);  

    res.status(201).json({ message: 'Usuario registrado con éxito' });  
});  

app.post('/login', async (req, res) => {  
    const { username, password } = req.body;  

    if (!username || !password) {  
        return res.status(400).json({ message: 'Se requieren usuario y contraseña' });  
    }  

    const db = readDB();  
    const user = db.users.find(user => user.username === username);  

    if (!user) {  
        return res.status(401).json({ message: 'Credenciales inválidas' });  
    }  

    const passwordMatch = await bcrypt.compare(password, user.password); //Compara la contraseña que viene con la encriptada  
    if (!passwordMatch) {  
        return res.status(401).json({ message: 'Credenciales inválidas' });  
    }  

    const token = jwt.sign({ userId: user.id, username: user.username, name: user.name }, JWT_SECRET, { expiresIn: '1h' });  
    res.json({ token });  
});  

// Middleware de autenticación  
const authenticateToken = (req, res, next) => {  
    const authHeader = req.headers['authorization'];  
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) {  
        return res.status(401).json({ message: 'Se requiere token de autenticación' });  
    }  

    jwt.verify(token, JWT_SECRET, (err, user) => {  
        if (err) {  
            return res.status(403).json({ message: 'Token inválido' });  
        }  
        req.user = user;  
        next();  
    });  
};  

// Ruta protegida: obtener lista de doctores  
app.get('/doctors', authenticateToken, (req, res) => {  
    const db = readDB();  
    res.json(db.doctors);  
});  

// Ruta protegida: crear una nueva cita  
app.post('/appointments', authenticateToken, (req, res) => {  
    const db = readDB();  
    const newAppointment = { ...req.body, id: Math.random().toString(36).substring(2, 8) };  
    db.appointments.push(newAppointment);  

    writeDB(db);  
    res.status(201).json(newAppointment);  
});  

app.listen(port, () => {  
    console.log(`Servidor escuchando en el puerto ${port}`);  
});