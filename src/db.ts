// src/db.ts  
import { openDB } from 'idb';  

interface Appointment {  
    id?: number;  
    name: string;  
    email: string;  
    phone: string;  
    doctor: string;  
    date: string;  
    time: string;  
}  

const DB_NAME = 'medical-appointments-db';  
const APPOINTMENTS_STORE = 'appointments';  

let dbPromise: Promise<any> | null = null; // Cambiado a 'any'  

async function openDatabase() {  
    if (dbPromise) {  
        return dbPromise;  
    }  

    dbPromise = openDB(DB_NAME, 1, {  
        upgrade(db) {  
            if (!db.objectStoreNames.contains(APPOINTMENTS_STORE)) {  
                db.createObjectStore(APPOINTMENTS_STORE, { keyPath: 'id', autoIncrement: true });  
            }  
        },  
    });  

    return dbPromise;  
}  

async function addAppointment(appointment: Appointment): Promise<number> {  
    try {  
        const db = await openDatabase();  
        const tx = db.transaction(APPOINTMENTS_STORE, 'readwrite');  
        const store = tx.objectStore(APPOINTMENTS_STORE);  
        const id = await store.add(appointment);  
        await tx.done;  
        return id;  
    } catch (error) {  
        console.error("Error al agregar la cita en IndexedDB:", error);  
        throw error;  
    }  
}  

async function getAppointments(): Promise<Appointment[]> {  
    try {  
        const db = await openDatabase();  
        const tx = db.transaction(APPOINTMENTS_STORE, 'readonly');  
        const store = tx.objectStore(APPOINTMENTS_STORE);  
        const appointments = await store.getAll();  
        return appointments;  
    } catch (error) {  
        console.error("Error al obtener las citas de IndexedDB:", error);  
        return []; // Devuelve un array vacío en caso de error  
    }  
}  

async function deleteAppointment(id: number): Promise<void> {  
    try {  
        const db = await openDatabase();  
        const tx = db.transaction(APPOINTMENTS_STORE, 'readwrite');  
        const store = tx.objectStore(APPOINTMENTS_STORE);  
        await store.delete(id);  
        await tx.done;  
    } catch (error) {  
        console.error("Error al eliminar la cita de IndexedDB:", error);  
        throw error;  
    }  
}  

export type { Appointment };  
export { addAppointment, getAppointments, deleteAppointment };