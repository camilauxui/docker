// indexedDBService.ts  

// Función para abrir la base de datos IndexedDB  
export const openDatabase = (): Promise<IDBDatabase> => {  
    return new Promise((resolve, reject) => {  
        if (!('indexedDB' in window)) {  
            console.error('IndexedDB is not available in this browser.');  
            reject('IndexedDB is not available');  
            return;  
        }  

        const request = indexedDB.open("HospitalDB", 1);  

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {  
            const db = (event.target as IDBOpenDBRequest).result;  

            // Crear tablas si no existen  
            if (!db.objectStoreNames.contains("doctors")) {  
                db.createObjectStore("doctors", { keyPath: "id" });  
            }  
            if (!db.objectStoreNames.contains("appointments")) {  
                db.createObjectStore("appointments", { keyPath: "id", autoIncrement: true }); // Clave autoincremental para citas  
            }  
            if (!db.objectStoreNames.contains("users")) {  
                db.createObjectStore("users", { keyPath: "id" });  
            }  
        };  

        request.onsuccess = () => resolve(request.result);  
        request.onerror = () => reject(request.error);  
    });  
};  

export const addData = async (storeName: string, data: any): Promise<void> => {  
    const db = await openDatabase();  
    return new Promise((resolve, reject) => {  
        const transaction = db.transaction(storeName, "readwrite");  
        const store = transaction.objectStore(storeName);  

        if (!data) {  
            console.warn("addData llamado con data undefined:", data);  
            reject("addData llamado con data undefined");  
            return;  
        }  

        if (typeof data.id !== 'number' && typeof data.id !== 'string') {  
            console.warn("ID no es ni número ni cadena:", data);  
            reject("ID no es ni número ni cadena");  
            return;  
        }  

        const addRequest = store.add(data); // Guarda la solicitud de añadir  

        addRequest.onsuccess = () => { // Resuelve la promesa cuando la operación add es exitosa  
            resolve();  
        };  

        addRequest.onerror = (event: any) => { // Rechaza la promesa si hay un error  
            console.error("Error al añadir datos:", event.target.error);  
            reject(transaction.error);  
        };  
    });  
};  

// Función para obtener todos los datos de IndexedDB  
export const getData = async (storeName: string): Promise<any[]> => {  
    const db = await openDatabase();  
    return new Promise((resolve, reject) => {  
        const transaction = db.transaction(storeName, "readonly");  
        const store = transaction.objectStore(storeName);  

        const request = store.getAll();  

        request.onsuccess = () => resolve(request.result);  
        request.onerror = () => reject(request.error);  
    });  
};