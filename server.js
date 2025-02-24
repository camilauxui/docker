// server.js  
const express = require('express');  
const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs');  
const cors = require('cors');  
const fs = require('fs');  

const app = express();  
const port = 3000;  

app.use(cors());  
app.use(express.json());  

// Clave secreta para JWT (¡MUY IMPORTANTE: usar variable de entorno en producción!)  
const JWT_SECRET = 'clave_secreta_muy_segura';  

// Función para leer y escribir en db.json  
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
    const { username, password } = req.body;  

    if (!username || !password) {  
        return res.status(400).json({ message: 'Se requieren usuario y contraseña' });  
    }  

    const db = readDB();  
    const existingUser = db.users?.find(user => user.username === username);  
    if (existingUser) {  
        return res.status(400).json({ message: 'El usuario ya existe' });  
    }  

    const hashedPassword = await bcrypt.hash(password, 10);  
    const newUser = { id: db.users ? db.users.length + 1 : 1, username, password: hashedPassword }; // Manejo del caso en que db.users no exista  
    db.users = db.users ? [...db.users, newUser] : [newUser]; // Manejo del caso en que db.users no exista  

    writeDB(db);  

    res.status(201).json({ message: 'Usuario registrado con éxito' });  
});  

app.post('/login', async (req, res) => {  
    const { username, password } = req.body;  

    const db = readDB();  
    const user = db.users?.find(user => user.username === username);  

    if (!user) {  
        return res.status(401).json({ message: 'Credenciales inválidas' });  
    }  

    const passwordMatch = await bcrypt.compare(password, user.password);  
    if (!passwordMatch) {  
        return res.status(401).json({ message: 'Credenciales inválidas' });  
    }  

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });  
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
            console.log(err);  
            return res.status(403).json({ message: 'Token inválido' });  
        }  
        req.user = user;  
        next();  
    });  
};  

// ruta protegida (para obtener la lista de doctores)  
app.get('/doctors', authenticateToken, (req, res) => {  
    const db = readDB();  
    res.json(db.doctors); // Devuelve la lista de doctores  
});  

// ruta protegida (para crear una nueva cita)  
app.post('/appointments', authenticateToken, (req, res) => {  
    const db = readDB();  
    const newAppointment = { ...req.body, id: Math.random().toString(36).substring(2, 8) };  // Simula la creación de una ID  
    db.appointments = db.appointments ? [...db.appointments, newAppointment] : [newAppointment];  

    writeDB(db);  
    res.status(201).json(newAppointment);  
});  


app.listen(port, () => {  
    console.log(`Servidor escuchando en el puerto ${port}`);  
});