// src/setupTests.ts  
import '@testing-library/jest-dom';  
import { TextEncoder, TextDecoder } from 'util';  

// Luego, asigna a global utilizando `as any` para evitar errores de tipo  
(global as any).TextEncoder = TextEncoder;  
(global as any).TextDecoder = TextDecoder;