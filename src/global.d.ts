// src/global.d.ts  
declare namespace NodeJS {  
    interface Global {  
        TextEncoder: typeof TextEncoder;  
        TextDecoder: typeof TextDecoder;  
    }  
}